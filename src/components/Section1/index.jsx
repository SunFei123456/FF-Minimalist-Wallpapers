import React from "react";
import SectipnStyle from "./index.module.css";
import Slogan from "../Slogan";
import { Card } from "@douyinfe/semi-ui";
export default function Section1() {
  return (
    <div className={SectipnStyle.section1}>
      <Slogan
        h2Content="高清壁纸"
        h3Content="高清无损壁纸, 无损保存, 无水印"
      ></Slogan>
      <div className={SectipnStyle.cardGrops}>
        {/* 卡片 */}
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            style={{
              display: "inline-block",
              padding: 20,
              backgroundColor: "var(--semi-color-fill-0)",
            }}
          >
            <Card
              style={{ maxWidth: 450 }}
              bordered={false}
              headerLine={true}
              title="Semi Design"
            >
              Semi Design 是由抖音前端团队与 UED
              团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的
              Web 应用。
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
