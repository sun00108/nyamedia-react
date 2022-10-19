import React from 'react';
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Col, Row } from '@douyinfe/semi-ui';
import { Card } from '@douyinfe/semi-ui';
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
    const [ poster, setPoster ] = React.useState({});

    const fetchLatestUpdate = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series/latest').then( res => {
            setLatest(res.data.series)
            setPoster(res.data.posters)
        })
    }

    React.useEffect(() => {
        fetchLatestUpdate();
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
                                            <Card cover={<img src={ process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + item.id + "/poster/" + poster[item.id]  + ".jpg"} width={300} />}
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
                            <Title style={{ margin: '8px 0' }} >最受好评</Title>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    );
};
