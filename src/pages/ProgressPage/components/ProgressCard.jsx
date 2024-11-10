
import React from 'react';
import { Card, Typography, Tag, Space } from '@douyinfe/semi-ui';
import { CheckCircle } from 'lucide-react';
import styles from './ProgressCard.module.css';

const { Text, Title } = Typography;

const ProgressCard = ({ date, tasks }) => {
  return (
    <Card className={styles.card}>
      <div className={styles.dateHeader}>
        <Title heading={4}>{date}</Title>
      </div>
      <div className={styles.taskList}>
        {tasks.map((task, index) => (
          <div key={index} className={styles.taskItem}>
            <Space>
              {task.completed && (
                <CheckCircle className={styles.checkIcon} size={16} />
              )}
              <Text>{task.text}</Text>
              {task.important && (
                <Tag color="red" type="light">重要</Tag>
              )}
              {task.completed && (
                <Tag color="green" type="light">
                  {task.completionTime || "已完成 ✅"}
                </Tag>
              )}
            </Space>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressCard;