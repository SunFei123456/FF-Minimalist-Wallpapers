import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import WaterfallStyle from "./index.module.css";

export default function Waterfall({ images }) {
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    700: 3,
    500: 2,
  };

  const goTodetail = (key) => {
    navigate(`/detail/${key}`);
  };

  return (
    <Masonry
      className={`animate__animated animate__fadeIn ${WaterfallStyle.myMasonryGrid}`}
      breakpointCols={breakpointColumnsObj}
      columnClassName={WaterfallStyle.myMasonryGridColumn}
    >
      {images.map((item, index) => {
        return (
          <img
            className="animate__animated animate__fadeIn"
            key={index}
            src={item.url}
            alt={item}
            style={{ width: "100%", display: "block",borderRadius:"12px" }}
            onClick={() => goTodetail(item.id)}
          />
        );
      })}
    </Masonry>
  );
}

//...
