import request from "@/server";

// http://127.0.0.1:5000/qrcode//generate_qr

// 生成qrcode 二维码的url
//  需要接收需要生成二维码图片的url
export function generate_qrcode(ima_url) {
  return request({
    url: "/qrcode/generate_qr",
    method: "post",
    data: {
      ima_url,
    },
  });
}
