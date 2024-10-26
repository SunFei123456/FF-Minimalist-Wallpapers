import request from "@/server";


// 127.0.0.1:5000/tag/get_all_tags
export function getAllTags() {
    return request({
        url: "/tag/get_all_tags",
        method: "get",
    });
}