// 首页

import Carousel from "@/components/Carousel";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import homeStyle from "@/pages/Home/index.module.css";
import { IconGithubLogo, IconTiktokLogo } from "@douyinfe/semi-icons";

// 定义footer components
const Footer = () => {
  return (
    <div className={homeStyle.footer}>
      <div className={homeStyle.footerContent}>
        {/* left title */}
        <div>FF-Minimalist-Wallpapers Copyright © 2022</div>
        {/* link icon group */}
        <div className={homeStyle.link}>
          <IconGithubLogo></IconGithubLogo>
          <IconTiktokLogo></IconTiktokLogo>
        </div>
      </div>
    </div>
  );
};

function Home() {
  return (
    <>
      <Carousel></Carousel>
      <Section1></Section1>
      <Section2></Section2>

      <Footer></Footer>
    </>
  );
}

export default Home;
