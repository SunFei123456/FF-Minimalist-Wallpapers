import { useEffect, useState } from "react";
import DetailStyle from "./index.module.css";
import {
  Image,
  Card,
  Space,
  Tag,
  Button,
  Modal,
} from "@douyinfe/semi-ui";

import {
  IconLikeHeart,
  IconStar,
  IconFilledArrowDown,
} from "@douyinfe/semi-icons";
// 导入useParams
import { useParams, useNavigate } from "react-router-dom";
import { deletePic, getDetail, user_image_relation } from "@/apis/wallpaper";
import {
  followUser,
  get_user_info,
  is_following,
  unfollowUser,
  toggleLikeImage,
  toggleCollectImage,
  downloadImage,
} from "@/apis/user";

import { useUserStore } from "@/store";
import { Toast } from "@douyinfe/semi-ui";
import { generate_qrcode } from "@/apis/qrcode";
import { downloadFile } from "@/utils";
import Loading from "@/components/Loading";

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

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isCollected, setIsCollected] = useState(false);
  const [collectCount, setCollectCount] = useState(0);

  const [downloadCount, setDownloadCount] = useState(0);

  const [loading,setLoading] = useState(true)

  // 接收路由参数的id
  const { id } = useParams();
  // 根据图片的id返回具体的图片
  const getDataByid = async () => {
    setLoading(true); // 开始加载数据
    try {
        const res = await getDetail(id); // 使用 await 获取数据
        setPicDetail(res);
        setLikeCount(res.like_count);
        setCollectCount(res.favorite_count);
        setDownloadCount(res.download_count);

        const userInfoRes = await get_user_info(res.author); // 使用 await 获取用户信息
        setUserCurrentInfo(userInfoRes?.data);

        imageIScreateByCurrentUser(res.author);
        followActived(userInfo.user_id, res.author);
    } catch (error) {
        console.error("Error fetching data:", error); // 处理错误
    } finally {
        setLoading(false); // 数据加载完成，设置 loading 为 false
    }
  };
  // 判断当前图片是否属于当前用户的图片
  const imageIScreateByCurrentUser = (user_id) => {
    if (user_id == userInfo.user_id) {
      setPicIScreateByCurrentUser(true);
    } else {
      setPicIScreateByCurrentUser(false);
    }
  };

  // 喜欢or取消喜欢
  const likePic = () => {
    toggleLikeImage(userInfo.user_id, picDetail.id)
      .then((res) => {
        if (res.code == 200) {
          setIsLiked(!isLiked);
          setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
          Toast.success(res.message);
        }
      })
      .catch((err) => {
        Toast.error(err.message);
      });
  };

  // 收藏壁纸or 取消收藏
  const collectPic = () => {
    toggleCollectImage(userInfo.user_id, picDetail.id)
      .then((res) => {
        if (res.code == 200) {
          setIsCollected(!isCollected);
          setCollectCount(isCollected ? collectCount - 1 : collectCount + 1);
          Toast.success(res.message);
        }
      })
      .catch((err) => {
        Toast.error(err.message);
      });
  };

  // 下载图片
  const download = () => {
    // 先调取接口，记录本次下载行为
    downloadImage(picDetail.id)
      .then((res) => {
        if (res.code === 200) {
          setDownloadCount(downloadCount + 1);
          // 时间戳组成文件名
          const timestamp = new Date().getTime();
          const filename = `${timestamp}.jpg`;
          // 调用下载函数
          downloadFile(res.image_url, { filename: filename });
          Toast.success(res.message);
        } else {
          Toast.error(res.message);
        }
      })
      .catch((error) => {
        // 处理网络错误或其他异常
        console.error("下载失败:", error);
        Toast.error("下载失败，请重试。");
      });
  };

  // 生成分享链接
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // 生成qrcode
  const generateQRcode = () => {
    generate_qrcode(picDetail.id).then((res) => {
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
    Modal.confirm({
      title: "确认删除",
      content: "您确定要删除这张图片吗？",
      onOk: () => {
        deletePic(userInfo.user_id, picDetail.id)
          .then((res) => {
            navigate("/wallpaper");
          })
          .catch((err) => {
            Toast.error(err.message);
          });
      },
    });
  };

  // 关注行为
  const handleFollow = () => {
    followUser(userInfo.user_id, picDetail.author)
      .then((res) => {
        if (res.code == 200) {
          Toast.success(res.message);
          setIsfollowActived(true);
        }
      })
      .catch((err) => {
        console.log(err);
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

  //  获取当前图片和用户之前的关系(like, collect, dislike, collectd , null)
  const fetchRelation = () => {
    user_image_relation(userInfo.user_id, id).then((res) => {
      setIsLiked(res.is_liked);
      setIsCollected(res.is_collected);
    });
  };

  // 跳转用户主页
  const goto_Personal_homepage = (id) => {
    navigate(`/user/${id}`);
  };
  // 根据图片的id返回具体的图片详细信息
  useEffect(() => {
    getDataByid();
  }, [id]);

  useEffect(() => {
    fetchRelation();
  }, [isLiked, isCollected]);

  if (loading) {
    return <Loading />; // 数据未加载时显示 Loading 组件
  }

  return (
    <>
      <div className={DetailStyle.detail}>
        {/* 左边图片 */}
        <div className={DetailStyle.left}>
          {/* 图片 */}
          <div className={DetailStyle.imageContainer}>
            <Image className={DetailStyle.image}   src={picDetail.url}  width={"100%"} alt="" />
          </div>
          {/* 操作栏 */}
          <div className={DetailStyle.operationBar}>
            <Space align="center" spacing={20}>
              <div className={DetailStyle.operationItem} onClick={likePic}>
                <IconLikeHeart
                  size="large"
                  style={{
                    color: isLiked ? "#FF1228" : "gray",
                  }}
                />
                <span>{likeCount || 0}</span>
              </div>

              <div className={DetailStyle.operationItem} onClick={collectPic}>
                <IconStar
                  size="large"
                  style={{ color: isCollected ? "orange" : "gray" }}
                />
                <span>{collectCount || 0}</span>
              </div>

              <div className={DetailStyle.operationItem} onClick={download}>
                <IconFilledArrowDown size="large" />
                <span>{downloadCount || 0}</span>
              </div>
            </Space>
            {/* 生成分享链接 */}
            <div style={{ display: "flex", gap: "10px" }}>
              {picIScreateByCurrentUser == true && (
                <>
                  <Button
                    style={{ backgroundColor: "#FF0018", color: "white" }}
                    onClick={deleteImage}
                  >
                    删除图片
                  </Button>
                  <Button
                    style={{ backgroundColor: "#000", color: "white" }}
                    onClick={generateQRcode}
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
                    style={{ backgroundColor: "#000", color: "white" }}
                    onClick={generateQRcode}
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
              <span>图片名称: {picDetail.name}</span>
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
          {/* 图片流量 */}
          <Card title="图片流量" className={DetailStyle.right}>
            <div className={DetailStyle.ImageDetailContent}>
              <span>下载量: {downloadCount}</span>
              <span>收藏量：{collectCount}</span>
              <span>喜欢量：{likeCount}</span>
            </div>
          </Card>
        </div>
        {/* 用户信息 */}
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
          {/* 关注按钮 */}
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
