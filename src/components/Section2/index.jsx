import React, { useState } from "react";
import SectipnStyle from "./index.module.css";
import Slogan from "../Slogan";
import { Lottie, Tabs, TabPane, Image } from "@douyinfe/semi-ui";
import { IconFile, IconGlobe, IconHelpCircle } from "@douyinfe/semi-icons";

import banner1 from '@/assets/images/banner1.png';
import banner2 from '@/assets/images/banner2.png';
import banner3 from '@/assets/images/banner3.png'; // 额外的图片示例

export default function Section2() {
  // State to manage the selected tab
  const [activeKey, setActiveKey] = useState("1");

  // Image URL mapping for each tab
  const imageMap = {
    "1": banner1,
    "2": banner2,
    "3": banner3, // 你可以替换为你自己的图片地址
  };

  const jsonURL =
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/lottie_demo.json";

  return (
    <div className={SectipnStyle.section}>
      <div className="title">
        <Lottie params={{ path: jsonURL }} width={"100px"} />
        <Slogan
          h2Content="功能1模块"
          h3Content="社交互动,资源管理,高清壁纸.."
        />
      </div>

      <div className={SectipnStyle.container}>
        {/* Left tabs */}
        <Tabs 
          className={SectipnStyle.tabs} 
          activeKey={activeKey} 
          onChange={(key) => setActiveKey(key)} // Update active key on tab change
        >
          <TabPane
            tab={
              <span>
                <IconFile />
                图片模块
              </span>
            }
            itemKey="1"
          >
            <br></br>
            你可以点击进入到壁纸广场查看图片的详细,进行图片的信息的查看,同时你可以进行图片的下载和收藏,分享等等操作
          </TabPane>
          <TabPane
            tab={
              <span>
                <IconGlobe />
                社交模块
              </span>
            }
            itemKey="2"
          >
            <br></br>
            对于喜欢的博主你可以进行关注等操作,进入到了他人的首页查看他人的作品等信息. 
          </TabPane>
          <TabPane
            tab={
              <span>
                <IconHelpCircle />
                帮助模块
              </span>
            }
            itemKey="3"
          >
            <br></br>
            可以查阅帮助模块进更好的了解
          </TabPane>
        </Tabs>

        {/* Right image container */}
        <Image
          className={SectipnStyle.image}
          src={imageMap[activeKey]} // Get image based on active tab
          alt={`Image for tab ${activeKey}`} // Alt text for accessibility
        />
      </div>
    </div>
  );
}
