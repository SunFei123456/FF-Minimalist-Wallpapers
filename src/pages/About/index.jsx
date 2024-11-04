import React, { useEffect, useRef } from 'react';
import 'animate.css';
import styles from './index.module.css';

export default function About() {
  const observerRef = useRef(null);

  useEffect(() => {
    // 创建 Intersection Observer
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const animations = entry.target.dataset.animation.split(' ');
          animations.forEach(animation => {
            entry.target.classList.add('animate__animated', animation);
          });
        }
      });
    }, { threshold: 0.1 });

    // 获取所有需要动画的元素
    const animatedElements = document.querySelectorAll(`.${styles.animated}`);
    animatedElements.forEach(el => observerRef.current.observe(el));

    // 清理
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className={styles.aboutContainer}>
      <section className={`${styles.heroSection} ${styles.animated}`} data-animation="animate__fadeIn">
        <h1>关于 FF极简壁纸</h1>
        <p className={styles.intro}>
          FF极简壁纸是一个专注于提供高质量壁纸服务的在线平台，致力于为用户打造简约、优雅的壁纸分享社区。
        </p>
      </section>

      <section className={styles.featuresSection}>
        <h2 className={`${styles.animated}`} data-animation="animate__fadeInUp">🌟 核心功能</h2>
        <div className={styles.featuresGrid}>
          {[
            {
              title: '壁纸服务',
              items: ['精美壁纸的上传与下载', '个性化的收藏与点赞系统', '智能标签分类', '强大的搜索功能', '二维码分享功能']
            },
            {
              title: '社交互动',
              items: ['用户关注系统', '个性化个人主页', '社区互动广场', '多级评论系统', '话题讨论功能']
            },
            {
              title: '个性化体验',
              items: ['深色/浅色主题切换', '个人信息自定义', '个性化背景设置', '响应式界面设计']
            }
          ].map((feature, index) => (
            <div 
              key={index}
              className={`${styles.featureCard} ${styles.animated}`}
              data-animation={`animate__fadeInUp animate__delay-${index}s`}
            >
              <h3>{feature.title}</h3>
              <ul>
                {feature.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.highlightsSection}>
        <h2 className={`${styles.animated}`} data-animation="animate__fadeInUp">🎯 项目特色</h2>
        <div className={styles.highlightsGrid}>
          {[
            { title: '简约至上', desc: '遵循极简设计理念，提供清爽的用户界面' },
            { title: '用户友好', desc: '直观的操作流程，完善的交互反馈' },
            { title: '社区互动', desc: '支持用户间的关注、互动，打造活跃的壁纸分享社区' },
            { title: '个性定制', desc: '支持用户个性化设置，提供独特的使用体验' }
          ].map((item, index) => (
            <div 
              key={index}
              className={`${styles.highlightCard} ${styles.animated}`}
              data-animation={`animate__fadeInUp animate__delay-${index}s`}
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.techSection} ${styles.animated}`} data-animation="animate__fadeInUp">
        <h2>🚀 技术亮点</h2>
        <div className={styles.techList}>
          {[
            '前后端分离架构',
            '实时UI更新和交互反馈',
            '用户认证和权限管理',
            '响应式设计适配',
            '性能优化和用户体验提升'
          ].map((tech, index) => (
            <div key={index} className={styles.techItem}>
              {tech}
            </div>
          ))}
        </div>
      </section>

      <section className={`${styles.visionSection} ${styles.animated}`} data-animation="animate__fadeIn">
        <h2>💡 愿景</h2>
        <p>
          我们致力于打造一个优质的壁纸分享社区，让每位用户都能找到心仪的壁纸，分享自己的作品，结识志同道合的朋友。
          通过持续优化和创新，为用户提供更好的服务体验。
        </p>
      </section>
    </div>
  );
}
