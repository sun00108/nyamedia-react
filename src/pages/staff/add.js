import {Card, Col, Layout, Nav, Row, Button, Input, TextArea, Table} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";
import axios from "axios";

export default function StaffList() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ name, setName ] = React.useState('');
    const [ nameCN, setNameCN ] = React.useState('');

    const submitStaffAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/staffs/add', {
            staff: {
                name: name,
                name_cn: nameCN
            }
        }).then( res => {
            // navigate to /series
            window.location.href = "/staff"
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
                                <Input placeholder={"STAFF原名"} onChange={(e) => setName(e)} />
                                <br/><br/>
                                <Input placeholder={"STAFF中文名"} onChange={(e) => setNameCN(e)} />
                                <br/><br/>
                                <Button onClick={submitStaffAdd}>添加剧集</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )

}