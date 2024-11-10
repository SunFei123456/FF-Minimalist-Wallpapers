import React, { useState } from "react";
import { Input, List, Avatar, Typography } from "@douyinfe/semi-ui";
import { IconHash } from "@douyinfe/semi-icons";
import { useEffect } from "react";
import { getTopics } from "@/apis/topic";

const { Text } = Typography;

const TopicList = ({ onTopicClick }) => {
  const [search, setSearch] = useState("");

  // get topic list
  const [topics, setTopics] = useState([]);
  const getTopicsList = () => {
    // 调用接口获取话题列表
    getTopics().then((res) => {
      setTopics(res.data);
    })
  }

  useEffect(() => {
    getTopicsList()
  }, [search]);

  const filteredTopics = topics.filter((topic) => topic.name.includes(search));

  return (
    <div
      style={{
        width: 500,
        height: 300,
        padding: 16,
        borderRadius: 8,
        backgroundColor: "var(--semi-color-bg-1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Input
        placeholder="搜索话题"
        prefix={<IconHash />}
        value={search}
        onChange={(value) => setSearch(value)}
        style={{ marginBottom: 16 }}
      />
      <div style={{ flexGrow: 1, overflowY: "auto", }}>
        <List
          dataSource={filteredTopics}
          renderItem={(item) => (
            <List.Item
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                padding: "8px 0",
              }}
              onClick={() => {
                onTopicClick(item.id,item.name);
                console.log("点击了话题: " + item.id)
              }}
              main={
                <div
                  style={{
                    maxWidth: '300px',
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </div>
              }
              header={
                <Avatar
                  size="small"
                  src="URL_ADDRESS" // 替换为实际图片 URL
                />
              }
            >
              <Text type="tertiary" style={{ fontSize: 12 }}>
                {item.views}浏览 · {item.joins}参与
              </Text>
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default TopicList;
