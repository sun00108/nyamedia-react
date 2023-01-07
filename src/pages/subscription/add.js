import {Card, Col, Layout, Nav, Row, Button, Input, TextArea, Table} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";
import axios from "axios";

export default function SubscriptionList() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ seriesID, setSeriesID ] = React.useState('');
    const [ rssLink, setRssLink ] = React.useState('');

    const submitStaffAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/subscriptions/add', {
            subscription: {
                series_id: seriesID,
                rss_link: rssLink,
                active: true
            }
        }).then( res => {
            // navigate to /series
            window.location.href = "/admin/subscription"
        })
    }

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >STAFF添加</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Card>
                                <Input placeholder={"剧集ID"} onChange={(e) => setSeriesID(e)} />
                                <br/><br/>
                                <Input placeholder={"RSS链接"} onChange={(e) => setRssLink(e)} />
                                <br/><br/>
                                <Button onClick={submitStaffAdd}>添加订阅</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )

}