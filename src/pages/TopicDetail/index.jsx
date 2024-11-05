import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  TrendingUp,
  Users,
  Hash,
} from "lucide-react";

import {
  Image,
  Avatar,
  TextArea,
  Button,
  Space,
  Typography,
} from "@douyinfe/semi-ui";
import styles from "./index.module.css";

import commentStyle from "../Plaza/PostList/index.module.css";

import { getTopicDetail } from "@/apis/topic";
import { useParams, useNavigate } from "react-router-dom";
import {
  get,
  create,
  likeOrCancelLike,
  getComments,
  createComment,
  deletePost,
  deleteComment,
  getPostsByTopic,
} from "@/apis/post";
import { getUserAvatar, getUserId } from "@/utils";
import { IconSend } from "@douyinfe/semi-icons";
import Loading from "@/components/Loading";

const { Text } = Typography;
function PostImages({ images }) {

  if (images.length === 0) return null;
  return (
    <div className={`${styles.grid} ${styles[`grid${images.length}`]}`}>
      {images &&
        JSON.parse(images.replace(/'/g, '"').replace(/\n/g, "").trim()).map(
          (url, index) => (
            <Image
              width={180}
              height={100}
              key={index}
              src={url}
              className={styles.postImage}
            />
          )
        )}
    </div>
  );
}

function LikeAvatars({ likes, total }) {
  return (
    <div className={styles.likeContainer}>
      <div className={styles.avatars}>
        {Array.isArray(likes) &&
          likes.map((item, index) => (
            <img
              key={item.user.id}
              src={item.user.image}
              alt={item.user.username}
              className={styles.likeAvatar}
            />
          ))}
      </div>

      <span className={styles.more}>等{total}人觉得很赞</span>
    </div>
  );
}

function TopicTags({ tags }) {
  if (tags.length === 0) return null;

  return (
    <div className={styles.tagContainer}>
      {tags.map((tag, index) => (
        <span key={index} className={styles.tag}>
          <Hash className={styles.tagIcon} />
          {tag.topic_name}
        </span>
      ))}
    </div>
  );
}

function TopicDetail() {
  // 获取路由参数
  const { id } = useParams();
  const [topic, setTopic] = useState({});
  const [posts, setPosts] = useState([]);
  const [newComment, setNewComment] = useState("");
  // 使用对象来存储每个帖子的评论显示状态
  const [commentsVisibility, setCommentsVisibility] = useState({});
  // 使用对象来存储每个帖子的评论列表
  const [postComments, setPostComments] = useState({});

  // 评论的列表
  const [replyContent, setReplyContent] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);

  const [curPostId, setCurPostId] = useState(null);
  const [loading, setLoading] = useState(false);
  // 获取话题详情
  const fecthTopicDetail = () => {
    setLoading(true);
    getTopicDetail(id).then((res) => {
      setTopic(res.data);
      setLoading(false);
    }).finally(() => {
      setLoading(false);
    });
  };

  // 获取话题下的帖子
  const fecthTopicPosts = () => {
    getPostsByTopic(id).then((res) => {
      setPosts(res.data);
    });
  };

  const changeLikeStatus = async (postId) => {
    // 发送请求
    try {
      const res = await likeOrCancelLike(getUserId(), postId);
      if (res.code === 200) {
        // 重新请求
        fecthTopicPosts();
      }
    } catch (err) {
      console.error(err);
    }
  };

  //  获取帖子下的评论并进行展示
  const fetchAndShowComments = async (post_id) => {
    if (!post_id) return;
    // 切换当前帖子的评论显示状态
    setCommentsVisibility((prev) => ({
      ...prev,
      [post_id]: !prev[post_id],
    }));
    // 如果要显示评论且还没有加载过，则获取评论
    if (!postComments[post_id]) {
      const res = await getComments(post_id);
      setPostComments((prev) => ({
        ...prev,
        [post_id]: res.data,
      }));
    }
  };

  const handleCommentSubmit = async (postId) => {
    setCurPostId(postId);
    if (newComment.trim()) {
      // 发送评论请求
      try {
        const res = await createComment({
          content: newComment,
          user_id: getUserId(),
          post_id: postId,
        });
        if (res.code === 200) {
          // 更新评论数量
          setCommentCount((prevCount) => prevCount + 1);
          // 更新评论列表
          setPostComments((prevComments) => ({
            ...prevComments,
            [postId]: [...prevComments[postId], res.data],
          }))
          // 清空评论输入框
          setNewComment("");
          // 关闭评论区
          setShowComments(false);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      Toast.info("评论内容不能为空");
      return;
    }
  };

  // 点击回复底部输入框展示
  const handleReplyClick = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent("");
  };

  const setReplyingToAndToggle = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setShowComments(true);
  };
  // 二级回复
  const handleReplySubmit = async (post_id, commentId) => {
    if (!replyContent.trim()) return;
    const res = await createComment({
      content: replyContent,
      user_id: getUserId(),
      post_id: post_id,
      parent_id: commentId,
    });
    if (res.code === 200) {
      setReplyContent("");
      setReplyingTo(null);
    }
  };
  // 删除评论
  const commentDel = async (comment_id) => {
    const res = await deleteComment(comment_id);
    if (res.code === 200) {
      Toast.success("删除成功");
    } else {
      Toast.error("删除失败");
    }
  };
  useEffect(() => {
    fecthTopicDetail();
    fecthTopicPosts();
  }, []);

  
  // 跳转用户页面
  const navigate = useNavigate();
  const goToUserPage = (user_id) => {
    navigate(`/user/${user_id}`);
  };

  return (
    <div className={styles.container}>
      {/* Hero Banner */}
      <div className={styles.heroBanner}>
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <div className={styles.topicTag}>
              <Hash className={styles.icon} />
              <span>热门话题</span>
            </div>
            <h1 className={styles.title}>{topic.name}</h1>
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <Users className={styles.statIcon} />
                <span>{1231} 参与</span>
              </div>
              <div className={styles.statItem}>
                <TrendingUp className={styles.statIcon} />
                <span>今日热度 {"+" + topic.view_count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.contentWrapper}>
          {/* Topic Description */}
          <div className={styles.topicDescription}>
            <p>{topic.description}</p>
            <div className={styles.actionButtons}>
              <button className={styles.primaryButton}>参与话题</button>
              <button className={styles.secondaryButton}>分享话题</button>
            </div>
          </div>

          {/* Posts */}
          {posts.map((post) => (
            <article key={post.id} className={styles.post}>
              <div className={styles.postHeader}>
                <img
                  src={post.user.image}
                  alt={`${post.user.username}'s avatar`}
                  className={styles.avatar}
                />
                <div>
                  <h3 className={styles.userName}>{post.user.username}</h3>
                  <p className={styles.timestamp}>{post.created_at}</p>
                </div>
              </div>

              <p className={styles.postContent}>{post.content}</p>

              <PostImages images={post.images} />
              <TopicTags tags={post.topics} />

              <LikeAvatars likes={post.likes} total={post.likes.length} />

              <div className={styles.postActions}>
                {/* like */}
                <button
                  className={`${styles.actionButton} ${styles.likeButton}`}
                  onClick={() => changeLikeStatus(post.id)}
                >
                  <Heart
                    className={styles.actionIcon}
                    color={
                      post.likes.some((like) => like.user_id === getUserId())
                        ? "red"
                        : "gray"
                    }
                  />
                  <span>{post.likes.length}</span>
                </button>
                {/* comment */}

                <button
                  className={`${styles.actionButton} ${styles.commentButton}`}
                  onClick={() => fetchAndShowComments(post.id)}
                >
                  <MessageCircle className={styles.actionIcon} />
                  <span>{post.comments.length}</span>
                </button>

                {/* share */}
                <button
                  className={`${styles.actionButton} ${styles.shareButton}`}
                >
                  <Share2 className={styles.actionIcon} />
                </button>
                <button
                  className={`${styles.actionButton} ${styles.bookmarkButton}`}
                >
                  <Bookmark className={styles.actionIcon} />
                </button>
              </div>

              {/* 评论列表--> 只渲染当前的帖子下的评论 */}
              {commentsVisibility[post.id] && (
                <div className={commentStyle.commentsSection}>
                  {/* 发布评论  */}
                  <div className={commentStyle.addComment}>
                    <Avatar size="small" src={getUserAvatar()} />
                    <div className={commentStyle.commentInput}>
                      <TextArea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(value) => setNewComment(value)}
                        autosize
                        maxLength={280}
                        className={commentStyle.textArea}
                      />
                      <Button
                        theme="solid"
                        icon={<IconSend />}
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={!newComment.trim()}
                        className={commentStyle.sendButton}
                      />
                    </div>
                  </div>

                  {/* 渲染评论 */}
                  <div className={commentStyle.commentList}>
                    {post.comments.map(
                      (comment) =>
                        !comment.parent_id && (
                          <Comment
                            id={post.id}
                            user={comment.user}
                            key={comment.id}
                            comment={comment}
                            onReplyClick={handleReplyClick}
                            replyingTo={replyingTo}
                            setReplyingToAndToggle={setReplyingToAndToggle}
                            replyContent={replyContent}
                            setReplyContent={setReplyContent}
                            handleReplySubmit={handleReplySubmit}
                            commentDel={commentDel}
                            goToUserPage={goToUserPage}
                          />
                        )
                    )}
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

const Comment = ({
  id,
  user,
  comment,
  onReplyClick,
  replyingTo,
  setReplyingToAndToggle,
  replyContent,
  setReplyContent,
  handleReplySubmit,
  commentDel,
  goToUserPage,
}) => (
  <div className={commentStyle.comment}>
    <Avatar
      size="small"
      src={comment.user.image}
      onClick={() => {
        goToUserPage(comment.user.id);
      }}
    />
    <div className={commentStyle.commentContent}>
      <Space>
        <Text strong>{comment.user.username}</Text>

        <Text type="tertiary">
          · {new Date(comment.created_at).toLocaleString()}
        </Text>
      </Space>
      <Space size="small">
        <Text>{comment.content}</Text>
        <Text
          size="small"
          type="tertiary"
          onClick={() => setReplyingToAndToggle(comment.id)}
          style={{ cursor: "pointer" }}
        >
          回复
        </Text>
        {/* 删除评论, 用户只能删除自己的 */}
        {getUserId() === comment.user.id && (
          <Text
            size="small"
            type="tertiary"
            onClick={() => {
              commentDel(comment.id);
            }}
            style={{ cursor: "pointer" }}
          >
            删除
          </Text>
        )}
      </Space>
      {replyingTo === comment.id && (
        <div className={commentStyle.replyInput}>
          <Avatar size="small" src={getUserAvatar()} />
          <div className={commentStyle.replyInputWrapper}>
            <TextArea
              placeholder={`Reply to ${comment.user.username}...`}
              value={replyContent}
              onChange={(value) => setReplyContent(value)}
              autosize
              maxLength={280}
            />
            <Button
              theme="solid"
              size="small"
              icon={<IconSend />}
              onClick={() => {
                handleReplySubmit(id, comment.id); // 传递父评论的ID
              }}
              disabled={!replyContent.trim()}
              className={commentStyle.replySendButton}
            />
          </div>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className={commentStyle.replies}>
          {comment.replies.map((reply) => (
            <Comment
              id={id}
              key={reply.id}
              comment={reply}
              onReplyClick={onReplyClick}
              replyingTo={replyingTo}
              setReplyingToAndToggle={setReplyingToAndToggle}
              replyContent={replyContent}
              setReplyContent={setReplyContent}
              handleReplySubmit={handleReplySubmit}
              commentDel={commentDel}
              goToUserPage={goToUserPage}
            />
          ))}
        </div>
      )}
    </div>
  </div>
);

export default TopicDetail;
