import React from 'react';
import { Layout, Typography, Nav } from '@douyinfe/semi-ui';
import { Calendar, LayoutDashboard } from 'lucide-react';
import ProgressCard from './components/ProgressCard';
import styles from './index.module.css';
import progressDataList from  './data/index'
const { Content } = Layout;

function ProgressPage() {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.progressContainer}>
          {progressDataList.map((period, index) => (
            <ProgressCard 
              key={index}
              date={period.date}
              tasks={period.tasks}
            />
          ))}
        </div>
      </Content>
    </Layout>
  );
}

export default ProgressPage;