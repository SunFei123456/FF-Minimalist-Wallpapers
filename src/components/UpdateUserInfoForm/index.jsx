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
import * as qiniu from "qiniu-js";
import "./index.css";

export const UpdateUserInfoForm = ({ visible, afterClose, onCancel }) => {
  const { userInfo, setUserInfo } = useUserStore();
  // 表单提交
  const handleSubmit = async (values) => {
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
        // 更新 Zustand store 和本地存储
        setUserInfo({ ...userInfo, ...values });
        // 当都完成之后, 进行model关闭
        onCancel();
      }
    });
  };



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

              <div style={{ display: "flex", gap: "10px" }}>
                {/* 按钮提交 */}
                <Button
                  htmlType="submit"
                  type="primary"
                  theme="solid"
                  style={{ width: `20%` }}
                >
                  提交
                </Button>
                {/* 重置 */}
                <Button
                  htmlType="reset"
                  type="tertiary"
                  theme="solid"
                  style={{ width: `20%` }}
                >
                  重置
                </Button>
              </div>
            </>
          )}
        </Form>
      </Modal>
    </>
  );
};
