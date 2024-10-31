import { IconSearch } from "@douyinfe/semi-icons";
import React from "react";
import WallpaperStyle from "./index.module.css";
import { Input, Typography, Tag, Card, Badge } from "@douyinfe/semi-ui";
import Waterfall from "@/components/Waterfall";
import { getAllTags } from "@/apis/tag";
import { getHot20, getTags } from "@/apis/wallpaper";
import { useEffect, useState } from "react";
import eventBus from "@/eventBus";
import ConnectionRefused from "@/components/Error/ConnectionRefused/Connection_refused";
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
      {/* 操作栏 */}
      {/* // center 中间区域 */}
      {tags.length > 0 ? (
        <>
          {/* top 上方区域 */}
          <div className={WallpaperStyle.wallpaper}>
            <div className={WallpaperStyle.title}>
              极简壁纸,高质量壁纸库,快速定位你的需要
            </div>
            <Input
              suffix={<IconSearch />}
              placeholder="搜索壁纸"
              size="large"
              showClear
            ></Input>
          </div>
          <Card>
            <div className={WallpaperStyle.tabs}>
              {tags.map((item, index) => (
                <Badge count={5} theme="light">
                  <Tag
                    size="large"
                    shape="circle"
                    color="violet"
                    key={item.id}
                    onClick={() => {
                      DisplayImagesUnderDifferentTabs(item.name);
                    }}
                  >
                    {item.name}
                  </Tag>
                </Badge>
              ))}
            </div>
            {images && <Waterfall images={images}></Waterfall>}
          </Card>
        </>
      ) : (
        <div>
          <ConnectionRefused></ConnectionRefused>
        </div>
      )}
    </>
  );
}
