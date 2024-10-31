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
  "Check your internet connection",
  "Verify the server address is correct",
  "Contact your system administrator if the problem persists",
];

const ConnectionRefused = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Card className={styles.card}>
          <Space vertical align="center" spacing="loose">
            {/* Error Icon */}
            <div className={styles.iconWrapper}>
              <IconServer size="extra-large" className={styles.serverIcon} />
              <div className={styles.crossLine} />
            </div>

            {/* Error Message */}
            <Space vertical align="center" spacing="tight">
              <Title heading={1}>Connection Refused</Title>
              <Text type="secondary" size="large">
                ERR_CONNECTION_REFUSED
              </Text>
              <Text type="tertiary" className={styles.description}>
                We couldn't establish a connection to the server. This might be
                due to network issues or the server may be temporarily
                unavailable.
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
                  <Text type="secondary">last check</Text>
                  <Space className={styles.status}>
                    <Badge dot type="warning" pulse />
                    <Text strong>1 hour ago</Text>
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
                Try Again
              </Button>
              <Button
                icon={<IconHome />}
                onClick={() => (window.location.href = "/")}
              >
                Go Home
              </Button>
            </Space>

            {/* Troubleshooting Steps */}
            <div className={styles.troubleshooting}>
              <Title heading={4}>Troubleshooting Steps:</Title>
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
              Go Back
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default ConnectionRefused;
