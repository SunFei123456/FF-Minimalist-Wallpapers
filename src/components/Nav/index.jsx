// 编写网站的nav区域
import NavStyle from "./index.module.css";

import { IconMoon, IconSun, IconSearch, IconUser } from "@douyinfe/semi-icons";
import { Input } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { Avatar, Dropdown } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import { searchbykeyword } from "@/apis/wallpaper";
import LoginAndRegisterPane from "@/components/LoginAndRegisterPane/index";
import eventBus from "@/eventBus";
import { Button } from "@douyinfe/semi-ui";
import { useUserStore } from "@/store";
import { Toast } from "@douyinfe/semi-ui";
export default function Nav({ onLanguageChange }) {
  const [isDark, setIsDark] = useState(true);
  // 搜索关键字
  const [keyword, setKeyword] = useState("");
  const navigator = useNavigate();

  const [visible, setVisible] = useState(false);

  const { userInfo } = useUserStore();

  const avatar = {
    default: "https://www.douyin.com/aweme/v1/avatar/1170000000000000000/",
    cur: userInfo.image,
  };


  // 加载页面时检查 localStorage 中的主题模式
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme-mode');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.body.setAttribute('theme-mode', 'dark');
    } else {
      setIsDark(false);
      document.body.removeAttribute('theme-mode');
    }
  }, []);

  // 切换主题模式，并将选择存储到 localStorage 中
  const changeTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    const body = document.body;
    if (newTheme) {
      body.setAttribute('theme-mode', 'dark');
      localStorage.setItem('theme-mode', 'dark');
    } else {
      body.removeAttribute('theme-mode');
      localStorage.setItem('theme-mode', 'light');
    }
  };


  // 点击菜单路由跳转
  const menuClick = (key) => {
    if (key == "/user/9") {
      // 强制刷新
      navigator(key, { replace: true, state: { forceRefresh: true } });
      window.location.reload();
    } else {
      console.log(key);
      navigator(key);
    }
  };

  const search = async () => {
    const res = await searchbykeyword(keyword);
    console.log(res);
    eventBus.emit("updateData", res);
  };

  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  // 退出登录
  const logout = () => {
    // 清空store中的用户信息
    useUserStore.setState({
      userInfo: {},
    });
    // 清空localStorage中的用户信息
    localStorage.removeItem("userInfo");
    Toast("退出成功");
  };
  // console.log(userInfo.image); // 应该输出 null
  // console.log(avatar.default); // 应该输出默认头像路径
  // console.log(avatar.cur); // 应该输出当前头像路径
  useEffect(() => {
    // console.log(userInfo);
  }, [userInfo]);
  return (
    <>
      <div className={NavStyle.nav}>
        {/*  左边部分 */}
        <div className={NavStyle.left}>
          <div className={NavStyle.logo}></div>
          <div className={NavStyle.menuItem}>
            <div className={NavStyle.item} onClick={() => menuClick("/")}>
              首页
            </div>
            <div
              className={NavStyle.item}
              onClick={() => menuClick("/wallpaper")}
            >
              壁纸
            </div>
            <div className={NavStyle.item}>标签</div>
            <div className={NavStyle.item}>归档</div>
            <div className={NavStyle.item}>关于</div>
          </div>
        </div>

        {/* 右边部分 */}
        <div className={NavStyle.right}>

          {/* 暗黑亮白模式切换 */}
          <div className={NavStyle.mode}>
            {/* 修改icon size */}
            {isDark ? (
              <IconMoon size="extra-large" onClick={changeTheme} />
            ) : (
              <IconSun size="extra-large" onClick={changeTheme} />
            )}
          </div>

          {/* 用户头像 */}
          {userInfo && userInfo.email ? (
            <Dropdown
              trigger={"click"}
              position={"bottomLeft"}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => menuClick(`/user/${userInfo.user_id}`)}
                  >
                    个人主页
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => menuClick("/upload")}>
                    上传图片
                  </Dropdown.Item>
                  <Dropdown.Item>设置</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>退出</Dropdown.Item>
                </Dropdown.Menu>
              }
            >
              <Avatar
                alt="cute cat"
                size="small"
                src={userInfo.image === null ? avatar.default : avatar.cur}
                color="red"
                style={{ margin: 4 }}
              >
                User
              </Avatar>
            </Dropdown>
          ) : (
            <Button
              type="danger"
              icon={<IconUser />}
              theme="solid"
              onClick={showModal}
            >
              登录
            </Button>
          )}
        </div>
      </div>
      <LoginAndRegisterPane
        visible={visible}
        hideModal={hideModal}
      ></LoginAndRegisterPane>
    </>
  );
}
