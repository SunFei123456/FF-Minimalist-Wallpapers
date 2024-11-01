import React from "react";
import { Card, Avatar, Typography } from "@douyinfe/semi-ui";
import {useNavigate} from 'react-router-dom'

import styles from "./index.module.css";
import { useUserStore} from '@/store/index'
import { getUserId } from "@/utils";

const Sidebar = () => {
  const { Text } = Typography;
  const { userInfo } = useUserStore();
  const navigate = useNavigate();

  const handleClick = (uid) => {
    navigate(`/user/${uid}`)
  } 

  return (
    <>
      <Card className={styles.card}>
        {/* top --> avatar + nickname + bio */}
        <div className={styles.top}>
          <Avatar style={{ margin: 4 }} alt="User" src={userInfo.image} onClick={()=>handleClick(getUserId())}> 
          </Avatar>
          <div className={styles.uinfo}>
            <Text strong>{userInfo.user_name}</Text>
            <Text type="tertiary" size="small">
              {userInfo.description}
            </Text>
          </div>
        </div>

        {/* bottom user stats */}
        <div className={styles.bottom}>
          <div className={styles.stat}>
            <Text strong>{userInfo.follow_count || 0}</Text>
            <Text type="tertiary" size="small">
              关注
            </Text>
          </div>
          <div className={styles.stat}>
            <Text strong>{userInfo.followers_count || 0}</Text>
            <Text type="tertiary" size="small">
              粉丝
            </Text>
          </div>
          <div className={styles.stat}>
            <Text strong>{userInfo.posts_count || 0 }</Text>
            <Text type="tertiary" size="small">
              帖子
            </Text>
          </div>
          <div className={styles.stat}>
            <Text strong>{userInfo.images_count || 0}</Text>
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
