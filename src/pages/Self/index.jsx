import SelfStyle from "./index.module.css";
import {
  Avatar,
  Typography,
  Space,
  Tag,
  Button,
  Upload,
  Row,
  Col,
  Card,
  Image,
} from "@douyinfe/semi-ui";

import {
  IconEdit,
  IconPlus,
  IconImage,
  IconHome,
  IconMale,
  IconIdCard,
  IconCalendar,
} from "@douyinfe/semi-icons";

import { UpdateUserInfoForm } from "@/components/UpdateUserInfoForm";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  get_user_images,
  get_user_likes,
  get_user_collects,
  getFollowCount,
  get_user_info,
  modify_background,
} from "@/apis/user";

import { useUserStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { Toast } from "@douyinfe/semi-ui";

export default function Self() {
  // 获取路由参数
  const { id } = useParams();
  const curId = JSON.parse(localStorage.getItem("userInfo")).user_id;
  const navigate = useNavigate();
  const { Title } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  // 根据用户id拿到用户信息
  const [userInfo, setuserInfoData] = useState({});
  const { setUserInfo } = useUserStore();

  // 我的上传的图片
  const [myUploadsimageList, setmyUploadsimageList] = useState([]);
  // 我喜欢过的图片
  const [myLikesimageList, setmyLikesimageList] = useState([]);
  // 我收藏过的图片
  const [myCollectsimageList, setmyCollectsimageList] = useState([]);
  // 获取当前用户的粉丝和关注数量
  const [followCount, setFollowCount] = useState({});

  // 定义三个标识符, 上传, 喜欢, 收藏, 用于点击切换不同的组件
  const [activeKey, setActiveKey] = useState("上传");
  // 定义一个状态,用来动态添加css
  const [activeStyle, setActiveStyle] = useState("1");

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };
  // 获取指定id用户的信息
  const getInFobyID = () => {
    console.log(1);
    get_user_info(id).then((res) => {
      // 考虑新用户没有背景图片的情况
      if (res.person_home_background_image == null) {
        res.person_home_background_image = "/src/assets/images/2.jpg";
      } else {
        // 替换反斜杠为正斜杠
        res.person_home_background_image =
          res.person_home_background_image.replace(/\\/g, "/");
      }

      setuserInfoData(res);
    });
  };
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

  // 跳转图片详细页面 接收一个key id
  const goTodetail = (key) => {
    // console.log(key);
    // 跳转图片详细页面 , 并且将key 进行传递
    navigate(`/detail/${key}`);
  };

  // 切换不同模板 以及 高亮点击的按钮
  const settingSome = (modelName, activeStyle) => {
    setActiveKey(modelName);
    setActiveStyle(activeStyle);
  };
  // 获取当前用户的粉丝和关注数量
  const get_user_follow_count = () => {
    getFollowCount(id).then((res) => {
      setFollowCount(res);
    });
  };

  // 修改个人中心页资料模块的后方背景
  const changeImageOfPersonalCenter = (bgurl) => {
    modify_background(curId, bgurl).then((res) => {
      if (res.code == 200) {
        Toast.success(res.message);

        setuserInfoData({ ...userInfo, person_home_background_image: bgurl });
        // 更新 Zustand store 和本地存储
        setUserInfo({ ...userInfo, person_home_background_image: bgurl });
      }
    });
  };
  useEffect(() => {
    getInFobyID();
  }, []);

  // 上传图片
  // 上传成功之后的回调
  const uploadSuccess = (res) => {
    changeImageOfPersonalCenter(res.file_path);
  };
  useEffect(() => {
    getInFobyID();
    getmyUploadsimageList();
    getmyLikesimageList();
    getmyCollectsimageList();
    get_user_follow_count();
  }, []);
  let action = "http://127.0.0.1:5000/wallpaper/upload";
  let imageOnly = "image/*";
  return (
    <div className={SelfStyle.self}>
      {/* 上半部分  用户信息*/}
      <div
        className={SelfStyle.top}
        style={{
          backgroundImage: `url(${userInfo.person_home_background_image})`,
        }}
      >
        <div className={SelfStyle.userInfo}>
          {/* 用户头像 */}
          <Avatar
            size="extra-large"
            style={{ margin: 4 }}
            alt="User"
            src={userInfo.user_avatar}
          ></Avatar>
          {/* 个人nickname */}
          <Title heading={4} style={{ margin: "8px 0", color: "#fff" }}>
            {userInfo.user_nickname || "暂无昵称"}
          </Title>

          {/* 用户信息 */}
          <div className={SelfStyle.userInfoDetail}>
            {" "}
            {/* 账号流量信息 */}
            <div style={{ display: "flex", gap: "10px", color: "#fff" }}>
              <div style={{ margin: "3px 6px" }}>
                关注 <span>{followCount.following_count}</span>
              </div>
              <div style={{ margin: "3px 6px" }}>
                粉丝 <span>{followCount.followers_count}</span>
              </div>
              <div style={{ margin: "3px 0" }}>
                获喜 <span>{userInfo.user_like_count}</span>
              </div>
            </div>
            {/* 基本个人信息 */}
            <div style={{ display: "flex", gap: "10px", color: "#fff" }}>
              {/* 账号 */}
              <div style={{ margin: "3px 6px" }}>
                <Tag
                  color="white"
                  prefixIcon={<IconIdCard />}
                  size="large"
                  shape="circle"
                  type="light"
                >
                  {userInfo.user_email}
                </Tag>
              </div>
              {/* 年龄 */}
              <div style={{ margin: "3px 6px" }}>
                <Tag
                  color="white"
                  prefixIcon={<IconMale />}
                  size="large"
                  shape="circle"
                  type="light"
                >
                  {"21岁"}
                </Tag>
              </div>
              {/* 地址 */}
              <div style={{ margin: "3px 0" }}>
                <Tag
                  color="white"
                  prefixIcon={<IconHome />}
                  size="large"
                  shape="circle"
                  type="light"
                >
                  {userInfo.user_country +
                    `/` +
                    userInfo.user_province +
                    `/` +
                    userInfo.user_city}
                </Tag>
              </div>
            </div>
            {/* 个人介绍 */}
            <div style={{ fontSize: 13, color: "#fff" }}>
              {userInfo.user_description || "暂无介绍"}
            </div>
          </div>
        </div>

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
      </div>

      {/* 中间部分  切换不同标签的页的按钮组 */}
      <div className={SelfStyle.operate}>
        <span
          onClick={() => {
            settingSome("上传", "1");
          }}
          className={activeStyle === "1" ? SelfStyle.active : ""}
        >
          上传 {myUploadsimageList ? myUploadsimageList.length : 0}
        </span>
        <span
          onClick={() => {
            settingSome("喜欢", "2");
          }}
          className={activeStyle === "2" ? SelfStyle.active : ""}
        >
          喜欢 {myLikesimageList ? myLikesimageList.length : 0}
        </span>
        <span
          onClick={() => {
            settingSome("收藏", "3");
          }}
          className={activeStyle === "3" ? SelfStyle.active : ""}
        >
          收藏 {myCollectsimageList ? myCollectsimageList.length : 0}
        </span>
        <span>浏览历史</span>
      </div>

      {/* 下半部分  用户作品 */}
      <div className={SelfStyle.content}>
        {/* 我的上传模块 */}
        {activeKey == "上传" &&
          Array.isArray(myUploadsimageList) &&
          myUploadsimageList.map((item) => (
            <div
              key={item.image_id}
              className={SelfStyle.imagecard}
              onClick={() => goTodetail(item.image_id)}
            >
              <img src={item.image_url} alt="" />
              <p>{item.image_description}</p>
              <Space>
                <IconCalendar /> <p>{item.image_upload_time}</p>
              </Space>
            </div>
          ))}

        {/* 我的喜欢模块 */}
        {activeKey == "喜欢" &&
          myLikesimageList.map((item) => (
            <div key={item.image_id} className={SelfStyle.imagecard}>
              <img src={item.image_url} alt="" />
              <p>{item.image_description}</p>
              <Space>
                <IconCalendar /> <p>{item.image_upload_time}</p>
              </Space>
            </div>
          ))}

        {/* 我的收藏模块 */}
        {activeKey == "收藏" &&
          myCollectsimageList.map((item) => (
            <div key={item.image_id} className={SelfStyle.imagecard}>
              <img src={item.image_url} alt="" />
              <p>{item.image_description}</p>
              <Space>
                <IconCalendar /> <p>{item.image_upload_time}</p>
              </Space>
            </div>
          ))}
      </div>

      <UpdateUserInfoForm
        visible={isModalVisible}
        onOk={hideModal}
        onCancel={hideModal}
        afterClose={() => console.log("After Close callback executed")}
      />
      {/* 壁纸更换 */}
      <Upload
        action={action}
        fileName="file"
        accept={imageOnly}
        maxSize={10240}
        minSize={50}
        style={{ marginBottom: 12 }}
        className={SelfStyle.uploadBgImageBox}
        onSizeError={(file, fileList) =>
          Toast.error(`${file.name} 文件尺寸不符合要求`)
        }
        // 上传成功
        onSuccess={uploadSuccess}
      >
        <IconPlus size="small" className={SelfStyle.uploadBgImage} />
      </Upload>
    </div>
  );
}
