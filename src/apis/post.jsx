import request from "@/server";


export function get() {
  return request({
    url: "/post/all",
    method: "get",
  });
}

// create post

export function create(data) {
  return request({
    url: "/post/create",
    method: "post",
    requiresAuth: true,
    data,
  });
}

// 点赞or取消点赞
export function likeOrCancelLike(user_id, post_id) {
  return request({
    url: "/post/like_or_cancelLike",
    method: "PUT",
    data: {
      user_id,
      post_id,
    },
  });
}


// 获取指定帖子下的评论
export function getComments(post_id) {
  return request({
    url: `/post/comment/${post_id} `,
    method: "GET",
  });
}

// 创建一条评论
export function createComment({post_id, content, user_id, parent_id = null}){
  return request({
    url: "/post/comment",
    method: "POST",
    requiresAuth: true,
    data: {
      post_id,
      content,
      user_id,
      parent_id,

    },
  });
     
}


// 删除帖子
export function deletePost(post_id) {
  return request({
    url: `/post/delete/${post_id}`,
    method: "DELETE",
    requiresAuth: true,
  });
}

// 删除评论
export function deleteComment(comment_id) {
  return request({
    url: `/post/comment/${comment_id}`,
    method: "DELETE",
    requiresAuth: true,
  });
}

// 获取指定话题下的帖子
export function getPostsByTopic(topic_id) {
  return request({
    url: `/topics/${topic_id}/posts`,
    method: "GET",
  });
}