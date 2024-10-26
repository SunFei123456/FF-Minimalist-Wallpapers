



项目手册(4 page)

论文的内容, 简要说明



查重报告














# 组件库

## 介绍:

Semi Design 是一个设计系统，它定义了一套`中后台设计与前端基础组件`，帮助我们更容易地创造更加一致的用户体验。


Semi Design 是由`抖音前端团队`，`MED 产品设计团队设计`、开发并维护的设计系统。它作为`全面、易用、优质`的`现代应用 UI `解决方案，从字节跳动各业务线的复杂场景提炼而来，支撑近千计平台产品，服务内外部 10 万+ 用户。


## 安装

```shell

# 使用 npm
npm i @douyinfe/semi-ui

# 使用 yarn
yarn add @douyinfe/semi-ui

# 使用 pnpm
pnpm add @douyinfe/semi-ui

```


### 使用

#### 暗黑/亮白模式切换

```css

// css
body {
    color: var(--semi-color-text-0);
    background-color: var( --semi-color-bg-0);
}

```

```jsx

const body = document.body;
if (body.hasAttribute('theme-mode')) {
    body.removeAttribute('theme-mode');
} else {
    body.setAttribute('theme-mode', 'dark');
}

```








## 需求

- UI 细节优化 包括hover ,active 等等

- 首页面展示完善 包括文字 图片

- 壁纸页面 中间搜索框 功能实现

- 中间搜索框 下方 标签展示 && 功能实现

- 编辑信息弹框 的 右上方❌  退出, 提交自动退出   **5/24 15:42 完成 ✅**

- 个人页面的背景图片 的上传 和 更新 (`暂时不重要1`)

- 个人页面下方的**上传,喜欢,收藏** 里面的图片 实现点击跳转详细页面(`重要`) **5/24 0:24 完成✅**

- 壁纸详细页面实现`喜欢`, `收藏`, `下载` 功能 (`重要`)  **5/24 0:24 完成 ✅**

- 针对图片详细页面做一个身份鉴别的功能, 具体就是:    **5/24 0:52 完成 ✅**
    - 是当前用户的图片, 就显示`删除` 按钮, 并且右上方的`关注按钮` 删掉 , 替换成`查看个人主页`
    - 不是当前用户的图片, 就显示`关注` 按钮 

    - 完成`删除`功能  **5/24 1:22✅**

- 实现关注功能 (`重要`)    **5/24 10:22✅**

- 实现壁纸详细页面 右方点击发布者头像 进入到他的个人页面 (`重要`)    **5/24 15:12✅**


- 考虑实现壁纸详细页面 一键将该图片设置为电脑壁纸 (`考虑`)  =======> 浏览器环境无法实现
- 切换页面模式(暗黑or亮白), 进行`持久化存储用户上次操作的结果`, 即使页面刷新, 也保持上次的模式来 5/24 15:30✅
- 在编辑用户信息的`表单`里面进行`数据的回显`, 打开表单默认就展示已有的信息. **5/24 15:52✅**
- 在个人中心页面, 点击上方部分的右方的+号, 进行背景图片的替换. ===> 个人页面 **5/24 17:16✅**
- 在壁纸详细页面, 添加一个生成一个关于此图片的二维码图片, 用来方便其他用户可以让朋友扫码看到这张图片. 5/24 21:48✅





##### 5/24 号 -> 完成的需求

flask

- 实现`关注行为`,`用户取消关注行为` , `是否已经关注`, `获取用户的关注和粉丝数量` 接口
- 实现`生成qrcode二维码` 接口



react

- 实现了`根据不同状态值展示不一样的图片详细页面`  ==> 图片详细页面
- 实现了个人主页的`关注`, `粉丝`, `喜欢` 字段值的渲染 ==> 个人主页
- 实现了个人主页的中间tap切换右侧`显示对应的数量` ==> 个人主页
- 对接了`关注行为`, ... ==> 接口功能对接
- 在壁纸详细页面点击`右上方头像跳转到该作品的发布者`的`个人中心页面 `
- 切换页面模式(暗黑or亮白), 进行`持久化存储用户上次操作的结果`, 即使页面刷新, 也保持上次的模式来 5/24 15:30
- 在编辑用户信息的`表单`里面进行`数据的回显`, 打开表单默认就展示已有的信息. **5/24 15:52**
- 在个人中心页面, 点击上方部分的右方的+号, 进行背景图片的替换. ===> 个人页面 **5/24 17:16✅**
- 在壁纸详细页面, 添加一个生成一个关于此图片的二维码图片, 用来方便其他用户可以让朋友扫码看到这张图片. 5/24 21:48✅









在壁纸详细页面的右上方显示的是该图片的发布者的基本信息(`头像`, `昵称`, `个人简介`), 需要实现的需求是点击用户头像, 跳转到他的个人中心页面.



我们这里需要动态路由, 因为个人中心基本都是一个样子, 我们可以使用一个页面, 而页面内容的展示取决于用户的id, 因为里面的内容都是通过`用户id` 进行`后端接口调用`, 返回`用户的信息`. 

所以路由配置是这样

```jsx
 { path: "/user/:id", element: <Self /> },
```

在壁纸详细页面,我们点击头像的时候, 使用`react-router-dom 提供useNavigate钩子` 进行路由跳转

- 壁纸信息都保存在`picDetail`中, 也包含了该壁纸的发布人的id(`author`),这个id就是我们需要的.
- 然后使用navigate跳转到中心页

```jsx
  const goto_Personal_homepage = (id)=>{
    navigate(`/user/${id}`)
  }

    <Space align="center"  >
            {/* 发布者头像 */}
            <img src={userCurrentInfo.user_avatar} alt="发布者头像" className={DetailStyle.publisher}  onClick={()=>goto_Personal_homepage(picDetail.author)} />
            {/* 发布者名字 */}
            <Space align="start"  vertical>
              <span className={DetailStyle.publisher_name}>{userCurrentInfo.user_nickname}</span>
              <span className={DetailStyle.publisher_desc}>{userCurrentInfo.user_description}</span>
            </Space>
          </Space>
```



在中心页面,使用`useParams 钩子函数` 拿到动态路由后面的参数, id

```jsx
import { useParams } from "react-router-dom";
export default function Self() {
  // 获取路由参数
  const { id } = useParams();
  ......
}
```

然后`对于获取用户的信息, 获取用户上传的壁纸, 获取用户喜欢的壁纸, 获取用户收藏的壁纸`, 都可以通过这个id来进行获取.

下面渲染模板就不多说了.

```jsx
// 获取用户信息
 get_user_info(id).then((res) => {
      console.log(res);
      setuserInfoData(res);
 }); 
// 获取我上传的壁纸看列表
  const getmyUploadsimageList = async () => {
    get_user_images(id)
      .then((res) => {
        if (res.code == 200) {
          console.log(res);
          setmyUploadsimageList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 获取我喜欢的图片列表
  const getmyLikesimageList = async () => {
    const res = await get_user_likes(id);
    if (res.code == 200) {
      setmyLikesimageList(res.data);
    }
  };

  // 获取我收藏的图片列表
  const getmyCollectsimageList = async () => {
    const res = await get_user_collects(id);
    if (res.code == 200) {
      setmyCollectsimageList(res.data);
    }
  };
```

不过需要提的一点就是, 如果当前中心页面正好是当前用户的中心页面, 那么就需要在中心页面显示`编辑个人信息`的按钮, 而其他用户的中心页面不显示. 

我这里是通过条件渲染dom 来做的.

- 如果从动态路由获取的id == 本地存储的user_id, 那么就说明当前中心页正好是当前用户的中心页,那么就进行展示
- 反之亦然.

```jsx
export default function Self() {
  // 获取路由参数
  const { id } = useParams();
  const curId = JSON.parse(localStorage.getItem("userInfo")).user_id;
  const navigate = useNavigate();
  ....
  return(
  	     <div className={SelfStyle.edit}>
          {id == curId && (
            <Button
              icon={<IconEdit />}
              type="tertiary"
              theme="light"
              style={{ marginRight: 10, color: "white" }}
              onClick={showModal}
            >
              编辑
            </Button>
          )}
        </div>
  )
}
```































如果判断用户是否已经关注了其他用户, 就举个例子而言, 用户点击去了一个作品的详细页面, 在详细页面的右上方显示的是作者的头像以及一个关注按钮, 但是是展示 关注按钮 还是显示已关注 按钮, 这取决于当前用户是否关注了该作者, 我想的是编写一个接口, 用来返回一个bool值, 标识当前用户是否关注了该作者, 然后进入到详细页面之后, 加载完毕直接请求这个接口, 根据这个接口返回的值, 进行逻辑显示dom结构







针对图片详细页面做了以下根据不同状态值, 展示不同DOM结构

1. 当前图片归属于当前用户, 图片下方展示`删除按钮`, 右上方头像下方展示`进入个人主页按钮`
2. 当前图片不属于当前用户所创建, 图片下方`不展示删除按钮`, 右上方头像下方展示`关注or已关注`

```jsx
  {picIScreateByCurrentUser ? (
            <Button type="primary" onClick={() => navigate("/user")}>
              查看个人主页
            </Button>
          ) : isfollowActived ? (
            <Button type="primary" onClick={handleUnFollow}>
              已关注
            </Button>
          ) : (
            <Button type="primary" onClick={handleFollow}>
              关注
            </Button>
          )}
```

- picIScreateByCurrentUser : 当前图片是否属于当前用户的标识
- isfollowActived: 当前用户是否关注了该图片的作者.







# react-masonry-css瀑布流库基本使用



## 瀑布流介绍
瀑布流，又称瀑布流式布局。是比较流行的一种网站页面布局，视觉表现为参差不齐的多栏布局，随着页面[滚动条](https://baike.baidu.com/item/%E6%BB%9A%E5%8A%A8%E6%9D%A1/7166861?fromModule=lemma_inlink)向下滚动，这种布局还会不断加载[数据块](https://baike.baidu.com/item/%E6%95%B0%E6%8D%AE%E5%9D%97/107672?fromModule=lemma_inlink)并附加至当前尾部。逐渐在国内流行开来。国内大多数清新站基本为这类风格。

一般使用的网站类型有:
-   **图片画廊**：展示不同尺寸的图片，自动调整布局。
-   **博客文章**：以瀑布流形式展示博客文章摘要，提高阅读体验。
-   **电商产品列表**：展示不同类别和尺寸的产品，增强用户浏览体验。
-   **社交媒体内容**：展示用户生成的内容，如帖子、评论等，形成动态的瀑布流布局。

> 比如: 小红书首页作品的展示, 壁纸软件的壁纸展示等等..


## 介绍

`react-masonry-css` 是一个用于创建快速、响应式瀑布流布局的 React 组件，充分利用 CSS 和 React 的虚拟 DOM 渲染。

与现有的解决方案（如 DeSandro Masonry）相比，`react-masonry-css` 无需依赖 jQuery 或其他库，避免了多次渲染导致的性能问题。它使用简单的接口和少量的 CSS，通过指定断点来排列元素。

该组件支持 IE 10 及以上版本，无任何外部依赖，且与现有的 CSS 动画兼容。尽管不支持不同宽度元素的布局和基于高度的排序，但其性能和浏览器兼容性使其成为创建流畅、可靠布局的理想选择。

## 基本使用

### 安装

```shell
 npm install react-masonry-css
 pnpm install react-masonry-css
 yarn add react-masonry-css
```

### 基本使用

导入

```jsx
 import Masonry from "react-masonry-css";
```

定义一个图片列表数组,其中里面每一项都是一个包含id和图片url 的对象

```jsx
  const images = [
     {
       id: 1,
       url: "https://images.unsplash.com/photo-1532009324734-20a7a5813719?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
     },
     {
       id: 2,
       url: "https://th.bing.com/th/id/OIP.Kumuo3P82ekHloWvUs8JGQHaEK?w=272&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7",
     },
....
   ];
   
```

定义断点配置项

```jsx
 
   const breakpointColumnsObj = {
     default: 4,
     1100: 3,
     700: 2,
     500: 1,
   };
 
```

**说明**

-   **default: 4**:

    -   默认情况下（即屏幕宽度大于所有定义的断点时），将内容分为 4 列。

-   **1100: 3**:

    -   当屏幕宽度小于或等于 1100 像素时，将内容分为 3 列。

-   **700: 2**:

    -   当屏幕宽度小于或等于 700 像素时，将内容分为 2 列。

-   **500: 1**:

    -   当屏幕宽度小于或等于 500 像素时，将内容分为 1 列。

定义Masonry组件

```jsx
  <Masonry
       breakpointCols={breakpointColumnsObj}
       className={WaterfallStyle.myMasonryGrid}
       columnClassName={WaterfallStyle.myMasonryGridColumn}
     >
       {images.map((item, index) => {
         console.log(item.id);
         return (
           <img
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
```

最后需要添加上样式代码(官方文档也有说明)

创建一个index.module.css文件, 然后在该文件引入

```css
 .myMasonryGrid {
   margin-top: 2rem;
   display: -webkit-box;
   /* Not needed if autoprefixing */
   display: -ms-flexbox;
   /* Not needed if autoprefixing */
   display: flex;
   /* gutter size offset */
   width: auto;
 }
 
 .myMasonryGridColumn {
   padding-left: 1rem;
   /* gutter size */
   background-clip: padding-box;
 }
 
 /* Style your items */
 .myMasonryGridColumn>img {
   /* change div to reference your elements you put in <Masonry> */
   margin-bottom: 1rem;
 }
```
### 效果
最后页面应该是:

![QQ2024525-214554.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31670d96c28e4dfcb1edd57ac5228787~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=772&h=348&s=2219573&e=gif&f=81&b=19181d)

看起来还很不错, 只需要配置一点点代码, 便可以实现, 非常适合小项目的快速开发.

在我这个项目中, 这个组件的`image`, 获取来源于父组件的传递

```jsx
  // 定义存储壁纸的state
  const [images, setImages] = useState([]);

  // 渲染完毕之后 请求接口拿数据
  const getHot20Data = async () => {
    const res = await getHot20();
    setImages(res);
  };
  useEffect(() => {
    getHot20Data();
  }, []);

 <Waterfall images={images}></Waterfall>
```









# 后端

flask

## qrcode[pil]
