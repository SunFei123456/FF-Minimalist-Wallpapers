import React from "react";
import { Typography, Button, Space } from "@douyinfe/semi-ui";
import { IconHome, IconArrowLeft } from "@douyinfe/semi-icons";
import { Compass } from "lucide-react";
import styles from "./index.module.css";

const { Title, Text } = Typography;

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.illustrationContainer}>
          <div className={styles.compass}>
            <Compass
              size={64}
              strokeWidth={1.5}
              className={styles.compassIcon}
            />
          </div>
          <div className={styles.numbers}>
            <div className={styles.four}>4</div>
            <div className={styles.zero}>0</div>
            <div className={styles.four}>4</div>
          </div>
        </div>

        <Space vertical align="center" className={styles.messageContainer}>
          <Title heading={1} className={styles.title}>
            Lost in Space
          </Title>
          <Text type="secondary" className={styles.subtitle}>
            The page you're looking for has drifted into another dimension
          </Text>
        </Space>

        <div className={styles.suggestions}>
          <Text type="tertiary">You might want to check:</Text>
          <ul className={styles.suggestionList}>
            <li>The URL for any typos</li>
            <li>Your internet connection</li>
            <li>If this page has moved</li>
          </ul>
        </div>

        <Space className={styles.actions}>
          <Button
            theme="solid"
            icon={<IconHome />}
            onClick={() => (window.location.href = "/")}
            className={styles.primaryButton}
          >
            Back to Home
          </Button>
          <Button
            icon={<IconArrowLeft />}
            onClick={() => window.history.back()}
            className={styles.secondaryButton}
          >
            Go Back
          </Button>
        </Space>
      </div>
    </div>
  );
};

export default NotFound;
