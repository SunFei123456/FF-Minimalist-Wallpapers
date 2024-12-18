import React, { useState, useEffect, useCallback, forwardRef } from "react";
import { useNavigate } from "react-router-dom";
import * as qiniu from "qiniu-js";
import {
  Card,
  Avatar,
  Space,
  Button,
  Typography,
  TextArea,
  Image,
  Upload,
  Dropdown,
  Toast,
  AvatarGroup,
} from "@douyinfe/semi-ui";
import {
  IconLikeThumb,
  IconComment,
  IconForward,
  IconBookmark,
  IconSend,
  IconImageStroked,
  IconHash,
  IconClose,
  IconDelete,
  IconPlus,
} from "@douyinfe/semi-icons";
import {
  get,
  create,
  likeOrCancelLike,
  getComments,
  createComment,
  deletePost,
  deleteComment,
} from "@/apis/post";
import styles from "./index.module.css";
import { useRef } from "react";
import { Tag } from "@douyinfe/semi-ui";
import { getUserId, getUserAvatar, uploadFile } from "@/utils";
import ConfettiExplosion from "react-confetti-explosion";
import TopicSelect from "./components/TopicSelect";
import AddTopicModal from "./components/AddTopicModal";
import { bindTopic } from "@/apis/topic";
import Loading from "@/components/Loading";

const { Text } = Typography;

// one
const PostList = () => {
  const [loading, setLoading] = useState(false);
  const [postList, setPostList] = useState([]);
  const getPost = async () => {
    setLoading(true);
    try {
      const res = await get();
      setPostList(res.data);
    } catch (error) {
      Toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <CreatePost getPost={getPost} />
      {Array.isArray(postList) &&
        postList.map((post) => (
          <Post key={post.id} getPost={getPost} {...post} />
        ))}
    </div>
  );
};

// two
const CreatePost = ({ getPost }) => {
  const [content, setContent] = useState("");
  const [fileList, setFileList] = useState([]);
  const [showTopicSelect, setShowTopicSelect] = useState(false);
  const inputRef = useRef(null);
  // 维护一个话题的列表
  const [topicList, setTopicList] = useState([]);

  const [uploadedImages, setUploadedImages] = useState([]);
  // 是否禁用post表单
  const [disabledCreatePost, setDisabledCreatePost] = useState(false);

  // 控制modal的显示or 隐藏
  const [showModal, setShowModal] = useState(false);

  // 选择的话题id
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  // 选择的话题名称
  const [selectedTopicName, setSelectedTopicName] = useState(null);

  // 处理发帖提交
  const handlePostSubmit = async () => {
    if (!content.trim()) return;
    const data = {
      content,
      user_id: getUserId(),
      images: uploadedImages.length ? JSON.stringify(uploadedImages) : "[]",
    };
    try {
      const res = await create(data); // 发布帖子
      if (selectedTopicId) {
        // 如果选择了话题
        // 绑定帖子和话题
        const binddata = {
          post_id: res.post_id,
          topic_id: selectedTopicId,
        };
        await bindTopic(binddata);
      }
      setContent(""); // 清空内容
      setFileList([]); // 清空图片列表
      getPost(); // 刷新帖子列表

      Toast.success("Post created successfully!");
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  // 处理图片列表变化
  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList.map((file) => ({ url: file.url }))); // 确保状态正确更新
  };

  // 删除图片
  const handleImageRemove = (file) => {
    setFileList((prevFileList) =>
      prevFileList.filter((item) => item.url !== file.url)
    );
  };

  // 修改话题选择处理函数
  const handleTopicSelect = (topic) => {
    setTopicList([...topicList, topic]);
    setShowTopicSelect(false);
  };

  const onUploadSuccess = (r) => {
    // 处理成功上传的图片
    const uploadedImage = r.file_path;
    setUploadedImages([...uploadedImages, uploadedImage]);
  };

  // 点击输入框进行回调处理函数
  const onClikeInputHandler = () => {
    // 从localStorage中获取uid
    const uid = getUserId();
    if (!uid) {
      setDisabledCreatePost(true);
      Toast.info("输入框被禁用,请先登录");
      return;
    }
  };

  // 点击话题回调函数
  const handleTopicClick = (topicId, topicName) => {
    setSelectedTopicId(topicId); // 更新选中的话题
    setSelectedTopicName(topicName); // 更新选中的话题名称
    setShowTopicSelect(false); // 关闭话题选择
  };

  // 图片上传 七牛云
  const handleUpload = async (file) => {
    uploadFile(file, (res, err) => {
      if (err) {
        Toast.error(err);
      } else {
        Toast.success(res.message);
        setUploadedImages([...uploadedImages, res.file_path]);
      }
    });
  };

  return (
    <>
      <Card className={styles.createPost}>
        {/* 渲染选中的话题 Tag*/}
        {selectedTopicName && (
          <Tag
            className={styles.selectedTopicTag}
            color="blue"
            onClick={() => setSelectedTopicName(null)}
          >
            {selectedTopicName}
          </Tag>
        )}
        {/* 内容输入区域 */}
        <div className={styles.inputWrapper}>
          <input
            ref={inputRef}
            disabled={disabledCreatePost}
            className={styles.postInput}
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onClick={() => onClikeInputHandler()}
          />
        </div>

        {/* 图片预览区域 */}
        {fileList.length > 0 && (
          <div className={styles.imagePreviewArea}>
            {fileList.map((file, index) => (
              <div key={index} className={styles.imagePreviewItem}>
                <img src={file.url} alt={file.name} />
                <Button
                  className={styles.removeButton}
                  icon={<IconClose />}
                  type="tertiary"
                  theme="borderless"
                  onClick={() => handleImageRemove(file)}
                />
              </div>
            ))}
          </div>
        )}

        {/* 底部操作栏 */}
        <div className={styles.bottomAction}>
          {/* 左侧操作区 */}
          <div className={styles.leftActions}>
            {/* 图片上传 */}
            <Upload
              action={""}
              customRequest={({ file }) => {
                handleUpload(file);
              }}
              name="file"
              showUploadList={false}
              accept="image/*"
              maxCount={6}
              onChange={handleImageChange}
              disabled={disabledCreatePost}
              onSuccess={onUploadSuccess}
            >
              <Button
                icon={<IconImageStroked />}
                type="tertiary"
                theme="borderless"
                disabled={fileList.length >= 6}
              />
            </Upload>
            {/* 话题选择 */}
            <Button
              icon={<IconHash />}
              disabled={disabledCreatePost}
              type="tertiary"
              theme="borderless"
              onClick={() => setShowTopicSelect(!showTopicSelect)}
            />
            {showTopicSelect && (
              <TopicSelect onTopicClick={handleTopicClick}></TopicSelect>
            )}
            {/* 添加话题 */}
            <Button
              icon={<IconPlus />}
              type="tertiary"
              theme="borderless"
              disabled={disabledCreatePost}
              onClick={() => setShowModal(!showModal)}
            />
          </div>

          {/* 右侧操作区 */}
          <div className={styles.rightActions}>
            {/* 图片计数 */}
            {fileList.length > 0 && (
              <Text type="tertiary" className={styles.imageCount}>
                {fileList.length}/6
              </Text>
            )}

            {/* 字数统计 */}
            <Text type="tertiary" className={styles.charCount}>
              {content.length}/280
            </Text>

            {/* 发布按钮 */}
            <Button
              theme="solid"
              className={styles.postButton}
              onClick={handlePostSubmit}
              disabled={!content.trim()}
            >
              Post
            </Button>
          </div>
        </div>
      </Card>

      {showModal && <AddTopicModal></AddTopicModal>}
    </>
  );
};

const mediumProps = {
  force: 0.6,
  duration: 2500,
  particleCount: 100,
  width: 500,
  colors: ["#9A0023", "#FF003C", "#AF739B", "#FAC7F3", "#F7DBF4"],
};
// three
const Post = ({
  id,
  topics,
  user,
  content,
  likes,
  comments,
  images,
  getPost,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  // 点赞的状态,用于及时更新点赞数量, 默认状态为数据库返回的结果比对
  const [isLiked, setLiked] = useState(
    likes.some((like) => like.user_id === getUserId())
  );
  // 点赞的数量,默认为数据库返回的likes 的长度
  const [likeCount, setLikeCount] = useState(likes.length);
  // 评论的数量,默认为数据库返回的comments 的长度
  const [commentCount, setCommentCount] = useState(comments.length);
  // 评论的列表
  const [commentsV1, setCommentsV1] = useState([]);

  // 回复的状态
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyContent, setReplyContent] = useState("");
  // 触发糖果动画的变量
  const [isShowConfetti, setIsShowConfetti] = useState(false);
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      // 发送评论请求
      try {
        const res = await createComment({
          content: newComment,
          user_id: getUserId(),
          post_id: id,
        });
        if (res.code === 200) {
          // 更新评论数量
          setCommentCount((prevCount) => prevCount + 1);
          // 更新评论列表
          setCommentsV1((prevComments) => [...prevComments, res.data]);
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

  // 点赞or取消点赞
  const changeLikeStatus = async () => {
    setIsShowConfetti(!isShowConfetti);
    // 发送请求
    try {
      const res = await likeOrCancelLike(getUserId(), id);
      if (res.code === 200) {
        // 更新点赞数量
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
        // 更新点赞状态
        setLiked(!isLiked);
        // 重新请求
        getPost();
      }
    } catch (err) {
      console.error(err);
    }
  };

  //  获取帖子下的评论并进行展示
  const fetchAndShowComments = async (post_id) => {
    if (!post_id) return;
    const res = await getComments(post_id);
    await setCommentsV1(res.data);
    await setShowComments(!showComments);
  };

  // 点击回复底部输入框展示
  const handleReplyClick = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setReplyContent("");
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
      getCommentsByPostId(post_id);
      setReplyContent("");
      setReplyingTo(null);
    }
  };
  // 定义一个方法, 获取某个帖子的最新评论
  const getCommentsByPostId = async (post_id) => {
    const res = await getComments(post_id);
    if (res.code === 200) {
      setCommentsV1(res.data);
    }
  };
  // 删除帖子
  const postDel = async (post_id) => {
    const res = await deletePost(post_id);
    if (res.code === 200) {
      Toast.success("删除成功");
      // 从帖子列表中删除该帖子
      getPost();
    } else {
      Toast.error("删除失败");
    }
  };
  // 删除评论
  const commentDel = async (comment_id) => {
    const res = await deleteComment(comment_id);
    if (res.code === 200) {
      Toast.success("删除成功");
      // 从评论列表中删除该评论
      getCommentsByPostId(id);
    } else {
      Toast.error("删除失败");
    }
  };

  const setReplyingToAndToggle = (commentId) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
    setShowComments(true);
  };
  // 跳转用户页面
  const navigate = useNavigate();
  const goToUserPage = (user_id) => {
    navigate(`/user/${user_id}`);
  };

  return (
    <Card className={styles.post}>
      <Space align="start" className={styles.postMain}>
        <Avatar
          src={user.image}
          className={styles.avatar}
          onClick={() => goToUserPage(user.id)}
        />
        <div className={styles.postContent}>
          {/* user info */}
          <Space>
            <Text strong>{user.username}</Text>
            <Text type="tertiary" className={styles.email}>
              @{user.email}
            </Text>
            <Text type="tertiary">· {new Date().toLocaleDateString()}</Text>
          </Space>
          {/* post content */}
          <Text className={styles.content}>
            {topics &&
              topics.map((content, index) => (
                <Tag
                  key={index}
                  color="blue"
                  className={styles.topicTag}
                  onClick={() => navigate(`/topic/${content.topic_id}`)}
                >
                  {"# " + content.topic_name}
                </Tag>
              ))}
            {content}
          </Text>
          {/* post images */}
          <div className={styles.ImageContainer}>
            {JSON.parse(images).map((url, index) => (
              <Image
                width={180}
                key={index}
                src={url}
                className={styles.postImage}
              />
            ))}
          </div>
          {/* post actions */}
          <Space className={styles.actions}>
            {/* like */}
            <Button
              // like--> [] 中 是否包含当前用户的id
              icon={
                <IconLikeThumb
                  style={{
                    color: isLiked ? "red" : "",
                  }}
                />
              }
              type="tertiary"
              theme="borderless"
              onClick={changeLikeStatus}
            >
              {likeCount}
            </Button>
            {/* comment */}
            <Button
              icon={<IconComment />}
              type="tertiary"
              theme="borderless"
              onClick={() => fetchAndShowComments(id)}
              className={showComments ? styles.activeButton : ""}
            >
              {commentCount}
            </Button>
            {/* favorite */}
            <Button
              icon={<IconBookmark />}
              type="tertiary"
              theme="borderless"
            />
            {/* 删除 */}
            {user.id === getUserId() && (
              <Button
                icon={<IconDelete />}
                type="tertiary"
                theme="borderless"
                onClick={() => postDel(id)}
              />
            )}
          </Space>

          <div className={styles.avatarGroup}>
            {likes.length > 0 && (
              <AvatarGroup size="small" maxCount={5}>
                {likes.map((like) => (
                  <Avatar
                    key={like.user_id}
                    size="small"
                    className={styles.likeAvatar}
                    src={like && like.user.image}
                  />
                ))}
              </AvatarGroup>
            )}
            {likes.length > 0 && (
              <span className={styles.likeCount}>等{likes.length}人觉得很赞</span>
            )}
          </div>
        </div>
      </Space>

      {showComments && (
        <div className={styles.commentsSection}>
          {/* 发布评论  */}
          <div className={styles.addComment}>
            <Avatar size="small" src={getUserAvatar()} />
            <div className={styles.commentInput}>
              <TextArea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(value) => setNewComment(value)}
                autosize
                maxLength={280}
                className={styles.textArea}
              />
              <Button
                theme="solid"
                icon={<IconSend />}
                onClick={handleCommentSubmit}
                disabled={!newComment.trim()}
                className={styles.sendButton}
              />
            </div>
          </div>

          {/* 渲染评论 */}
          <div className={styles.commentList}>
            {commentsV1.map(
              (comment) =>
                !comment.parent_id && (
                  <Comment
                    id={id}
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

      {isShowConfetti && <ConfettiExplosion {...mediumProps} />}
    </Card>
  );
};

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
  <div className={styles.comment}>
    <Avatar
      size="small"
      src={comment.user.image}
      onClick={() => {
        goToUserPage(comment.user.id);
      }}
    />
    <div className={styles.commentContent}>
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
        <div className={styles.replyInput}>
          <Avatar size="small" src={getUserAvatar()} />
          <div className={styles.replyInputWrapper}>
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
              className={styles.replySendButton}
            />
          </div>
        </div>
      )}
      {comment.replies.length > 0 && (
        <div className={styles.replies}>
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

export default PostList;
