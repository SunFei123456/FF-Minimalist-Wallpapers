import { IconSearch } from "@douyinfe/semi-icons";
import { Input } from "@douyinfe/semi-ui";
import React from "react";
import WallpaperStyle from "./index.module.css";
import { Typography, Tag, Space, Card, Button } from "@douyinfe/semi-ui";
import Waterfall from "@/components/Waterfall";
import { getAllTags } from "@/apis/tag";
import { getHot20, getTags } from "@/apis/wallpaper";
import { useEffect, useState } from "react";
import eventBus from "@/eventBus";
export default function Wallpaper() {
  const { Title } = Typography;
  // 定义存储标签的state
  const [tags, setTags] = useState([]);
  // 定义存储壁纸的state
  const [images, setImages] = useState([]);

  // 渲染完毕之后 请求接口拿数据
  const getHot20Data = async () => {
    const res = await getHot20();
    setImages(res);
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
      console.log(res);
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

  useEffect(() => {
    console.log(images);
  }, [images]); // 监控 images 状态变化

  return (
    <>
      {/* top 上方区域 */}
      <div className={WallpaperStyle.wallpaper}>
        <Title heading={2} style={{ margin: "8px 0" }}>
          极简壁纸,高质量壁纸库,快速定位你的需要
        </Title>
        <Input
          suffix={<IconSearch />}
          placeholder="搜索壁纸"
          size="large"
          showClear
        ></Input>

        <Space>
          {tags.map((item, index) => (
            <div key={item.id} className={WallpaperStyle.tab}>
              <Tag size="large" color="cyan">
                {item.name}
              </Tag>
            </div>
          ))}
        </Space>
      </div>
      {/* 操作栏 */}
      {/* // center 中间区域 */}
      <Card>
        <Space
          align="center"
          size="large"
          style={{ width: "100%", padding: "0 16px" }}
        >
          {tags.map((item, index) => (
            <Button
              key={item.id}
              type="secondary"
              style={{ marginRight: 8 }}
              onClick={() => {
                DisplayImagesUnderDifferentTabs(item.name);
              }}
            >
              {item.name}
            </Button>
          ))}
        </Space>
        {/* 等数据回来之后,再渲染下面的组件, */}
        {/* ,没有数据的时候渲染一段文本 */}
        {!images && <div><span>壁纸正在路上...</span></div>}
        {images && <Waterfall  images={images}></Waterfall>}
      </Card>
    </>
  );
}
