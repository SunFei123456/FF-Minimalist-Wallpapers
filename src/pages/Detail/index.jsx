import { useEffect, useState } from "react";
import DetailStyle from "./index.module.css";
import {
  Image,
  Card,
  Space,
  Typography,
  Tag,
  Button,
  Avatar,
  Modal,
} from "@douyinfe/semi-ui";

import {
  IconPlus,
  IconLikeHeart,
  IconStar,
  IconFilledArrowDown,
} from "@douyinfe/semi-icons";
// 导入useParams
import { useSearchParams, useParams, useNavigate } from "react-router-dom";
import { deletePic, getDetail, isCollected, isliked } from "@/apis/wallpaper";
import {
  collectImage,
  followUser,
  get_user_info,
  is_following,
  likeImage,
  unfollowUser,
} from "@/apis/user";

import { useUserStore } from "@/store";
import { Toast } from "@douyinfe/semi-ui";
import { generate_qrcode } from "@/apis/qrcode";

export default function Detail() {
  const { Meta } = Card;
  const navigate = useNavigate();
  const { userInfo } = useUserStore();
  // 存储当前图片的信息
  const [picDetail, setPicDetail] = useState({});
  // 存储当前图片归属者的信息
  const [userCurrentInfo, setUserCurrentInfo] = useState({});
  // 存储一个key 用来判断当前图片是否属于当前用户的图片
  const [picIScreateByCurrentUser, setPicIScreateByCurrentUser] =
    useState(false);
  // 存储一个key, 用来判断当前图片的作者是否已经被关注
  const [isfollowActived, setIsfollowActived] = useState(false);

  // 接收路由参数的id
  const { id } = useParams();
  // 根据图片的id返回具体的图片
  const getDataByid = async () => {
    getDetail(id).then((res) => {
      setPicDetail(res);
      console.log("picDetail:",res);
      get_user_info(res.author).then((res) => {
        console.log("Image_Creator:",res);
        setUserCurrentInfo(res);
      });
      likePicActived(res.author, res.id);
      collectPicActived(res.author, res.id);
      imageIScreateByCurrentUser(res.author);
      followActived(userInfo.user_id, res.author);
    });
  };
  // 判断当前图片是否属于当前用户的图片
  const imageIScreateByCurrentUser = (user_id) => {
    if (user_id == userInfo.user_id) {
      setPicIScreateByCurrentUser(true);
    } else {
      setPicIScreateByCurrentUser(false);
    }
  };

  // 喜欢壁纸
  const likePic = () => {
    likeImage(userInfo.user_id, picDetail.id)
      .then((res) => {
        if (res.code == 200) {
          Toast.success(res.message);
          // 动态添加likePicActived
          document.getElementById("likePic").style.color = "red";
        }
      })
      .catch((err) => {
        Toast.success(err.message);
      });
  };
  // 判断当前用户是否已经喜欢过该壁纸
  const likePicActived = (user_id, image_id) => {
    isliked(user_id, image_id).then((res) => {
      console.log(res);
      if (res.is_liked) {
        document.getElementById("likePic").style.color = "red";
      }
    });
  };

  // 收藏壁纸
  const collectPic = () => {
    collectImage(userInfo.user_id, picDetail.id)
      .then((res) => {
        if (res.code == 200) {
          Toast.success(res.message);
          // 动态添加likePicActived
          document.getElementById("collectPic").style.color = "yellow";
        }
      })
      .catch((err) => {
        Toast.error(err.message);
      });
  };
  // 判断当前用户是否已经收藏过该壁纸
  const collectPicActived = (user_id, image_id) => {
    isCollected(user_id, image_id).then((res) => {
      if (res.is_collected) {
        document.getElementById("collectPic").style.color = "yellow";
      }
    });
  };

  // 生成分享链接
  // 定义 copy 函数
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Text copied to clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // 生成qrcode
  const generateQRcode = () => {
    generate_qrcode(picDetail.id).then((res) => {
      console.log(res);
      if (res.code == 200) {
        Modal.success({
          width: 400,
          height: 400,
          title: "扫码查看",
          content: (
            <img
              src={res.image_url}
              width={250}
              height={250}
              alt="qrcode"
            ></img>
          ),
        });
      }
    });
  };

  // 删除图片
  const deleteImage = () => {
    deletePic(userInfo.user_id, picDetail.id)
      .then((res) => {
        if (res.code == 200) {
          Toast.success(res.message);
          // 跳转壁纸页面
          navigate("/wallpaper");
        }
      })
      .catch((err) => {
        Toast.error(err.message);
      });
  };

  // 关注行为
  const handleFollow = () => {
    followUser(userInfo.user_id, picDetail.author)
      .then((res) => {
        console.log(
          "当前用户:",
          userInfo.user_id,
          "要关注的用户:",
          picDetail.author
        );
        if (res.code == 200) {
          Toast.success(res.message);
          setIsfollowActived(true);
        }
      })
      .catch((err) => {
        Toast.error(err.message);
      });
  };

  // 取消关注
  const handleUnFollow = () => {
    unfollowUser(userInfo.user_id, picDetail.author).then((res) => {
      if (res.code == 200) {
        Toast.success(res.message);
        setIsfollowActived(false);
      }
    });
  };
  // 判断当前用户是否已经关注了该作者
  const followActived = (user_id, author_id) => {
    is_following(user_id, author_id).then((res) => {
      if (res.is_following) {
        setIsfollowActived(res.is_following);
      }
    });
  };

  const goto_Personal_homepage = (id) => {
    navigate(`/user/${id}`);
  };
  useEffect(() => {
    getDataByid();
  }, []);
  return (
    <>
      <div className={DetailStyle.detail}>
        {/* 左边图片 */}
        <div>
          {/* 图片 */}
          <Card
            className={DetailStyle.left}
            style={{ maxWidth: 700 }}
            cover={<Image width={600} src={picDetail.url} />}
          >
            <Meta title={picDetail.name} />
          </Card>
          {/* 操作栏, 包含喜欢, 收藏, 下载 ,以及下载按钮*/}

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10px",
            }}
          >
            <Space align="center">
              <Tag
                size="large"
                shape="circle"
                onClick={() => {
                  likePic();
                }}
              >
                <IconLikeHeart id="likePic" />
                喜欢
              </Tag>
              <Tag
                size="large"
                shape="circle"
                onClick={() => {
                  collectPic();
                }}
              >
                <IconStar id="collectPic" />
                收藏
              </Tag>
              <Tag size="large" shape="circle">
                <IconFilledArrowDown /> 下载
              </Tag>
            </Space>

            {/* 生成分享链接 */}
            <div style={{ display: "flex", gap: "10px" }}>
              {picIScreateByCurrentUser == true && (
                <>
                  <Button
                    style={{ backgroundColor: "#FF0018", color: "white" }}
                    onClick={() => {
                      deleteImage();
                    }}
                  >
                    删除图片
                  </Button>
                  <Button
                    style={{ backgroundColor: "#3df5", color: "white" }}
                    onClick={() => {
                      generateQRcode();
                    }}
                  >
                    生成QR-Code
                  </Button>
                  <Button
                    style={{ backgroundColor: "#683df5", color: "white" }}
                    onClick={() => {
                      copy(picDetail.url);
                      Toast.success("已复制到剪切板");
                    }}
                  >
                    生成分享链接
                  </Button>
                </>
              )}
              {picIScreateByCurrentUser == false && (
                <>
                  <Button
                    style={{ backgroundColor: "#3df5", color: "white" }}
                    onClick={() => {
                      generateQRcode();
                    }}
                  >
                    生成QR-Code
                  </Button>
                  <Button
                    style={{ backgroundColor: "#683df5", color: "white" }}
                    onClick={() => {
                      copy(picDetail.url);
                      Toast.success("已复制到剪切板");
                    }}
                  >
                    生成分享链接
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* 右边图片详细信息 */}
        <div>
          {/* 图片详细参数 */}
          <Card title="图片详细信息" className={DetailStyle.right}>
            <div className={DetailStyle.ImageDetailContent}>
              <span>图片分辨率：{picDetail.dimensions}</span>
              <span>上传者: {userCurrentInfo.user_nickname}</span>
              <span>上传时间: {picDetail.create_time}</span>
              <span>图片类型: {picDetail.type}</span>
              <span>图片描述: {picDetail.alt}</span>
              <span>
                壁纸大小:
                <Tag size="small" shape="circle" color="amber">
                  {`${picDetail.file_size_mb}mb`}
                </Tag>
              </span>
            </div>
          </Card>
          <br />
          {/* 图片点赞量 和 收藏量 和 喜欢量 */}
          <Card title="图片流量" className={DetailStyle.right}>
            <div className={DetailStyle.ImageDetailContent}>
              <span>下载量: {picDetail.download_count}</span>
              <span>收藏量：{picDetail.favorite_count}</span>
              <span>喜欢量：{picDetail.like_count}</span>
            </div>
          </Card>
        </div>

        <div className={DetailStyle.userInfo}>
          <Space align="center">
            {/* 发布者头像 */}
            <img
              src={userCurrentInfo.user_avatar}
              alt="发布者头像"
              className={DetailStyle.publisher}
              onClick={() => goto_Personal_homepage(picDetail.author)}
            />
            {/* 发布者名字 */}
            <Space align="start" vertical>
              <span className={DetailStyle.publisher_name}>
                {userCurrentInfo.user_nickname}
              </span>
              <span className={DetailStyle.publisher_desc}>
                {userCurrentInfo.user_description}
              </span>
            </Space>
          </Space>

          {/* 关注按钮 + icon  */}
          {picIScreateByCurrentUser ? (
            <Button
              type="primary"
              onClick={() => navigate(`/user/${userInfo.user_id}`)}
            >
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
        </div>
      </div>
    </>
  );
}
