import React, { useState,useEffect } from "react";
import { Tabs, TabPane, Modal, Button ,Form,Tooltip,Toast } from "@douyinfe/semi-ui";
import { IconFile, IconGlobe, IconHelpCircle } from "@douyinfe/semi-icons";
import {register,login} from '@/apis/user'
import { useUserStore} from '@/store/index'
export default function LoginAndRegisterPane({visible,hideModal}) {

  const {setUserInfo,userInfo} = useUserStore();
 

  // 登录
  const handleSubmitOfLogin = (values) => {
    Toast.info('表单已提交');
    login(values.email,values.password).then((res)=>{
      if (res.code == 200) {
        Toast.success('登录成功');
        localStorage.setItem('token',res.access_token);
        setUserInfo(res.data)
        hideModal();
      }
    }).catch((err)=>{
      console.log(err);
      Toast.error(err.error);
    })
  };

  // 注册
  const handleSubmitOfRegister = (values) => {
    Toast.info('表单已提交');
    register(values.reg_username,values.reg_email,values.reg_password).then((res)=>{
      if (res.code == 200) {
        Toast.success('注册成功');
      }
    }).catch((err)=>{
      console.log(err);
      Toast.error(err.error);
    })
  };

    // 使用 useEffect 监听 userInfo 的变化
  useEffect(() => {
        console.log('userInfo changed:', userInfo);
  }, [userInfo]);
  return (
    <Modal  visible={visible} footer={null} onCancel={hideModal }>
      <Tabs>
        <TabPane tab={<span><IconFile />登录</span> } itemKey="1" >
            <Form onSubmit={values => handleSubmitOfLogin(values)} style={{ width: 400 }}>
            {({ formState, values, formApi }) => (
                <>
                    <Form.Input field='email' label='邮箱' style={{ width: '100%' }} placeholder='输入邮箱'></Form.Input>
                    <Form.Input field='password' label='密码' style={{ width: '100%' }} placeholder='输入密码'></Form.Input>
                    <Form.Checkbox field='agree' noLabel>我已经阅读条款并且同意</Form.Checkbox>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <p>
                             <span>Or</span><Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' } }>注册</Button>
                        </p>
                        <Button disabled={!values.agree} htmlType='submit' type="tertiary">登录</Button>
                    </div>
                </>
            )}
            </Form>
        </TabPane>

        <TabPane tab={<span><IconGlobe />注册</span>} itemKey="2">
            <Form onSubmit={values => handleSubmitOfRegister(values)} style={{ width: 400 }}>
            {({ formState, values, formApi }) => (
                <>
                    <Form.Input field='reg_username' label='用户名' style={{ width: '100%' }} placeholder='输入用户名'></Form.Input>
                    <Form.Input field='reg_email' label='邮箱' style={{ width: '100%' }} placeholder='输入邮箱'></Form.Input>
                    {/* 密码 */}
                    <Form.Input field='reg_password'
                        autoComplete='off'
                        label='密码'
                        type='password'
                        style={{ width: '100%' }}
                        placeholder='输入密码'
                    ></Form.Input>
                    {/* 再次确认密码 */}
                    <Form.Input field='reg_password2'
                        label='重复密码'
                        type='password'
                        autoComplete='off'
                        style={{ width: '100%' }}
                        placeholder='重复密码'
                    ></Form.Input>
                    <Form.Checkbox field='reg_agree' noLabel>我已经阅读条款并且同意</Form.Checkbox>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p>
                            <span>Or</span><Button theme='borderless' style={{ color: 'var(--semi-color-primary)', marginLeft: 10, cursor: 'pointer' } }>登录</Button>
                        </p>
                        <Button disabled={!values.reg_agree} htmlType='submit' type="tertiary">注册</Button>
                    </div>
                </>
            )}
            </Form>
        </TabPane>
      </Tabs>
    </Modal>
  );
}
