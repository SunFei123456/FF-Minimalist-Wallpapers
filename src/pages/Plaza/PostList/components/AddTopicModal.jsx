import React, { useState } from "react";
import { Modal, Button, Input, TextArea, Toast } from "@douyinfe/semi-ui";
import { createTopic } from "@/apis/topic";

export default function AddTopicModal() {
  const [visible, setVisible] = useState(false);
  // 表单数据 {title 和 desc}
  const [formValue, setFormValue] = useState({
    name: "",
    description: "",
  });
  const showDialog = () => {
    setVisible(true);
  };
  const handleOk = async () => {
    // 接口调用
    try {
      const res = await createTopic(formValue);
      if (res.code == 200) {
        console.log("res",res);
        Toast.success("创建成功,你现在可以在话题列表中看到该话题");
        setVisible(false);
      } 
    } catch (error) {
      Toast.error(error.response.data.message);
    }
  };
  const handleCancel = () => {
    setVisible(false);
  };
  const handleAfterClose = () => {
    console.log("After Close callback executed");
  };
  return (
    <>
      <Button onClick={showDialog}>添加话题</Button>
      <Modal
        title="话题创建"
        visible={visible}
        onOk={handleOk}
        afterClose={handleAfterClose} //>=1.16.0
        onCancel={handleCancel}
        closeOnEsc={true}
      >
        {/* 话题标题 */}
        <Input
          placeholder="话题标题"
          value={formValue.name}
          onChange={(value) => setFormValue({ ...formValue, name: value })}
        ></Input>
        <br />
        <br />
        {/* 话题描述 */}
        <TextArea
          maxCount={100}
          showClear
          placeholder="话题描述(可选)"
          value={formValue.description}
          onChange={(value) =>
            setFormValue({ ...formValue, description: value })
          }
        />
      </Modal>
    </>
  );
}
