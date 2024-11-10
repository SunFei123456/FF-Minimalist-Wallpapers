// 首页

import React, { useEffect, useRef } from 'react';
import { Typography, Button, Card, Tag, Image } from '@douyinfe/semi-ui';
import { IconArrowRight, IconGithubLogo, IconStar, IconDownload,  IconHeartStroked, IconUpload, IconSearch, IconCodeStroked, IconAt,IconShareMoneyStroked} from '@douyinfe/semi-icons';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';



import Parallax from 'parallax-js';
import styles from './index.module.css';
import 'animate.css';

const { Title, Text } = Typography;


// 示例壁纸数据
const SAMPLE_WALLPAPERS = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809",
    title: "极光",
    downloads: 1200,
    likes: 350
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a",
    title: "星空",
    downloads: 890,
    likes: 280
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1507499739999-097706ad8914",
    title: "山脉",
    downloads: 750,
    likes: 190
  }
];

const Home = () => {
  const typedRef = useRef(null);
  const sceneRef = useRef(null);

  const navigate = useNavigate();
  useEffect(() => {
    // 打字机效果
    const typed = new Typed(typedRef.current, {
      strings: ['简约', '优雅', '高效'],
      typeSpeed: 100,
      backSpeed: 50,
      loop: true
    });

    // 视差效果
    const scene = new Parallax(sceneRef.current);

    // 动画观察器
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animations = entry.target.dataset.animation.split(' ');
            animations.forEach(animation => {
              entry.target.classList.add('animate__animated', animation);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll(`.${styles.animated}`).forEach(el => observer.observe(el));

    return () => {
      typed.destroy();
      scene.disable();
      observer.disconnect();
    };
  }, []);

  return (
    <div className={styles.container}>
      {/* Hero Section with Parallax */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <Title heading={1} className={`${styles.animated}`} data-animation="animate__fadeInDown">
              FF极简壁纸
              <span className={styles.typedWrapper}>
                让壁纸更加<span ref={typedRef}></span>
              </span>
            </Title>
            <Text className={`${styles.animated}`} data-animation="animate__fadeInUp">
              一个专注于提供高质量壁纸服务的在线平台，致力于为用户打造简约、优雅的壁纸分享社区。
            </Text>
            <div className={`${styles.heroButtons} ${styles.animated}`} data-animation="animate__fadeInUp">
              <Button theme="solid" type="primary" icon={<IconArrowRight />} size="large">
                开始探索
              </Button>
              <Button icon={<IconGithubLogo />} size="large">
                GitHub
              </Button>
            </div>
          </div>
          <div className={styles.heroParallax} ref={sceneRef}>
            <div data-depth="0.2" className={styles.layer}>
              <img src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809" alt="Background" />
            </div>
            <div data-depth="0.4" className={styles.layer}>
              <div className={styles.floatingCard}>
                <IconStar /> 4.9 评分
              </div>
            </div>
            <div data-depth="0.6" className={styles.layer}>
              <div className={styles.floatingCard}>
                <IconDownload /> 10K+ 下载
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Wallpapers */}
      <section className={styles.featured}>
        <Title heading={2} className={`${styles.sectionTitle} ${styles.animated}`} data-animation="animate__fadeInDown">
          精选壁纸
        </Title>
        <div className={styles.featuredContent}>
          {/* 左侧壁纸展示 */}
          <div className={styles.wallpaperShowcase}>
            {SAMPLE_WALLPAPERS.map((wallpaper) => (
              <div 
                key={wallpaper.id} 
                className={`${styles.wallpaperCard} ${styles.animated}`}
                data-animation="animate__fadeInUp"
              >
                <div className={styles.wallpaperImage}>
                  <Image src={wallpaper.url} alt={wallpaper.title} />
                  <div className={styles.wallpaperOverlay}>
                    <div className={styles.wallpaperActions}>
                      <Button theme="solid" type="primary" icon={<IconDownload />}>
                        下载
                      </Button>
                      <Button icon={<IconHeartStroked />} />
                      <Button icon={<IconCodeStroked />} />
                    </div>
                  </div>
                </div>
                <div className={styles.wallpaperInfo}>
                  <div className={styles.wallpaperHeader}>
                    <Title heading={5}>{wallpaper.title}</Title>
                    <div className={styles.wallpaperTags}>
                      <Tag color="blue">风景</Tag>
                      <Tag color="green">自然</Tag>
                      <Tag color="purple">4K</Tag>
                    </div>
                  </div>
                  <div className={styles.wallpaperStats}>
                    <Tag><IconDownload /> {wallpaper.downloads}</Tag>
                    <Tag><IconHeartStroked /> {wallpaper.likes}</Tag>
                    <Tag><IconStar /> 4.9</Tag>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 右侧功能介绍 */}
          <div className={styles.featuredFeatures}>
            <div className={`${styles.featureCard} ${styles.animated}`} data-animation="animate__fadeInRight">
              <IconUpload size="extra-large" />
              <Title heading={4}>便捷上传</Title>
              <Text>支持拖拽上传、批量上传，一键分享你的创意</Text>
            </div>

            <div className={`${styles.featureCard} ${styles.animated}`} data-animation="animate__fadeInRight">
              <IconHeartStroked size="extra-large" />
              <Title heading={4}>个性收藏</Title>
              <Text>创建自定义收藏夹，智能同步多端壁纸</Text>
            </div>

            <div className={`${styles.featureCard} ${styles.animated}`} data-animation="animate__fadeInRight">
              <IconAt size="extra-large" />
              <Title heading={4}>智能标签</Title>
              <Text>AI自动识别壁纸内容，精准分类一目了然</Text>
            </div>

            <div className={`${styles.featureCard} ${styles.animated}`} data-animation="animate__fadeInRight">
              <IconSearch size="extra-large" />
              <Title heading={4}>强大搜索</Title>
              <Text>支持标签、颜色、场景、相似度等多维度搜索</Text>
            </div>

            <div className={`${styles.featureCard} ${styles.animated}`} data-animation="animate__fadeInRight">
              <IconShareMoneyStroked size="extra-large" />
              <Title heading={4}>扫码分享</Title>
              <Text>生成专属二维码，随时随地分享精美壁纸</Text>
            </div>
          </div>
        </div>
      </section>

      {/* Community Section */}
      <section className={styles.community}>
        <Title heading={2} className={`${styles.sectionTitle} ${styles.animated}`} data-animation="animate__fadeInDown">
          加入社区，发现更多可能
        </Title>
        <div className={styles.communityGrid}>
          <div className={`${styles.communityCard} ${styles.animated}`} data-animation="animate__fadeInLeft">
            <div className={styles.communityIcon}>
              <IconHeartStroked size="extra-large" />
            </div>
            <Title heading={4}>发布求图需求</Title>
            <Text>
              找不到心仪的壁纸？在社区发帖描述你想要的风格，让其他用户帮你寻找或制作专属壁纸。
            </Text>
            <div className={styles.communityExample}>
              <Card className={styles.requestCard}>
                <Text type="secondary">求一张安静的雨天咖啡馆壁纸 ☕️</Text>
                <div className={styles.requestStats}>
                  <Tag>5个回复</Tag>
                  <Tag>2天前</Tag>
                </div>
              </Card>
            </div>
          </div>

          <div className={`${styles.communityCard} ${styles.animated}`} data-animation="animate__fadeInRight">
            <div className={styles.communityIcon}>
              <IconStar size="extra-large" />
            </div>
            <Title heading={4}>分享与发现</Title>
            <Text>
              浏览其他用户分享的精选壁纸，发现独特的视觉享受。支持按风格、颜色、场景等多维度筛选。
            </Text>
            <div className={styles.communityExample}>
              <div className={styles.sharedWallpaper}>
                <Image
                  src="https://images.unsplash.com/photo-1511300636408-a63a89df3482"
                  alt="Shared Wallpaper"
                />
                <div className={styles.wallpaperMeta}>
                  <Tag>由 @创意达人 分享</Tag>
                  <Tag><IconHeartStroked /> 128</Tag>
                </div>
              </div>
            </div>
          </div>

          <div className={`${styles.communityCard} ${styles.animated}`} data-animation="animate__fadeInLeft">
            <div className={styles.communityIcon}>
              <IconDownload size="extra-large" />
            </div>
            <Title heading={4}>一键收藏</Title>
            <Text>
              喜欢的壁纸可以直接收藏，建立专属的壁纸收藏夹，随时查看和使用。支持创建多个收藏夹分类管理。
            </Text>
            <Button theme="solid" type="primary" icon={<IconHeartStroked />}>
              开始收藏
            </Button>
          </div>

          <div className={`${styles.communityCard} ${styles.animated}`} data-animation="animate__fadeInRight">
            <div className={styles.communityIcon}>
              <IconGithubLogo size="extra-large" />
            </div>
            <Title heading={4}>互动交流</Title>
            <Text>
              评论、点赞、关注创作者，参与壁纸评选活动，结识志同道合的壁纸爱好者。
            </Text>
            <Button theme="solid" type="primary">
              查看活动
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <Title heading={2} className={`${styles.sectionTitle} ${styles.animated}`} data-animation="animate__fadeInDown">
          为什么选择我们？
        </Title>
        <div className={styles.featureContent}>
          <div className={styles.featureList}>
            {[
              { title: "高清壁纸", desc: "所有壁纸都经过精心挑选，确保最佳质量" },
              { title: "智能分类", desc: "AI驱动的标签系统，让你轻松找到心仪壁纸" },
              { title: "社区互动", desc: "与志同道合的用户分享和交流" },
              { title: "个性推荐", desc: "基于你的喜好，推荐最适合你的壁纸" }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`${styles.featureItem} ${styles.animated}`}
                data-animation={`animate__fadeInUp animate__delay-${index-0.5}s`}
              >
                <Title heading={4}>{feature.title}</Title>
                <Text>{feature.desc}</Text>
              </div>
            ))}
          </div>
          <div className={`${styles.featureImage} ${styles.animated}`} data-animation="animate__fadeInRight">
            <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe" alt="Features" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statsGrid}>
          {[
            { number: "10K+", label: "精美壁纸" },
            { number: "5K+", label: "活跃用户" },
            { number: "100K+", label: "每月访问" },
            { number: "50K+", label: "下载量" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className={`${styles.statItem} ${styles.animated}`}
              data-animation="animate__fadeInUp"
            >
              <Title heading={2}>{stat.number}</Title>
              <Text>{stat.label}</Text>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className={styles.cta}>
        <div className={`${styles.ctaContent} ${styles.animated}`} data-animation="animate__fadeIn">
          <Title heading={2}>准备好开始了吗？</Title>
          <Text>加入我们的社区，发现更多精彩壁纸</Text>
          <Text style={{ cursor: "pointer", marginLeft: 8,color: "#ffffff" }} onClick={() => navigate("/wallpaper")} icon={<IconArrowRight />}>
            立即加入
          </Text>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLeft}>
            <Title heading={3}>FF极简壁纸</Title>
            <Text>让壁纸更加简约、优雅、高效</Text>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.footerColumn}>
              <Title heading={5}>产品</Title>
              <a href="#">壁纸广场</a>
              <a href="#">每日精选</a>
              <a href="#">热门推荐</a>
            </div>
            <div className={styles.footerColumn}>
              <Title heading={5}>关于</Title>
              <a href="#">关于我们</a>
              <a href="#">使用条款</a>
              <a href="#">隐私政策</a>
            </div>
            <div className={styles.footerColumn}>
              <Title heading={5}>联系</Title>
              <a href="#">GitHub</a>
              <a href="#">反馈建议</a>
              <a href="#">帮助中心</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <Text>FF-Minimalist-Wallpapers © 2024</Text>
          <div className={styles.socialLinks} onClick={() => window.open("https://github.com/FF-Minimalist-Wallpapers")}>
            <IconGithubLogo className={styles.socialIcon} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
