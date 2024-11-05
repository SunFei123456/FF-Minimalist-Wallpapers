import request from "@/server";

// 1. 获取热度前20的照片
// http://127.0.0.1:5000/wallpaper/get_hot20
export function getHot20() {
  return request({
    url: "/wallpaper/get_hot20",
    method: "get",
  });
}

// 2. 根据图片id返回具体的图片
// http://127.0.0.1:5000/wallpaper/3
export function getDetail(id) {
  return request({
    url: `/wallpaper/${id}`,
    method: "get",
  });
}

// 3. 根据标签返回不同的图片组
// http://127.0.0.1:5000/wallpaper/tags/汽车
export function getTags(tag) {
  return request({
    url: `/wallpaper/tags/${tag}`,
    method: "get",
  });
}

// 4. 返回最新的图片组
// http://127.0.0.1:5000/wallpaper/new
export function getNew() {
  return request({
    url: "/wallpaper/new",
    method: "get",
  });
}

// 5. 根据点赞量排序返回
// http://127.0.0.1:5000/wallpaper/like
export function getLike() {
  return request({
    url: "/wallpaper/like",
    method: "get",
  });
}

// 6. 根据下载量排序返回
// http://127.0.0.1:5000/wallpaper/download
export function getDownload() {
  return request({
    url: "/wallpaper/download",
    method: "get",
  });
}

// 8. 图片信息上传数据库

// http://127.0.0.1:5000/wallpaper/save

/*
参数
- name
- url
- alt 
- type
- file_size
- dimensions
- create_by
- width
- height 
*/

export function save({
  name,
  url,
  alt,
  type,
  file_size,
  create_by,
  width,
  height,
  tag_id,
}) {
  return request({
    url: "/wallpaper/save",
    method: "post",
    data: {
      name,
      url,
      alt,
      type,
      file_size,
      create_by,
      width,
      height,
      tag_id,
    },
  });
}

// 9. 模糊查询

// http://127.0.0.1:5000/wallpaper/search
export function searchbykeyword(keyword) {
  return request({
    url: "/wallpaper/search",
    method: "get",
    params: { keyword },
  });
}

// 10. 检查当前图片是否被当前用户所收藏
// http://127.0.0.1:5000/wallpaper/isCollected
// post user_id and image_id

/* export function isCollected(user_id, image_id) {
  return request({
    url: "/wallpaper/isCollected",
    method: "post",
    data: {
      user_id,
      image_id,
    },
  });
}
 */
// 11. 检查当前图片是否被当前用户所喜欢
// http://127.0.0.1:5000/wallpaper/isliked

/* export function isliked(user_id, image_id) {
  return request({
    url: "/wallpaper/isliked",
    method: "post",
    data: {
      user_id,
      image_id,
    },
  });
}
 */



// 10. 获取指定图片和指定用户之间的关系(喜欢 收藏 or 无任何关系)
export function user_image_relation(user_id, image_id) {
  return request({
    url: "/wallpaper/user_image_relation",
    method: "post",
    data: {
      user_id,
      image_id,
    },
  });
}





// 12. 删除图片以及所有关联记录
// http://127.0.0.1:5000/wallpaper/delete

export function deletePic(user_id, image_id) {
  return request({
    url: "/wallpaper/delete",
    method: "post",
    data: {
      user_id,
      image_id,
    },
  });
}
