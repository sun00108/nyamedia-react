import {Card, Col, Layout, Nav, Row} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Input, TextArea, Button } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";

import axios from 'axios';

import {Link} from "react-router-dom";

export default function StreamAdd() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ streamName, setStreamName ] = React.useState("");
    const [ streamLink, setStreamLink ] = React.useState("");

    const submitStreamAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/streams/add', {
            stream: {
                name: streamName,
                link: streamLink
            }
        }).then( res => {
            // navigate to /series
            window.location.href = "/streams"
        })
    }

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >添加直播源</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Card>
                                <Input placeholder={"直播间名"} onChange={(e) => setStreamName(e)} />
                                <br/><br/>
                                <Input placeholder={"直播源"} onChange={(e) => setStreamLink(e)} />
                                <br/><br/>
                                <Button onClick={submitStreamAdd}>添加直播间</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )

}