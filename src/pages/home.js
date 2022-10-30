import React from 'react';
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Col, Row } from '@douyinfe/semi-ui';
import { Card, Image } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo, IconHome, IconLive, IconSetting } from '@douyinfe/semi-icons';

import axios from 'axios';
import {Link} from "react-router-dom";

import AppHeader from "../components/header";

export default function Home() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ latest, setLatest ] = React.useState([]);
    const [ onair, setOnAir ] = React.useState([]);

    const fetchLatestUpdate = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series/latest').then( res => {
            setLatest(res.data.series)
        })
    }

    const fetchOnAir = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/onairseries/today').then( res => {
            setOnAir(res.data.onairseries)
        })
    }

    React.useEffect(() => {
        fetchLatestUpdate();
        fetchOnAir();
    },[])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >最近更新</Title>
                        </Col>
                    </Row>
                    <Row gutter={16} type={"flex"} justify={"center"}>
                        {
                            latest.map((item) => {
                                return (
                                    <Col xs={12} lg={8} xxl={2}>
                                        <Link to={"/series/" + item.id} style={{ textDecoration: 'none'}}>
                                            <Card cover={<img src={ process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + item.id + "/poster/" + item.poster + ".jpg"} width={300} />}
                                                  bordered={false} shadows='hover'>
                                                <Meta
                                                    title={item.name}
                                                    description={item.name_cn}
                                                />{"第" + item.season + "季"}
                                            </Card>
                                        </Link>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >今日放映</Title>
                        </Col>
                    </Row>
                    <Row gutter={16} type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Row type={"flex"} justify={"center"}>
                                {
                                    onair.map((item) => {
                                        return (
                                            <Col xs={24} lg={8}>
                                                <Link to={"/series/" + item.series_id } style={{ textDecoration: 'none'}}>
                                                    <Card bordered={false}>
                                                        <Row gutter={16}>
                                                            <Col span={12}>
                                                                <img src={ process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + item.series_id + "/poster/" + item.series_poster  + ".jpg" } style={{ maxWidth: '100%' }}/>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Meta title={item.series_name_cn} description={item.series_name + " - 第" + item.series_season + "季"} />
                                                                <Divider></Divider>
                                                                播出时间
                                                                <Title>{item.time}</Title>(GMT +9)
                                                            </Col>
                                                        </Row>
                                                    </Card>
                                                </Link>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    );
};
