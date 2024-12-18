import * as qiniu from "qiniu-js";

// 获取用户的id from localStorage
export const getUserId = () => {
  const uid = JSON.parse(localStorage.getItem("userInfo"))?.user_id;
  if (uid == undefined) return false;
  return uid;
};

// 获取用户的头像
export const getUserAvatar = () => {
  const avatar = JSON.parse(localStorage.getItem("userInfo"))?.image;
  return avatar;
};

// 下载服务器的图片
/**
 * 下载文件
 * @param {string} url 下载文件地址
 * @param {*} options
 * @param {string} options.filename 文件名称
 * a 标签 download 属性仅允许下载同源文件，通过 XMLHttpRequest 跨域可以绕过该限制
 */
export function downloadFile(url, options = {}) {
  const x = new XMLHttpRequest();
  x.open("GET", url, true);
  x.responseType = "blob"; // 设置响应类型为 Blob

  x.onload = function () {
    if (x.status === 200) {
      // 确保请求成功
      const blob = new Blob([x.response]); // 创建 Blob 对象
      const downloadUrl = window.URL.createObjectURL(blob); // 创建对象 URL
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = options.filename || "downloaded_file"; // 默认文件名
      document.body.appendChild(a); // 将链接添加到 DOM
      a.click(); // 触发下载
      document.body.removeChild(a); // 下载后移除链接
      window.URL.revokeObjectURL(downloadUrl); // 释放对象 URL
    } else {
      console.error("下载失败:", x.statusText);
    }
  };

  x.onerror = function () {
    console.error("请求失败");
  };

  x.send(); // 发送请求
}

// 封装一下上传到七牛云的方法
const uploadOptions = {
  quality: 0.2,
  noCompressIfLarger: true,
};
export async function uploadFile(file,callback){
  const key = `${Date.now()}_${file.name}`;
  try {
    // 获取上传的 token
    const res = await fetch(
      `${
        import.meta.env.VITE_SERVER_URL
      }/wallpaper/qiniu_upload_token?key=${key}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const { token } = await res.json();
    const config = { useCdnDomain: true };
    qiniu.compressImage(file.fileInstance, uploadOptions).then((data) => {
      const observable = qiniu.upload(data.dist, key, token, config);
      const subscription = observable.subscribe({
        next(res) {
          console.log("上传中...", res);
        },
        error(err) {
          Toast.error("上传失败: " + err.message);
        },
        complete(res) {
          const uploadResult = {
            file_path: `http://cdn.sunfei.site/${key}`, 
            file_size: file.size,
            mode: "RGB", 
          };
          // callback
          callback(uploadResult,null);
        },
      });
    });
  } catch (err) {
     callback(null,err?.message);
  }
}
