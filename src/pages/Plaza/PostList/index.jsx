import React, { useState, useEffect } from "react";
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
} from "@douyinfe/semi-icons";
import { get, create } from "@/apis/post";
import styles from "./index.module.css";
import { useRef } from "react";
import { Tag } from "@douyinfe/semi-ui";
import { getUserId } from "@/utils";

const { Text } = Typography;

// one
const PostList = () => {
  const [postList, setPostList] = useState([]);
  const getPost = async () => {
    const res = await get();
    setPostList(res.data);
  };

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className={styles.container}>
      <CreatePost getPost={getPost} />
      {Array.isArray(postList) &&
        postList.map((post) => <Post key={post.id} {...post} />)}
    </div>
  );
};

// 模拟话题数据
const TOPICS = [
  { value: "technology", label: "Technology", hot: true },
  { value: "sports", label: "Sports" },
  { value: "music", label: "Music", hot: true },
  { value: "movies", label: "Movies" },
  { value: "food", label: "Food & Cooking", hot: true },
  { value: "travel", label: "Travel" },
  { value: "gaming", label: "Gaming" },
  { value: "art", label: "Art & Design" },
];

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

  // 处理发帖提交
  const handlePostSubmit = async () => {
    if (!content.trim()) return;
    console.log("JSON", JSON.stringify(uploadedImages));

    const data = {
      content,
      user_id: getUserId(),
      images: uploadedImages.length ? JSON.stringify(uploadedImages) : "[]",
    };
    try {
      await create(data); // 发布帖子
      setContent(""); // 清空内容
      setFileList([]); // 清空图片列表
      getPost(); // 更新帖子列表
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

  // 渲染话题选项
  const renderTopicMenu = () => {
    return (
      <Dropdown.Menu>
        {TOPICS.map((topic) => (
          <Dropdown.Item
            key={topic.value}
            onClick={() => handleTopicSelect(topic)}
            className={styles.topicItem}
          >
            <div className={styles.topicOption}>
              <span className={styles.topicLabel}>#{topic.label}</span>
              {topic.hot && <span className={styles.hotTag}>Hot</span>}
            </div>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    );
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

  return (
    <Card className={styles.createPost}>
      {/* 内容输入区域 */}
      <div className={styles.inputWrapper}>
        {topicList.length > 0 && (
          <div className={styles.topicSelect}>
            {topicList.map((topic) => (
              // onclike to del this topic
              <Tag
                className={styles.topicTag}
                key={topic.value}
                color="blue"
                onClick={() =>
                  setTopicList(
                    topicList.filter((item) => item.value !== topic.value)
                  )
                }
              >
                #{topic.label}
              </Tag>
            ))}
          </div>
        )}
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
            action="http://127.0.0.1:5000/wallpaper/upload"
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
          <Dropdown
            // 控制显示和隐藏
            style={{ marginLeft: 10 }}
            trigger="click"
            position="bottomLeft"
            visible={showTopicSelect}
            onVisibleChange={setShowTopicSelect}
            content={renderTopicMenu()}
            disabled
          >
            <Button
              icon={<IconHash />}
              disabled={disabledCreatePost}
              type="tertiary"
              theme="borderless"
            />
          </Dropdown>
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
  );
};

// three
const Post = ({ user, content, likes, comments, images }) => {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      // In a real app, this would make an API call
      setNewComment("");
    }
  };
  return (
    <Card className={styles.post}>
      <Space align="start" className={styles.postMain}>
        <Avatar src={user.image} />
        <div className={styles.postContent}>
          {/* user info */}
          <Space>
            <Text strong>{user.username}</Text>
            <Text type="tertiary">@{user.email}</Text>
            <Text type="tertiary">· {new Date().toLocaleDateString()}</Text>
          </Space>
          {/* post content */}
          <Text className={styles.content}>{content}</Text>
          {/* post images */}
          <div className={styles.ImageContainer}>
            {images &&
              JSON.parse(
                images.replace(/'/g, '"').replace(/\n/g, "").trim()
              ).map((url, index) => (
                <Image
                  width={180}
                  height={100}
                  key={index}
                  src={url}
                  className={styles.postImage}
                />
              ))}
          </div>
          {/* post actions */}
          <Space className={styles.actions}>
            {/* like */}
            <Button icon={<IconLikeThumb />} type="tertiary" theme="borderless">
              {likes.length}
            </Button>
            {/* comment */}
            <Button
              icon={<IconComment />}
              type="tertiary"
              theme="borderless"
              onClick={() => setShowComments(!showComments)}
              className={showComments ? styles.activeButton : ""}
            >
              {comments.length}
            </Button>
            {/* forward */}
            <Button icon={<IconForward />} type="tertiary" theme="borderless" />
            {/* favorite */}
            <Button
              icon={<IconBookmark />}
              type="tertiary"
              theme="borderless"
            />
          </Space>
        </div>
      </Space>

      {showComments && (
        <div className={styles.commentsSection}>
          <div className={styles.addComment}>
            <Avatar size="small" src={user.image} />
            <div className={styles.commentInput}>
              <TextArea
                placeholder="Write a comment..."
                value={newComment}
                onChange={(value) => setNewComment(value)}
                autosize
                maxLength={280}
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

          <div className={styles.commentList}>
            {comments.map((comment, index) => (
              <div key={index} className={styles.comment}>
                <Avatar size="small" src={comment.user.image} />
                <div className={styles.commentContent}>
                  <Space>
                    <Text strong>{comment.user.username}</Text>
                    <Text type="tertiary">@{comment.user.email}</Text>
                    <Text type="tertiary">
                      · {new Date(comment.created_at).toLocaleString()}
                    </Text>
                  </Space>
                  <Text>{comment.content}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default PostList;
