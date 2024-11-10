// 编写网站的nav区域
import NavStyle from "./index.module.css";

import { IconMoon, IconSun, IconSearch, IconUser, IconHome, IconImage, IconComment, IconBox, IconHelpCircle } from "@douyinfe/semi-icons";
import { Input } from "@douyinfe/semi-ui";
import { useEffect, useState } from "react";
import { Avatar, Dropdown } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";
import LoginAndRegisterPane from "@/components/LoginAndRegisterPane/index";
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
      navigator(key, { replace: true });
      // 如果key 是个人页面/user开头
      if  (key.startsWith("/user")) {
        window.location.reload();
      }
  };
  


  const showModal = () => {
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  // 退出登录
  const logout = () => {
    menuClick("/");
    // 清空store中的用户信息
    useUserStore.setState({
      userInfo: {},
    });
    // 清空localStorage中的用户信息
    localStorage.removeItem("userInfo");
    // 清除localStorage中的token
    localStorage.removeItem("token");
    Toast.success("退出登录成功");
    // 跳转到首页
  
  };
  return (
    <>
      <div className={NavStyle.nav}>
        {/*  左边部分 */}
        <div className={NavStyle.left}>
          <div className={NavStyle.logo}></div>
          <div className={NavStyle.menuItem}>
            <div className={NavStyle.item} onClick={() => menuClick("/")}>
              <IconHome className={NavStyle.menuIcon} size="large" />
              <span className={NavStyle.menuText}>首页</span>
            </div>
            <div className={NavStyle.item} onClick={() => menuClick("/wallpaper")}>
              <IconImage className={NavStyle.menuIcon} size="large" />
              <span className={NavStyle.menuText}>壁纸</span>
            </div>
            <div className={NavStyle.item} onClick={()=>menuClick('/plaza')}>
              <IconComment className={NavStyle.menuIcon} size="large" />
              <span className={NavStyle.menuText}>广场</span>
            </div>
            <div className={NavStyle.item} onClick={()=>menuClick('/about')}>
              <IconHelpCircle className={NavStyle.menuIcon} size="large" />
              <span className={NavStyle.menuText}>关于</span>
            </div>
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
