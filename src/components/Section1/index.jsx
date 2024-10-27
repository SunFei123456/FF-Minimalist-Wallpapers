import React from "react";
import SectipnStyle from "./index.module.css";
import Slogan from "../Slogan";
import { Card } from "@douyinfe/semi-ui";
import {
  IconStar,
  IconImage,
  IconDownload,
  IconFile,
  IconPlay,
  IconCloud,
} from "@douyinfe/semi-icons";
import { Lottie } from "@douyinfe/semi-ui";

export default function Section1() {
  // 配置每个卡片的内容 id, title, content
  const cardData = [
    {
      id: 1,
      title: "简约设计",
      content:
        "我们的壁纸网站采用简约设计，让您轻松找到您喜欢的高清壁纸，减少视觉干扰，专注于美丽的图像。",
      icon: <IconStar style={{ marginRight: 8 }} />,
    },
    {
      id: 2,
      title: "美丽壁纸",
      content:
        "我们提供多种风格的高清壁纸，满足您的各种需求，帮助您个性化您的设备，让每次使用都充满灵感。",
      icon: <IconImage style={{ marginRight: 8 }} />,
    },
    {
      id: 3,
      title: "高清质量",
      content:
        "所有壁纸均为高清品质，确保在任何设备上都能展现出最佳效果，提升您的视觉享受。",
      icon: <IconFile style={{ marginRight: 8 }} />,
    },
    {
      id: 4,
      title: "无水印",
      content:
        "我们提供的所有壁纸均为高清无水印，确保您可以享受最佳的视觉体验，完美呈现每一张壁纸。",
      icon: <IconDownload style={{ marginRight: 8 }} />,
    },
    {
      id: 5,
      title: "多样风格",
      content: "我们的壁纸涵盖多种风格，从自然风景到抽象艺术，总有一款适合您。",
      icon: <IconPlay style={{ marginRight: 8 }} />,
    },
    {
      id: 6,
      title: "云端存储",
      content: "支持云端存储功能，让您随时随地访问和下载您喜爱的壁纸。",
      icon: <IconCloud style={{ marginRight: 8 }} />,
    },
  ];

  const jsonURL = "https://lottie.host/af482680-8732-428f-ad94-c0171d208897/omV62sfPJe.json";

  return (
    <div className={SectipnStyle.section1}>
      <div className={SectipnStyle.title}>
        <Lottie params={{ path: jsonURL }} width={"150px"}></Lottie>
        <Slogan
          h2Content="高清壁纸"
          h3Content="高清无损壁纸, 无损保存, 无水印"
        />
      </div>
      <br />
      <br />
      <div className={SectipnStyle.cardGrops}>
        {/* 卡片 */}
        {cardData.map((item) => (
          <div
            key={item.id}
            className={SectipnStyle.singleCard}
          >
            <Card
              style={{ width: "100%", height: 200 }}
              bordered={false}
              headerLine={true}
              title={
                <span className={SectipnStyle.cardHeader}>
                  {item.icon}
                  {item.title}
                </span>
              }
            >
              {item.content}
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}