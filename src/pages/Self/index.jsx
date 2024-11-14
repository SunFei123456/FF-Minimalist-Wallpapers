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
  Spin,
} from "@douyinfe/semi-ui";

import {
  IconEdit,
  IconPlus,
  IconImage,
  IconHome,
  IconCamera,
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
  get_user_info,
  modify_background,
  bind_avatar,
} from "@/apis/user";

import { useUserStore } from "@/store";
import { useNavigate } from "react-router-dom";
import { Toast } from "@douyinfe/semi-ui";
import Loading from "@/components/Loading";
import * as qiniu from "qiniu-js";
import { getUserAvatar, uploadFile } from "@/utils";
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

  // 定义三个标识符, 上传, 喜欢, 收藏, 用于点击切换不同的组件
  const [activeKey, setActiveKey] = useState("上传");
  // 定义一个状态,用来动态添加css
  const [activeStyle, setActiveStyle] = useState("1");

  const [loading, setLoading] = useState(true);

  const [tabLoading, setTabLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };
  // 获取指定id用户的信息
  const getInFobyID = () => {
    setLoading(true);
    try {
      get_user_info(id).then((res) => {
        setuserInfoData(res?.data);
        setLoading(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  // 获取我上传的壁纸看列表
  const getmyUploadsimageList = async () => {
    setTabLoading(true);
    get_user_images(id)
      .then((res) => {
        if (res.code == 200) {
          setmyUploadsimageList(res.data);
          setTabLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // 获取我喜欢的图片列表
  const getmyLikesimageList = async () => {
    setTabLoading(true);
    const res = await get_user_likes(id);
    if (res.code == 200) {
      setmyLikesimageList(res.data);
      setTabLoading(false);
    }
  };

  // 获取我收藏的图片列表
  const getmyCollectsimageList = async () => {
    setTabLoading(true);
    const res = await get_user_collects(id);
    if (res.code == 200) {
      setmyCollectsimageList(res.data);
      setTabLoading(false);
    }
  };

  // 跳转图片详细页面 接收一个key id
  const goTodetail = (key) => {
    // 跳转图片详细页面 , 并且将key 进行传递
    navigate(`/detail/${key}`);
  };

  // 切换不同模板 以及 高亮点击的按钮
  const settingSome = (modelName, activeStyle) => {
    if (modelName == "上传") {
      getmyUploadsimageList();
    } else if (modelName == "喜欢") {
      getmyLikesimageList();
    } else if (modelName == "收藏") {
      getmyCollectsimageList();
    }

    setActiveKey(modelName);
    setActiveStyle(activeStyle);
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
    getmyUploadsimageList();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // 背景图片上传更换
  const handleUpload = async (file) => {
    await uploadFile(file, (res, err) => {
      if (err) {
        Toast.error(err);
      } else {
        Toast.success(res.message);
        changeImageOfPersonalCenter(res.file_path);
      }
    });
  };
  // 个人头像上传更换
  const handleUploadAvatar = async (file) => {
    await uploadFile(file, (res, err) => {
      if (err) {
        Toast.error(err);
      } else {
        bind_avatar(curId, res.file_path).then((res) => {
          if (res.code == 200) {
            Toast.success(res.message);
            setuserInfoData({ ...userInfo, image: res.image_url });
            // 更新 Zustand store 和本地存储
            setUserInfo({ ...userInfo, image: res.image_url });
          }
        });
      }
    });
  };

  const style = {
    backgroundColor: "var(--semi-color-overlay-bg)",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--semi-color-white)",
  };

  const hoverMask = (
    <div style={style}>
      <IconCamera />
    </div>
  );
  let imageOnly = "image/*";
  return (
    <div className={SelfStyle.self}>
      {/* 上半部分  用户信息*/}
      <div
        className={SelfStyle.top}
        style={{
          backgroundImage: `url(${
            userInfo.person_home_background_image ||
            "http://cdn.sunfei.site/default_banner.jpg?e=1731476905&token=bpQYWtWruTnQAFlTKde4wbgCZ7H9FjqQignA-Myl:DJ3UTth3siE0F6vfZPU163l35T8="
          })`,
        }}
      >
        <div className={SelfStyle.userInfo}>
          {/* 用户头像 */}
          {/* S头像上传组件 */}
          {id == curId ? (
            <Upload
              action={""}
              className="avatar-upload"
              name="avatar"
              customRequest={({ file }) => {
                handleUploadAvatar(file);
              }}
              accept={imageOnly}
              showUploadList={false}
              onError={() => Toast.error("上传失败")}
            >
              <Avatar
                src={getUserAvatar()}
                size="extra-large"
                shape="circle"
                type="light"
                hoverMask={hoverMask}
              />
            </Upload>
          ) : (
            <Avatar
              src={ userInfo.user_avatar}
              size="extra-large"
              shape="circle"
              type="light"
            />
          )}

          {/* 个人nickname */}
          <Title heading={4} style={{ margin: "8px 0", color: "#fff" }}>
            {userInfo.user_nickname || `user${id}`}
          </Title>

          {/* 用户信息 */}
          <div className={SelfStyle.userInfoDetail}>
            {" "}
            {/* 账号流量信息 */}
            <div style={{ display: "flex", gap: "10px", color: "#fff" }}>
              <div style={{ margin: "3px 6px" }}>
                关注 <span>{userInfo.follow_count}</span>
              </div>
              <div style={{ margin: "3px 6px" }}>
                粉丝 <span>{userInfo.followers_count}</span>
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
          喜欢 {userInfo ? userInfo.user_like_count : 0}
        </span>
        <span
          onClick={() => {
            settingSome("收藏", "3");
          }}
          className={activeStyle === "3" ? SelfStyle.active : ""}
        >
          收藏 {userInfo ? userInfo.user_collect_count : 0}
        </span>
        <span>浏览历史</span>
      </div>

      {/* 下半部分  用户作品 */}
      <div className={SelfStyle.content}>
        {tabLoading ? (
          <Spin size="large" style={{ width: "100%", margin: "0 auto" }} />
        ) : (
          <>
            {/* 我的上传模块 */}
            {activeKey == "上传" &&
              Array.isArray(myUploadsimageList) &&
              myUploadsimageList.map((item) => (
                <Card
                  shadows="hover"
                  title={item.image_description}
                  headerStyle={{
                    padding: "5px 10px",
                    fontSize: "10px !important",
                  }}
                  bodyStyle={{ padding: "5px 10px" }}
                  key={item.image_id}
                  className={SelfStyle.imagecard}
                  onClick={() => goTodetail(item.image_id)}
                >
                  <img src={item.image_url} alt="" />
                  <Space style={{ marginTop: "5px" }}>
                    <IconCalendar className={SelfStyle.iconCalendar} />{" "}
                    <p className={SelfStyle.imageUploadTime}>
                      {item.image_upload_time}
                    </p>
                  </Space>
                </Card>
              ))}

            {/* 我的喜欢模块 */}
            {activeKey == "喜欢" &&
              myLikesimageList.map((item) => (
                <Card
                  shadows="hover"
                  title={item.image_description}
                  headerStyle={{
                    padding: "5px 10px",
                    fontSize: "10px !important",
                  }}
                  bodyStyle={{ padding: "5px 10px" }}
                  key={item.image_id}
                  className={SelfStyle.imagecard}
                  onClick={() => goTodetail(item.image_id)}
                >
                  <img src={item.image_url} alt="" />
                  <Space style={{ marginTop: "5px" }}>
                    <IconCalendar className={SelfStyle.iconCalendar} />{" "}
                    <p className={SelfStyle.imageUploadTime}>
                      {item.image_upload_time}
                    </p>
                  </Space>
                </Card>
              ))}

            {/* 我的收藏模块 */}
            {activeKey == "收藏" &&
              myCollectsimageList.map((item) => (
                <Card
                  shadows="hover"
                  title={item.image_description}
                  headerStyle={{
                    padding: "5px 10px",
                    fontSize: "10px !important",
                  }}
                  bodyStyle={{ padding: "5px 10px" }}
                  key={item.image_id}
                  className={SelfStyle.imagecard}
                  onClick={() => goTodetail(item.image_id)}
                >
                  <img src={item.image_url} alt="" />
                  <Space style={{ marginTop: "5px" }}>
                    <IconCalendar className={SelfStyle.iconCalendar} />{" "}
                    <p className={SelfStyle.imageUploadTime}>
                      {item.image_upload_time}
                    </p>
                  </Space>
                </Card>
              ))}
          </>
        )}
      </div>

      <UpdateUserInfoForm
        visible={isModalVisible}
        onOk={hideModal}
        onCancel={hideModal}
        afterClose={() => console.log("After Close callback executed")}
      />
      {/* 壁纸更换-> 只有当前用户才显示,访问者不显示 */}
      {id == curId && (
        <Upload
          action={""}
          customRequest={({ file }) => {
            handleUpload(file);
          }}
          fileName="file"
          accept={imageOnly}
          maxSize={10240}
          minSize={50}
          style={{ marginBottom: 12 }}
          className={SelfStyle.uploadBgImageBox}
          onSizeError={(file, fileList) =>
            Toast.error(`${file.name} 文件尺寸不符合要求`)
          }
        >
          <IconPlus size="small" className={SelfStyle.uploadBgImage} />
        </Upload>
      )}
    </div>
  );
}
