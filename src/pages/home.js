import React from 'react';
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Col, Row } from '@douyinfe/semi-ui';
import { Card } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';

export default function Home() {

    const { Title, Paragraph } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const style = {
        width: '100%',
        height: '600px',
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
            <img src='https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/semi_logo.svg' alt='semi_logo' style={{ width:87, height:31 }} />
        );
    };

    const imgList = [
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-2.png',
        'https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-3.png',
    ];

    const textList = [
        ['Semi 设计管理系统', '从 Semi Design，到 Any Design', '快速定制你的设计系统，并应用在设计稿和代码中'],
        ['Semi 物料市场', '面向业务场景的定制化组件，支持线上预览和调试', '内容由 Semi Design 用户共建'],
        ['Semi Pro (开发中)', '基于 40+ 真实组件代码设计', '海量页面模板前端代码一键转'],
    ];

    return (
        <Layout className="components-layout-demo">
            <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
                <div>
                    <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
                        <Nav.Item itemKey="Home" text="首页"  />
                        <Nav.Item itemKey="Live" text="直播"  />
                        <Nav.Item itemKey="Setting" text="设置"  />
                    </Nav>
                </div>
            </Header>
            <Content>
                <div className="grid">
                    <Carousel style={style} theme='dark'>
                        {
                            imgList.map((src, index) => {
                                return (
                                    <div key={index} style={{ backgroundSize: 'cover', backgroundImage: `url(${src})` }}>
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
                    <Divider margin='12px'/>
                    <Row>
                        <Col md={4} xs={12}>
                            <Card style={{ maxWidth: 300 }}
                                  cover={
                                      <img
                                          alt="example"
                                          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg"
                                      />
                                  }>
                                <Meta title="卡片封面 - 1" />
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card style={{ maxWidth: 300 }}
                                  cover={
                                      <img
                                          alt="example"
                                          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg"
                                      />
                                  }>
                                <Meta title="卡片封面 - 2" />
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card style={{ maxWidth: 300 }}
                                  cover={
                                      <img
                                          alt="example"
                                          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg"
                                      />
                                  }>
                                <Meta title="卡片封面 - 3" />
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card style={{ maxWidth: 300 }}
                                  cover={
                                      <img
                                          alt="example"
                                          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg"
                                      />
                                  }>
                                <Meta title="卡片封面 - 4" />
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card style={{ maxWidth: 300 }}
                                  cover={
                                      <img
                                          alt="example"
                                          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg"
                                      />
                                  }>
                                <Meta title="卡片封面 - 5" />
                            </Card>
                        </Col>
                        <Col md={4} xs={12}>
                            <Card style={{ maxWidth: 300 }}
                                  cover={
                                      <img
                                          alt="example"
                                          src="https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/card-cover-docs-demo2.jpeg"
                                      />
                                  }>
                                <Meta title="卡片封面 - 6" />
                            </Card>
                        </Col>
                    </Row>
                    <Divider margin='12px'/>
                    <Title style={{ margin: '8px 0' }} >最近更新</Title>
                    <Divider margin='12px'/>
                    <Title style={{ margin: '8px 0' }} >最受欢迎</Title>
                </div>
            </Content>
            <Footer>Footer</Footer>
        </Layout>
    );
};
