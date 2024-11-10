import { IconSearch, IconActivity } from "@douyinfe/semi-icons";
import React, { useEffect, useState } from "react";
import WallpaperStyle from "./index.module.css";
import { Input, Typography, Tag, Card, Badge, Empty } from "@douyinfe/semi-ui";
import {
  IllustrationNoResult,
  IllustrationNoResultDark,
} from "@douyinfe/semi-illustrations";
import Waterfall from "@/components/Waterfall";
import { getAllTags } from "@/apis/tag";
import { getHot20, getTags, searchbykeyword } from "@/apis/wallpaper";
import eventBus from "@/eventBus";
import "animate.css";
import { Toast } from "@douyinfe/semi-ui";
import Loading from "@/components/Loading";
import ConnectionRefused from "@/components/Error/ConnectionRefused/Connection_refused";

// 添加装饰性图形组件
const DecorativeShape = ({ className }) => (
  <div className={`${WallpaperStyle.shape} ${className}`}>
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <path
        fill="currentColor"
        strokeWidth="1"
        d="M47.5,-61.5C59.2,-52.9,64.8,-35.6,68.2,-18.1C71.5,-0.6,72.7,17,65.8,30.4C58.9,43.8,44,52.9,28.5,58.7C13,64.5,-3,67,-17.9,63.3C-32.8,59.6,-46.5,49.8,-56.3,36.3C-66.1,22.8,-72,5.7,-69.1,-9.7C-66.3,-25,-54.7,-38.6,-41.5,-47.1C-28.3,-55.7,-13.5,-59.2,2.9,-62.8C19.4,-66.4,35.8,-70.1,47.5,-61.5Z"
        transform="translate(100 100)"
      />
    </svg>
  </div>
);

export default function Wallpaper() {
  const { Title, Text } = Typography;
  const [tags, setTags] = useState([]);
  const [images, setImages] = useState([]);
  const [activeTag, setActiveTag] = useState("热门"); // 新增：当前选中的标签

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [noWallpaper, setNoWallpaper] = useState(false);

  // 渲染完毕之后 请求接口拿数据
  const getHot20Data = async () => {
    setLoading(true);
    try {
      const res = await getHot20();
      setImages(res);
    } catch (error) {
      setError(true);
      Toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getTagsData = async () => {
    getAllTags().then((res) => {
      if (res.code == 200) {
        setTags(res.data);
      }
    });
  };
  // 点击不同标签显示不同标签下的图片
  const DisplayImagesUnderDifferentTabs = (tag) => {
    getTags(tag).then((res) => {
      setImages(res);
    });
  };

  useEffect(() => {
    getHot20Data();
    getTagsData();
  }, []);

  useEffect(() => {
    const handleUpdateData = (res) => {
      setImages(res.images);
    };
    eventBus.on("updateData", handleUpdateData);
    // Cleanup
    return () => {
      eventBus.off("updateData", handleUpdateData);
    };
  }, []);

  const handleTagClick = (tagName) => {
    if(tagName == "热门") getHot20Data();
    setActiveTag(tagName);
    DisplayImagesUnderDifferentTabs(tagName);
  };

  // 搜素壁纸
  const search = async () => {
    try {
      const res = await searchbykeyword(keyword);
      eventBus.emit("updateData", res);
      setNoWallpaper(false);
    } catch (error) {
      if (error.response.data.error == "未找到相关图片") {
        setNoWallpaper(true);
      }
    } finally {
      setLoading(false);
    }
  };
  // 清空输入框 回到初始状态
  const clearInput = () => {
    setKeyword("");
    setNoWallpaper(false);
    getHot20Data();
  };

  if (error) {
    return <ConnectionRefused />;
  }
  if (loading) {
    return <Loading />;
  }



  return (
    <div className={WallpaperStyle.container}>
      {/* Hero Section */}
      <section className={WallpaperStyle.hero}>
        <div className={WallpaperStyle.heroBackground}>
          <DecorativeShape className={WallpaperStyle.shape1} />
          <DecorativeShape className={WallpaperStyle.shape2} />
          <DecorativeShape className={WallpaperStyle.shape3} />
        </div>
        <div className={WallpaperStyle.heroContent}>
          <div className={WallpaperStyle.heroText}>
            <Title
              heading={1}
              className={`${WallpaperStyle.title} ${WallpaperStyle.animated}`}
              data-animation="animate__fadeInDown"
            >
              发现完美壁纸
              <span className={WallpaperStyle.highlight}>.</span>
            </Title>
            <Text
              className={`${WallpaperStyle.subtitle} ${WallpaperStyle.animated}`}
              data-animation="animate__fadeInUp"
            >
              探索我们精心挑选的高质量壁纸库，为你的设备找到最完美的装扮
            </Text>
            <div
              className={`${WallpaperStyle.searchWrapper} ${WallpaperStyle.animated}`}
              data-animation="animate__fadeInUp"
            >
              <Input
                suffix={<IconSearch onClick={search} />}
                placeholder="搜索你喜欢的壁纸..."
                size="large"
                showClear
                value={keyword}
                onChange={(value) => setKeyword(value)}
                className={WallpaperStyle.searchInput}
                // 清空
                onClear={clearInput}
              />
              <div className={WallpaperStyle.searchTags}>
                <Text type="secondary">热门搜索：</Text>
                <Tag className={WallpaperStyle.quickTag} onClick={() => handleTagClick("AIGC")}>AIGC</Tag>
                <Tag className={WallpaperStyle.quickTag} onClick={() => handleTagClick("美女")}>美女</Tag>
                <Tag className={WallpaperStyle.quickTag} onClick={() => handleTagClick("天空")}>天空</Tag>
              </div>
            </div>
          </div>
          {/* <div className={`${WallpaperStyle.heroStats} ${WallpaperStyle.animated}`} data-animation="animate__fadeInUp">
            <div className={WallpaperStyle.statItem}>
              <Title heading={3}>10K+</Title>
              <Text type="secondary">精选壁纸</Text>
            </div>
            <div className={WallpaperStyle.statItem}>
              <Title heading={3}>5K+</Title>
              <Text type="secondary">活跃用户</Text>
            </div>
            <div className={WallpaperStyle.statItem}>
              <Title heading={3}>99%</Title>
              <Text type="secondary">好评率</Text>
            </div>
          </div> */}
        </div>
      </section>

      {/* Tags Section */}
      <section className={WallpaperStyle.tagsSection}>
        <Card className={WallpaperStyle.tagsCard}>
          <div className={WallpaperStyle.tagHeader}>
            <div className={WallpaperStyle.tagTitle}>
              <IconActivity size="large" className={WallpaperStyle.fireIcon} />
              <Title heading={4}>热门标签</Title>
            </div>
          </div>
          <div className={WallpaperStyle.tags}>
            <Tag
              size="large"
              color="violet"
              className={`${WallpaperStyle.tag} ${
                activeTag === "热门" ? WallpaperStyle.activeTag : ""
              }`}
              onClick={() => handleTagClick("热门")}
            >
              热门
            </Tag>
            {tags.map((item) => (
              <Badge
                key={item.id}
                count={5}
                theme="light"
                className={WallpaperStyle.tagBadge}
              >
                <Tag
                  size="large"
                  color="violet"
                  className={`${WallpaperStyle.tag} ${
                    activeTag === item.name ? WallpaperStyle.activeTag : ""
                  }`}
                  onClick={() => handleTagClick(item.name)}
                >
                  {item.name}
                </Tag>
              </Badge>
            ))}
          </div>
        </Card>
      </section>

      {/* Waterfall Section */}
      <section className={WallpaperStyle.waterfallSection}>
        {noWallpaper ? (
          <div className={WallpaperStyle.noWallpaper}>
            <Empty
              image={
                <IllustrationNoResult style={{ width: 150, height: 150 }} />
              }
              description="未找到相关图片"
              className={WallpaperStyle.noWallpaperIllustration}
            />
          </div>
        ) : (
          <>
            {images && images.length > 0 ? (
              <Waterfall images={images} />
            ) : (
              <Empty
                image={
                  <IllustrationNoResult style={{ width: 150, height: 150 }} />
                }
                darkModeImage={
                  <IllustrationNoResultDark
                    style={{ width: 150, height: 150 }}
                  />
                }
                description={"搜索无结果"}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}
