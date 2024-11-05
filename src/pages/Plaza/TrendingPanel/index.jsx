import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, List, Typography, Space, Skeleton } from '@douyinfe/semi-ui';
import styles from './index.module.css';

import { get_top_users } from '@/apis/user';
import { get_hot_topics } from '@/apis/topic';

const { Text, Title } = Typography;

const TrendingPanel = () => {
  const navigate = useNavigate();
  const [hotUsers, setHotUsers] = useState([]);
  const [hotTopic, setHotTopic] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingTopics, setLoadingTopics] = useState(true);

  // 获取热榜用户
  const fetchHotUsers = async () => {
    const res = await get_top_users();
    console.log("res", res);
    if (res.code === 200) {
      setHotUsers(res.data);
    }
    setLoadingUsers(false);
  };

  // 获取热榜话题
  const fetchHotTopic = async () => {
    const res = await get_hot_topics();
    console.log("res", res);
    if (res.code === 200) {
      setHotTopic(res.data);
    }
    setLoadingTopics(false);
  };

  // 跳转到话题详情页
  const handleTopicClick = (topicId) => {
    navigate(`/topic/${topicId}`);
  };

  useEffect(() => {
    fetchHotUsers();
    fetchHotTopic();
  }, []);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title heading={5}>推荐话题</Title>
        {loadingTopics ? (
          <Skeleton 
            placeholder={<Skeleton.Paragraph rows={3} />} 
            loading={true} 
            style={{ width: '100%', height: 'auto' }}
          />
        ) : (
          <List
            dataSource={hotTopic}
            renderItem={(trend, index) => (
              <List.Item className={styles.trendItem} onClick={() => handleTopicClick(trend.id)}>
                <Text type="tertiary" size="small">{index + 1}</Text>
                <Text strong>{'#' + trend.name}</Text>
                <Text type="tertiary" size="small">{trend.views} Views</Text>
              </List.Item>
            )}
          />
        )}
      </Card>

      <Card className={styles.card}>
        <Title heading={5}>热门作者</Title>
        {loadingUsers ? (
          <Skeleton 
            placeholder={<Skeleton.Avatar />} 
            loading={true} 
            style={{ width: '100%', height: 'auto' }}
          />
        ) : (
          <List
            dataSource={hotUsers}
            renderItem={(data) => (
              <List.Item className={styles.suggestionItem}>
                <Space>
                  <img
                    src={data.user.image}
                    alt={data.user.username}
                    className={styles.avatar}
                  />
                  <div>
                    <div>
                      <Text strong style={{ marginRight: 8 }}>{data.user.username}</Text>
                      <Text type="tertiary" size="small">@{data.user.email}</Text>
                    </div>
                    <Text size='small' type="tertiary">发帖数量: {data.post_count}</Text>
                  </div>
                </Space>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
};

export default TrendingPanel;