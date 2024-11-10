import React from "react";
import {
  Button,
  Typography,
  Card,
  Space,
  List,
  Badge,
} from "@douyinfe/semi-ui";
import {
  IconRefresh,
  IconHome,
  IconChevronLeft,
  IconServer,
} from "@douyinfe/semi-icons";
import styles from "./index.module.css";

const { Title, Text } = Typography;

const troubleshootingSteps = [
  "检查您的网络是否可以正常连接",
  "验证服务器是否正常运行",
  "如果问题仍然存在,请联系服务器管理员 2770894499@qq.com",
];

const ConnectionRefused = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.card}>
          <Space vertical align="center" spacing="loose">
            {/* Error Icon */}
            <div className={styles.iconWrapper}>
              <IconServer size="extra-large" className={styles.serverIcon} />
              <div className={styles.crossLine} />
            </div>

            {/* Error Message */}
            <Space vertical align="center" spacing="tight">
              <Title heading={1}>连接失败</Title>
              <Text type="secondary" size="large">
                连接被拒绝
              </Text>
              <Text type="tertiary" className={styles.description}>
                我们无法与服务器建立连接。这可能是由于网络问题或服务器暂时不可用。
              </Text>
            </Space>

            {/* Status Indicator */}
            <Card className={styles.statusCard}>
              <div className={styles.statusGrid}>
                <div>
                  <Text type="secondary">Server Status</Text>
                  <Space className={styles.status}>
                    <Badge dot type="danger" pulse />
                    <Text strong>Offline</Text>
                  </Space>
                </div>
                <div className={styles.lastCheck}>
                  <Text type="secondary">最后检查</Text>
                  <Space className={styles.status}>
                    <Badge dot type="warning" pulse />
                    <Text strong>1 小时前</Text>
                  </Space>
                </div>
              </div>
            </Card>

            {/* Action Buttons */}
            <Space>
              <Button
                icon={<IconRefresh />}
                theme="solid"
                onClick={() => window.location.reload()}
              >
                再试一次
              </Button>
              <Button
                icon={<IconHome />}
                onClick={() => (window.location.href = "/")}
              >
                首页
              </Button>
            </Space>

            {/* Troubleshooting Steps */}
            <div className={styles.troubleshooting}>
              <Title heading={4}>故障排除步骤:</Title>
              <List
                dataSource={troubleshootingSteps}
                renderItem={(item, index) => (
                  <List.Item className={styles.listItem}>
                    <Badge type="secondary" count={index + 1} />
                    <Text>{item}</Text>
                  </List.Item>
                )}
              />
            </div>

            {/* Back Button */}
            <Button
              icon={<IconChevronLeft />}
              type="tertiary"
              onClick={() => window.history.back()}
            >
              返回首页
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRefused;
