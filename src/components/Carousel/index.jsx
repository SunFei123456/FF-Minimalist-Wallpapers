import React from 'react';
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';

export default function LunboTu ()  {
    const { Title, Paragraph } = Typography;

    const style = {
        width: '100%',
        height:'600px',

        // height: '600px',
    };

    const titleStyle = { 
        position: 'absolute', 
        top: '100px', 
        left: '100px',
        color: '#1C1F23'
    };

    const colorStyle = {
        color: '#1C1F23'
    };

    const renderLogo = () => {
        return (
            <img src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/semi_logo.svg' alt='semi_logo' style={{ width: 87, height: 31 }} />   
        );
    };

    const imgList = [
        '/src/assets/images/banner/bg-2.png',
        '/src/assets/images/banner/bg-3.png',
        '/src/assets/images/banner/bg-4.png',
        '/src/assets/images/banner/bg-6.png',
  
    ];

    const textList = [
        ['FF Minimal Wallpaper - FF极简壁纸','FF极简壁纸', '图片精美, 页面美观, 简洁,快速响应用户的需求'],
        ['个人主页', '美观的个人主页', '上方展示用户的主要信息,下方展示用户的喜欢,上传,收藏等用户操作'],
        ['暗黑模式', '保护您的眼睛', '可以在白天使用亮白模式,黑夜使用暗黑模式,更好地呵护您的眼睛.'],
        ['图片详细信息查看&&图片上传', '上传和查看', '精简的页面,提炼您关心的信息. 同时减少上传的信息,快速将您的图片上传到服务器.'],
    ];

    return (
        <Carousel style={style}>
            {
                imgList.map((src, index) => {
                    return (
                        <div key={index} style={{ backgroundSize: 'cover', backgroundImage: `url('${src}')` }}>
                            <Space vertical align='start' spacing='medium' style={titleStyle}>
                                {renderLogo()}
                                <Title heading={2} style={colorStyle}>{textList[index][0]}</Title>
                                <Space vertical align='start'>
                                    <Paragraph style={colorStyle}>{textList[index][1]}</Paragraph>
                                    <Paragraph style={colorStyle}>{textList[index][2]}</Paragraph>
                                </Space>
                            </Space>
                        </div>
                    );
                })
            }
        </Carousel>
    );
};
