// Compare this snippet from TopicList.jsx:

import request from "@/server";

export function getTopics() {
  return request.get("/topics");
}

export function getTopic(id) {
  return request.get(`/topics/${id}`);
}

export function createTopic(topic) {
  return request.post("/topics/create", topic);
}

// bind post_id & topic_id
export function bindTopic({ post_id, topic_id }) {
  return request.post("/topics/bind", { post_id, topic_id });
}

// get hot topic
export function get_hot_topics() {
  return request.get("/topics/hot");
}

// get topic detail by topic_id
export function getTopicDetail(topic_id) {
  return request.get(`/topics/${topic_id}`);
}