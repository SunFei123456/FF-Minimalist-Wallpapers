你遇到的问题是因为你在给 `onClick` 事件处理程序传递参数时，直接调用了函数，而不是传递一个函数引用。这导致页面渲染时函数被立即调用，直接触发跳转。

### 修改代码

将 `onClick` 的调用方式改为传递一个函数引用，这样只有在点击时才会调用 `goTodetail` 函数。

修改前：
```jsx
onClick={goTodetail(item.id)}
```

修改后：
```jsx
onClick={() => goTodetail(item.id)}
```

完整的代码应如下所示：
```jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Masonry from "react-masonry-css";
import WaterfallStyle from "./index.module.css";
//  导入apis
import { getHot20 } from "@/apis/wallpaper";

export default function Waterfall() {
  const navigate = useNavigate();
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    700: 2,
    500: 1,
  };
  // 定义存储壁纸的state
  const [images, setImages] = useState([]);

  // 跳转图片详细页面 接收一个key id
  const goTodetail = (key) => {
    // 跳转图片详细页面 , 并且将key 进行传递
    navigate(`/detail/${key}`);
  };

  // 渲染完毕之后 请求接口拿数据
  const getHot20Data = async () => {
    const res = await getHot20();
    setImages(res);
  };

  useEffect(() => {
    getHot20Data();
  }, []);

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={WaterfallStyle.myMasonryGrid}
      columnClassName={WaterfallStyle.myMasonryGridColumn}
    >
      {images.map((item, index) => {
        return (
          <img
            key={index}
            src={item.url}
            alt={`wallpaper-${item.id}`}
            style={{ width: "100%", display: "block" }}
            onClick={() => goTodetail(item.id)}
          />
        );
      })}
    </Masonry>
  );
}
```

### 解释

- **函数调用与函数引用**: 当你使用 `onClick={goTodetail(item.id)}` 时，`goTodetail` 函数在渲染时立即被调用，而不是在点击时调用。改为 `onClick={() => goTodetail(item.id)}` 会创建一个新的函数，当 `onClick` 事件触发时才会调用 `goTodetail`。
- **`alt` 属性**: 修改 `alt={item}` 为更具描述性的内容，例如 `alt={`wallpaper-${item.id}`}`。

### 其他建议

1. **初始化 `images` 状态**: 使用 `useState([])` 初始化 `images`，而不是 `useState([{}])`，以避免初始状态包含无效的空对象。
2. **错误处理**: 在 `getHot20Data` 中添加错误处理，以确保在 API 请求失败时不会导致应用崩溃。
3. **加载状态**: 考虑在数据加载期间显示一个加载指示器，以改善用户体验。