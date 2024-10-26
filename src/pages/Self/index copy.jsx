import SelfStyle from "./index.module.css";
import {
  Avatar,
  Typography,
  Space,
  Tag,
  Button,
  Row,
  Col,
  Card,
  Image,
} from "@douyinfe/semi-ui";

import {
  IconEdit,
  IconPlus,
  IconHome,
  IconMale,
  IconIdCard,
  IconCalendar,
} from "@douyinfe/semi-icons";

import { UpdateUserInfoForm } from "@/components/UpdateUserInfoForm";
import { useState,useEffect } from "react";
import { useUserStore } from "@/store";
import { useParams } from "react-router-dom";
import {
  get_user_images,
  get_user_likes,
  get_user_collects,
  getFollowCount,
} from "@/apis/user";
import { useNavigate } from "react-router-dom";

export default function Self() {
  // 获取路由参数 ==> 用户id
  const { id } = useParams();
  const navigate = useNavigate();
  const { Title } = Typography;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { userInfo } = useUserStore();

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
  // 获取我喜欢的图片列表
  const getmyLikesimageList = async () => {
    const res = await get_user_likes(userInfo.user_id);
    if (res.code == 200) {
      setmyLikesimageList(res.data);
    }
  };

  // 获取我收藏的图片列表
  const getmyCollectsimageList = async () => {
    const res = await get_user_collects(userInfo.user_id);
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
    getFollowCount(userInfo.user_id).then((res) => {
      setFollowCount(res);
    });
  };
  useEffect(() => {
    get_user_images(userInfo.user_id)
      .then((res) => {
        if (res.code == 200) {
          console.log(res);
          setmyUploadsimageList(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    getmyLikesimageList();
    getmyCollectsimageList();
    get_user_follow_count();
  }, []);
  return (
    <div className={SelfStyle.self}>
      {/* 上半部分  用户信息*/}
      <div className={SelfStyle.top}>
        <div className={SelfStyle.userInfo}>
          {/* 用户头像 */}
          <Avatar
            size="extra-large"
            color="red"
            style={{ margin: 4 }}
            alt="User"
            src={userInfo.image}
          ></Avatar>

          {/* 用户信息 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginLeft: "20px",
            }}
          >
            {" "}
            {/* 个人nickname */}
            <Title heading={4} style={{ margin: "8px 0", color: "#fff" }}>
              {userInfo.nickname || "暂无昵称"}
            </Title>
            {/* 账号流量信息 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ margin: "3px 6px" }}>
                关注 <span>{followCount.following_count}</span>
              </div>
              <div style={{ margin: "3px 6px" }}>
                粉丝 <span>{followCount.followers_count}</span>
              </div>
              <div style={{ margin: "3px 0" }}>
                获喜 <span>{userInfo.like_count}</span>
              </div>
            </div>
            {/* 基本个人信息 */}
            <div style={{ display: "flex", gap: "10px" }}>
              {/* 账号 */}
              <div style={{ margin: "3px 6px" }}>
                <Tag
                  color="white"
                  prefixIcon={<IconIdCard />}
                  size="large"
                  shape="circle"
                  type="light"
                >
                  {userInfo.email}
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
                  {userInfo.country +
                    `/` +
                    userInfo.province +
                    `/` +
                    userInfo.city}
                </Tag>
              </div>
            </div>
            {/* 个人介绍 */}
            <div style={{ fontSize: 13, margin: "3px 2px" }}>
              {userInfo.description || "暂无介绍"}
            </div>
          </div>
        </div>

        <div className={SelfStyle.edit}>
          <Button
            icon={<IconEdit />}
            type="tertiary"
            theme="light"
            style={{ marginRight: 10, color: "white" }}
            onClick={showModal}
          >
            编辑
          </Button>
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
          上传 {myUploadsimageList.length}
        </span>
        <span
          onClick={() => {
            settingSome("喜欢", "2");
          }}
          className={activeStyle === "2" ? SelfStyle.active : ""}
        >
          喜欢 {myLikesimageList.length}
        </span>
        <span
          onClick={() => {
            settingSome("收藏", "3");
          }}
          className={activeStyle === "3" ? SelfStyle.active : ""}
        >
          收藏 {myCollectsimageList.length}
        </span>
        <span>浏览历史</span>
      </div>

      {/* 下半部分  用户作品 */}

      <div className={SelfStyle.content}>
        {/* 我的上传模块 */}
        {activeKey == "上传" &&
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
    </div>
  );
}
