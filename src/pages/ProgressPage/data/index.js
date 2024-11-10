// 导出一个数组对象
const progressDataList = [
    {
        date: "2024/5/15 ~ 2024/5/20",
        tasks: [
            { text: "UI 细节优化 包括hover, active 等等", completed: true },
            { text: "首页面展示完善 包括文字 图片", completed: true },
            { text: "壁纸页面 中间搜索框 功能实现", completed: true },
            { text: "中间搜索框 下方 标签展示 && 功能实现", completed: true },
            { text: "编辑信息弹框 的 右上方❌ 退出, 提交自动退出", completed: true, completionTime: "5/24 15:42" },
            { text: "个人页面的背景图片 的上传 和 更新", completed: true },
            { text: "个人页面下方的上传,喜欢,收藏 里面的图片 实现点击跳转详细页面", completed: true, important: true, completionTime: "5/24 0:24" }
        ]
    },
    {
        date: "2024/5/20 ~ 2024/5/24",
        tasks: [
            { text: "实现关注行为,用户取消关注行为, 是否已经关注, 获取用户的关注和粉丝数量 接口", completed: true },
            { text: "实现生成qrcode二维码 接口", completed: true },
            { text: "实现了根据不同状态值展示不一样的图片详细页面", completed: true }
        ]
    },
    {
        date: "2024/10/25 - 2024/10/31",
        tasks: [
            { text: "修复了个人主页在新用户的情况下的类型错误", completed: true },
            { text: "网站的首页文案图片排版设计", completed: true },
            { text: "项目已有模块的响应式处理", completed: true },
            { text: "前端对后端登录传递过来的token 进行接收, 同时对于接口拦截进行处理. 以及针对用户的token过期进行合理化处理.", completed: true },
            { text: "广场模块完成了`侧边栏用户信息的展示`, 以及`用户发帖`,`帖子展示`等功能", completed: true },
            { text: "完成了用户在未登录的情况`广场页面的UI显示 和 交互处理`,优化用户的使用体验.", completed: true },
        ]
    },
    {
        date: "2024/11/1",
        tasks: [
            { text: "点赞 后`烟花效果`展示", completed: true },
            { text: "`多级评论渲染`,`多级评论回复`", completed: true },
            { text: "删除评论,帖子", completed: true },
            { text: "帖子的`点赞用户展示`(由一小组头像组成),详见: https://semi.design/zh-CN/show/avatar", completed: true },
            { text: "帖子的`评论数展示`,`点赞数展示`", completed: true },
            { text: "发布,点赞,删除,等等操作,会`即时在UI进行一个反馈`,后续刷新页面,拿到的是最新的数据覆盖.", completed: true },
            { text: "`点击帖子的作者的头像`跳转到他的个人主页,`点击评论区的用户头像`跳转到他的个人主页. `点击侧边栏个人头像`跳转到个人主页", completed: true },
            { text: "广场侧边栏用户`个人信息展示渲染`", completed: true },
        ]
    },
    {
        date: "2024/11/2",
        tasks: [
            { text: "用户在发布帖子的时候,可以创建一个话题, 然后在发布的时候就可以选择自己创建的话题了,这时候发布的帖子会默认在该话题下存在.(就类似于给帖子做了分类处理)`", completed: true },
            { text: "用户`自定义创建话题``", completed: true },
            { text: "支持`帖子的搜索功能,快速定位想要选择的帖子", completed: true },
            { text: "发布帖子`可以绑定话题`", completed: true },
            { text: "右侧数据渲染(`热门话题`,`热门作者`)", completed: true },
        ]
    },
    {
        date: "2024/11/4",
        tasks: [
            { text: "首页面重构,壁纸页面重构,导航栏 重构", completed: true },
            { text: "站点logo制作和显示", completed: true },
            { text: "壁纸瀑布流手机端显示调整为 3 行", completed: true },
        ]
    },
    {
        date: "2024/11/10",
        tasks: [
            { text: "壁纸页面 没有完善的方法 进行完善 ==> `模糊搜索`,`热门标签点击处理`,`无结果的UI展示`,`一键清除后的回调`等等", completed: true },
            { text: "修复 退出登录之后 跳转`首页`失效的bug", completed: true },
            { text: "修复 访问他人主页 依旧显示`修改壁纸`的icon", completed: true },
            { text: "替代方案, 从他人页面 返回我的主页, 路径更新 视图不更新, 目前`强制刷新`,作为过渡", completed: true },
            { text: "上传图片跳转 到 `个人主页`", completed: true },
            { text: "项目的 开发环境 和 生产环境 进行`环境变量配置`", completed: true },
        ]
    },
    {
        date: "2024/11/11",
        tasks: [
            { text: "完成了 项目进度模块(数据准备,页面渲染)", completed: true },
            { text: "修复项目上线后的bug", completed: true },
            { text: "优化多次细节体验", completed: true },
            { text: "调整路由模式()", completed: true },
        ]
    }
];


export default progressDataList;