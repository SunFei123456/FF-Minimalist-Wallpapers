import React, { useState } from "react";
import { Card, Avatar, Typography, Skeleton } from "@douyinfe/semi-ui";
import { useNavigate } from "react-router-dom";

import styles from "./index.module.css";
import { getUserId } from "@/utils";
import { get_user_info } from "@/apis/user";
import { useEffect } from "react";

const Sidebar = () => {
  const { Text } = Typography;
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleClick = (uid) => {
    navigate(`/user/${uid}`);
  };

  const getUserInfo = async () => {
    const res = await get_user_info(getUserId());
    if ((res.code = 200)) {
      setUserInfo(res.data);
      setLoading(false)
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <>
      <Card className={styles.card}>
        {/* top --> avatar + nickname + bio */}
        <div className={styles.top}>
          <Skeleton
            placeholder={<Skeleton.Avatar></Skeleton.Avatar>}
            loading={loading}
            active
          >
            <Avatar
              style={{ margin: 4 }}
              alt="User"
              src={userInfo.user_avatar}
              onClick={() => handleClick(getUserId())}
            ></Avatar>
          </Skeleton>
          <div className={styles.uinfo}>
            <Skeleton
              placeholder={<Skeleton.Paragraph rows={1} />}
              style={{ width: "80px", marginBottom: "0.3rem" }}
              loading={loading}
              active
            >
              <Text strong>{userInfo.user_nickname}</Text>
            </Skeleton>

            <Skeleton
              placeholder={<Skeleton.Paragraph rows={1} />}
              style={{ width: "50px" }}
              loading={loading}
              active
            >
              <Text type="tertiary" size="small">
                {userInfo.description}
              </Text>
            </Skeleton>
          </div>
        </div>

        {/* bottom user stats */}
        <div className={styles.bottom}>
          <div className={styles.stat}>
            <Skeleton
              placeholder={<Skeleton.Paragraph rows={1} />}
              style={{ width: "25px", height: "19px" }}
              loading={loading}
              active
            >
              <Text strong>{userInfo.follow_count || 0}</Text>
            </Skeleton>
            <Text type="tertiary" size="small">
              关注
            </Text>
          </div>
          <div className={styles.stat}>
            <Skeleton
              placeholder={<Skeleton.Paragraph rows={1} />}
              style={{ width: "25px", height: "19px" }}
              loading={loading}
              active
            >
              <Text strong>{userInfo.followers_count || 0}</Text>
            </Skeleton>
            <Text type="tertiary" size="small">
              粉丝
            </Text>
          </div>
          <div className={styles.stat}>
            <Skeleton
              placeholder={<Skeleton.Paragraph rows={1} />}
              style={{ width: "25px", height: "19px" }}
              loading={loading}
              active
            >
              <Text strong>{userInfo.posts || 0}</Text>
            </Skeleton>
            <Text type="tertiary" size="small">
              帖子
            </Text>
          </div>
          <div className={styles.stat}>
            <Skeleton
              placeholder={<Skeleton.Paragraph rows={1} />}
              style={{ width: "25px", height: "19px" }}
              loading={loading}
              active
            >
              <Text strong>{userInfo.wallpapers || 0}</Text>
            </Skeleton>
            <Text type="tertiary" size="small">
              壁纸
            </Text>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Sidebar;
