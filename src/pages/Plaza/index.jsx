import React from 'react';
import { Layout } from '@douyinfe/semi-ui';
import Sidebar from './Sidebar';
import PostList from './PostList/index';
import TrendingPanel from './TrendingPanel/index';
import styles from './index.module.css';

const Feed = () => {
  return (
    <Layout className={styles.layout}>
      <Layout.Sider className={styles.sider}>
        <Sidebar />
      </Layout.Sider>
      <Layout.Content className={styles.content}>
        <PostList />
      </Layout.Content>
      <Layout.Sider className={styles.trendingSider}>
        <TrendingPanel />
      </Layout.Sider>
    </Layout>
  );
};

export default Feed;