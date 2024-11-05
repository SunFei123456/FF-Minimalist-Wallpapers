import React from 'react';
import styles from './index.module.css'; // 引入 CSS Modules 文件

const Loading = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <h2>加载中，请稍候...</h2>
        </div>
    );
};

export default Loading;
