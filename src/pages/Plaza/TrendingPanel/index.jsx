import React from 'react';
import { Card, List, Typography, Space } from '@douyinfe/semi-ui';
import { trends, suggestions } from '../../../mock/PostData';
import styles from './index.module.css';

const { Text, Title } = Typography;

const TrendingPanel = () => {
  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <Title heading={5}>Trending</Title>
        <List
          dataSource={trends}
          renderItem={(trend) => (
            <List.Item className={styles.trendItem}>
              <Text type="tertiary" size="small">{trend.category}</Text>
              <Text strong>{trend.title}</Text>
              <Text type="tertiary" size="small">{trend.posts} posts</Text>
            </List.Item>
          )}
        />
      </Card>

      <Card className={styles.card}>
        <Title heading={5}>Who to follow</Title>
        <List
          dataSource={suggestions}
          renderItem={(user) => (
            <List.Item className={styles.suggestionItem}>
              <Space>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className={styles.avatar}
                />
                <div>
                  <Text strong>{user.name}</Text>
                  <Text type="tertiary" size="small">@{user.handle}</Text>
                </div>
              </Space>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default TrendingPanel;