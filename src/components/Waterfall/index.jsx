import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import WaterfallStyle from "./index.module.css";

export default function Waterfall({ images }) {
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };

  // 跳转图片详细页面 接收一个key id
  const goTodetail = (key) => {
    // console.log(key);
    // 跳转图片详细页面 , 并且将key 进行传递
    navigate(`/detail/${key}`);
  };

  return (
    <Masonry
      className={`animate__animated animate__fadeInLeft ${WaterfallStyle.myMasonryGrid}`}
      breakpointCols={breakpointColumnsObj}
      columnClassName={WaterfallStyle.myMasonryGridColumn}
    >
      {images.map((item, index) => {
        console.log(item.id);
        return (
          <img
            className="animate__animated animate__fadeIn"
            key={index}
            src={item.url}
            alt={item}
            style={{ width: "100%", display: "block" }}
            //  为什么这里需要修改this指向
            onClick={() => goTodetail(item.id)}
          />
        );
      })}
    </Masonry>
  );
}

//...
