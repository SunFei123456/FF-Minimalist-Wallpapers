import {
  Modal,
  Cascader,
  Form,
  Upload,
  Avatar,
  Button,
  Toast,
} from "@douyinfe/semi-ui";
import { useState } from "react";

import { IconCamera } from "@douyinfe/semi-icons";
import { bind_avatar, update_userInfo } from "@/apis/user";
import { useUserStore } from "@/store";
import "./index.css";

export const UpdateUserInfoForm = ({ visible, afterClose, onCancel }) => {
  const { userInfo, setUserInfo } = useUserStore();
  const [url, setUrl] = useState(
    "https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/dy.png"
  );

  // 上传头像
  const onSuccess = async (response, file) => {
    console.log("上传头像之后返回的对象:",response);
    // 上传成功
    if (response.code == 200) {
      Toast.success(response.message);
      setUrl(response.image_url);
    }
  };

  // 绑定头像
  const bindAvatar = async () => {
    const res = await bind_avatar(userInfo.user_id, url);
    console.log("绑定头像",res);
    if (res.code == 200) {
      Toast.success(res.message);
      // 更新 Zustand store 和本地存储
      setUserInfo({ ...userInfo, image: url });
    }
  };

  // 表单提交
  const handleSubmit = (values) => {
    update_userInfo(
      userInfo.user_id,
      values.nickname,
      values.gender,
      values.birth,
      values.country,
      values.province,
      values.city,
      values.description
    ).then((res) => {
      if (res.code == 200) {
        Toast.success(res.message);
        // 同时记得绑定头像
        bindAvatar();
        // 更新 Zustand store 和本地存储
        setUserInfo({ ...userInfo, ...values });
        // 当都完成之后, 进行model关闭
        onCancel();
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

  const api = "http://localhost:5000/user/upload_avatar";
  let imageOnly = "image/*";

  return (
    <>
      <Modal
        title="修改信息"
        visible={visible}
        centered
        afterClose={afterClose}
        onCancel={onCancel}
        closeOnEsc={true}
        footer={null}
        // 点击遮罩不退出
        maskClosable={false}
        style={{ padding: 20 }}
      >
        {/* S头像上传组件 */}
        <Upload
          className="avatar-upload"
          name="avatar"
          action={api}
          onSuccess={onSuccess}
          accept={imageOnly}
          showUploadList={false}
          onError={() => Toast.error("上传失败")}
        >
          <Avatar
            src={url}
            style={{ margin: 4 }}
            size="large"
            hoverMask={hoverMask}
          />
        </Upload>
        {/* 信息输入表单 */}
        <Form
          initValues={{
            nickname: userInfo.nickname,
            gender: userInfo.gender,
            birth: userInfo.birth,
            country: userInfo.country,
            province: userInfo.province,
            city: userInfo.city,
            description: userInfo.description,
          }}
          wrapperCol={{ span: 10 }}
          labelCol={{ span: 2 }}
          labelPosition="top"
          labelAlign="left"
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ formState, values, formApi }) => (
            <>
              <Form.Input
                field="nickname"
                style={{ width: 250 }}
                label="昵称"
                trigger="blur"
                placeholder="请输入姓名"
              />

              <Form.Select
                field="gender"
                label="性别"
                placeholder="性别"
                style={{ width: 100 }}
              >
                <Form.Select.Option value="male">男</Form.Select.Option>
                <Form.Select.Option value="female">女</Form.Select.Option>
              </Form.Select>
              {/* 生日 */}
              <Form.DatePicker
                field="birth"
                label="生日"
                style={{ width: "250px" }}
              />

              {/* 地区 */}
              <div style={{ display: "flex", gap: "10px" }}>
                <Form.Input
                  field="country"
                  style={{ width: 60 }}
                  label="地区"
                  trigger="blur"
                  placeholder="中国"
                />
                <Form.Input
                  field="province"
                  style={{ width: 60 }}
                  label="省份"
                  trigger="blur"
                  placeholder="河南"
                />
                <Form.Input
                  field="city"
                  style={{ width: 60 }}
                  label="城市"
                  trigger="blur"
                  placeholder="濮阳"
                />
              </div>

              {/* 文本域 */}
              <Form.TextArea
                field="description"
                style={{ width: 250 }}
                label="简介"
                trigger="blur"
                placeholder="请输入简介"
              />

              {/* 按钮提交 */}
              <Button
                htmlType="submit"
                type="primary"
                theme="solid"
                style={{ width: `100%` }}
              >
                提交
              </Button>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};
