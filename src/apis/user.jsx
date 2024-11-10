import request from "@/server";

// http://localhost:5000/user/login
export function login(email, password) {
  return request({
    url: "/user/login",
    method: "post",
    data: {
      email,
      password,
    },
  });
}

// http://localhost:5000/user/register
export function register(reg_username, reg_email, reg_password) {
  return request({
    url: "/user/register",
    method: "post",
    data: {
      reg_username,
      reg_email,
      reg_password,
    },
  });
}

// http://localhost:5000/user/bind_avatar
// user_id image_url
export function bind_avatar(user_id, image_url) {
  return request({
    url: "/user/bind_avatar",
    method: "post",
    data: {
      user_id,
      image_url,
    },
  });
}

// 用户信息修改
// http://localhost:5000/user/update_userInfo

export function update_userInfo(
  user_id,
  nickname,
  gender,
  birth,
  country,
  province,
  city,
  description
) {
  return request({
    url: "/user/update_userInfo",
    method: "post",
    data: {
      user_id,
      nickname,
      gender,
      birth,
      country,
      province,
      city,
      description,
    },
  });
}

// 获取用户上传的图片列表
// http://localhost:5000/user/get_user_images?user_id=1

export function get_user_images(user_id) {
  return request({
    url: "/user/get_user_images",
    method: "get",
    params: {
      user_id,
    },
  });
}

// 获取用户喜欢的图片列表
// http://localhost:5000/user//likes

export function get_user_likes(user_id) {
  return request({
    url: `/user/${user_id}/likes`,
    method: "get",
    // `params` 是可选的，如果没有其他查询参数可以省略
    params: {
      user_id, // 如果后端需要在查询参数中包含 user_id，可以保留
    },
  });
}

// 获取用户收藏的图片列表
// http://localhost:5000/user//collects

export function get_user_collects(user_id) {
  return request({
    url: `/user/${user_id}/collects`,
    method: "get",
    // `params` 是可选的，如果没有其他查询参数可以省略
    params: {
      user_id, // 如果后端需要在查询参数中包含 user_id，可以保留
    },
  });
}

// 根据用户的id返回指定的用户信息
// http://localhost:5000/user/info/1

export function get_user_info(user_id) {
  return request({
    url: `/user/info/${user_id}`,
    method: "get",
  });
}

// 用户喜欢or取消喜欢图片
// http://127.0.0.1:5000/user/likeImage

export function toggleLikeImage(user_id, image_id) {
  return request({
    url: "/user/toggleLikeImage",
    method: "post",
    data: {
      user_id,
      image_id,
    },
    requiresAuth: true, 
  });
}

// 用户收藏or取消收藏图片
export function toggleCollectImage(user_id, image_id) {
  return request({
    url: "/user/toggleCollectImage",
    method: "post",
    data: {
      user_id,
      image_id,
    },
    requiresAuth: true,
  });
} 


// 用户点击下载作品
export function downloadImage(image_id) {
  return request({
    url: "/user/downloadImage",
    method: "post",
    data: {
      image_id,
    },
    requiresAuth: true,
  });
}

// 用户关注行为
// follower_id: 发起关注操作的用户, 也就是当前用户
// followed_id: 被关注的用户。
export function followUser(follower_id, followed_id) {
  return request({
    url: "/user/followUser",
    method: "post",
    data: {
      follower_id,
      followed_id,
    },
  });
}

// 用户取消关注行为
// http://127.0.0.1:5000/user//unfollowUser

export function unfollowUser(follower_id, followed_id) {
  return request({
    url: "/user/unfollowUser",
    method: "post",
    data: {
      follower_id,
      followed_id,
    },
  });
}

// 用来返回一个bool值, 标识当前用户是否关注了另外一个用户
// http://127.0.0.1:5000/user/user/9/is_following/1

export function is_following(follower_id, followed_id) {
  return request({
    url: `/user/${follower_id}/is_following/${followed_id}`,
    method: "get",
  });
}


// 获取用户的粉丝和关注数量
// http://localhost:5000/user/getFollowCount/9

export function getFollowCount(user_id) {
  return request({
    url: `/user/getFollowCount/${user_id}`,
    method: "get",
  });
}

// 修改个人中心页资料模块的后方背景
// http://127.0.0.1:5000/user/modify_background

export function modify_background(user_id, background_image_url) {
  return request({
    url: "/user/modify_background",
    method: "post",
    data: {
      user_id,
      background_image_url,
    },
  });
}


// 获取热榜三用户
export function get_top_users() {
  return request.get("/user/get_top_users");
}