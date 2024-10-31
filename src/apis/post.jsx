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

