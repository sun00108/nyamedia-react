import {Card, Col, Layout, Nav, Row} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Input, TextArea, Button } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";

import axios from 'axios';

import {Link} from "react-router-dom";

export default function OnAirAdd() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ seriesID, setSeriesID ] = React.useState("");
    const [ day, setDay ] = React.useState("");
    const [ time, setTime ] = React.useState("");

    const submitOnAirAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/onairseries/add', {
            onairseries: {
                series_id: seriesID,
                day: day,
                time: time,
                status: 1
            }
        }).then( res => {
            // navigate to /series
            window.location.href = "/onair"
        })
    }

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >添加正在播出剧集</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Card>
                                <Input placeholder={"剧集ID"} onChange={(e) => setSeriesID(e)} />
                                <br/><br/>
                                <Input placeholder={"星期"} onChange={(e) => setDay(e)} />
                                <br/><br/>
                                <Input placeholder={"时间"} onChange={(e) => setTime(e)} />
                                <br/><br/>
                                <Button onClick={submitOnAirAdd}>添加 On Air 剧集</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )

}