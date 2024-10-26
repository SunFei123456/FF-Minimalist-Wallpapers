import React from "react";
import SectipnStyle from "./index.module.css";
import Slogan from "../Slogan";

export default function Section2() {

  
  const data = [
    {
      id: 1,
      image: "/src/assets/images/jk2.jpg",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae aperiam molestias ea libero nobis consequuntur quis reiciendis deleniti eius, sed esse a cumque pariatur. Expedita eveniet earum facilis eligendi doloremque!",
      button: "更多",
    },
    {
      id: 2,
      image: "/src/assets/images/jk3.jpg",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae aperiam molestias ea libero nobis consequuntur quis reiciendis deleniti eius, sed esse a cumque pariatur. Expedita eveniet earum facilis eligendi doloremque!",
      button: "更多",
    },
    {
      id: 3,
      image: "/src/assets/images/jk4.jpg",
      content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae aperiam molestias ea libero nobis consequuntur quis reiciendis deleniti eius, sed esse a cumque pariatur. Expedita eveniet earum facilis eligendi doloremque!      ",
      button: "更多",
    },
  ];
  return (
    <div className={SectipnStyle.section}>
      <Slogan
        h2Content="潮流穿搭技巧"
        h3Content="懂得如何传达的人,可以提升自己的时尚度,快来一起学习把!"
      ></Slogan>

      {/* 上面图片 下方文本 ,右下角然后就是一个按钮 */}
      {/* map循环三个 */}

      <div className={SectipnStyle.contain}>
        {data.map((item,index ) => (
          <div className={SectipnStyle.containItem} key={index}>
            <img src={item.image} alt=""  className={ SectipnStyle.image}/>
            <div className={SectipnStyle.content}>{item.content}</div>
            <div className={SectipnStyle.button}>{item.button}</div>
          </div>
        ))}
      </div>

      <div>
        <div className={SectipnStyle.image}></div>
        <div className={SectipnStyle.content}></div>
        <div className={SectipnStyle.button}></div>
      </div>
    </div>
  );
}
