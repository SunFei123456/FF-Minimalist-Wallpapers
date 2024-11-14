import {
  Card,
  Upload,
  Form,
  Button,
  Toast,
  Select,
  Descriptions,
} from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";
import React from "react";
import UploadPageStyle from "./index.module.css";
import { useState } from "react";
import { save } from "@/apis/wallpaper";
import { useNavigate } from "react-router-dom";
import { getAllTags } from "@/apis/tag";
import { useEffect } from "react";
import { useUserStore } from "@/store/index";
import { uploadFile } from "@/utils";

export default function UploadWallpaper() {
  const navigate = useNavigate();
  const { Option } = Form.Select;
  const { userInfo } = useUserStore();
  // 定义一个state用来存储所有的标签
  const [tags, setTags] = useState([]);

  // 定义一个state来需要提交个后台接口(用来保存图片信息到数据库)的数据
  const [formValues, setFormValues] = useState({
    url: "",
    type: "建筑",
    create_by: 0,
    file_size: 0,
    width: 0,
    height: 0,
  });
  // 图片指标的信息
  const [data, setData] = useState([
    { key: "内存大小", value: "???" },
    { key: "色彩模式", value: "???" },
  ]);
  // 指标样式
  const style = {
    backgroundColor: "var(--semi-color-bg-2)",
    borderRadius: "4px",
    padding: "10px",
    marginRight: "20px",
    width: "100%",
  };
  // 上传成功之后的回调
  const uploadSuccess = (res) => {
    const newData = [...data];
    newData[0].value = `${res.file_size}`; // 内存大小
    newData[1].value = res.mode; // 色彩模式
    // 设置图片指标信息
    setData(newData);
    setFormValues({
      url: res.file_path,
      type: res.file_type,
      file_size: res.file_size,
      // 记住这里, 后面完善了用户模块, 来进行修改  5/22ok ✅
      create_by: userInfo.user_id,
    });
  };

  // 表单提交
  const handleSubmit = (values) => {
    // 合并
    const newValues = { ...formValues, ...values };
    save({ ...newValues })
      .then((res) => {
        if (res.code === 200) {
          Toast.success("上传成功");
          navigate(`/user/${userInfo.user_id}`);
        }
      })
      .catch((err) => {
        Toast.error(err.error);
      });
  };

  // 获取所有标签
  const getTags = async () => {
    const res = await getAllTags();
    setTags(res.data);
  };
  useEffect(() => {
    getTags();
  }, []);


  // 上传图片
  const handleUpload = async (file) => {
    uploadFile(file, (res, err)=>{
      if (err) {
        Toast.error(err);
      } else {
        Toast.success("图片上传成功,请继续完善相关信息");
        uploadSuccess(res);
      }
    });

  };
  return (
    <>
      <div className={UploadPageStyle.upload}>
        <div className={UploadPageStyle.uploadCard}>
          {/* 左边image盒子  用来上传回显*/}
          <div className={UploadPageStyle.left}>
            <Upload
              action={""}
              // 自定义上传逻辑
              customRequest={({ file }) => {
                handleUpload(file);
              }}
              listType="picture"
              // 同input name属性
              fileName="file"
              // 文件类型
              accept="image/png,image/jpeg,image/jpg,image/gif,image/webp"
              // 限制
              limit={1}
              picWidth={400}
              picHeight={250}
              onSizeError={(file, fileList) =>
                Toast.error(`${file.name} 文件尺寸不符合要求`)
              }
            >
              <IconPlus size="extra-large" style={{ margin: 4 }} />
              点击添加图片
            </Upload>
          </div>

          <div className={UploadPageStyle.right}>
            <Form
              onSubmit={(values) => handleSubmit(values)}
              style={{ width: 400 }}
            >
              {({ formState, values, formApi }) => (
                <>
                  <Form.Input
                    field="name"
                    label="图片名称"
                    style={{ width: "100%" }}
                    placeholder="给这张图片起个合适的名字把"
                    size="large"
                  ></Form.Input>

                  <Form.Input
                    field="alt"
                    label="图片介绍"
                    style={{ width: "100%" }}
                    placeholder="简单介绍一下图片吧"
                    size="large"
                  ></Form.Input>

                  <Form.Select
                    size="large"
                    field="tag_id"
                    label={{ text: "分类" }}
                    style={{ width: "100%" }}
                    placeholder="选择分类"
                  >
                    {tags.reverse().map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Form.Select>

                  <br />
                  <br />
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{
                      color: "white",
                      backgroundColor: "#683df5",
                      width: "100%",
                      height: 40,
                    }}
                  >
                    确认提交
                  </Button>
                </>
              )}
            </Form>
            <Descriptions data={data} row style={style} />
          </div>
        </div>
      </div>
    </>
  );
}
