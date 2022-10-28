import {Card, Col, Layout, Nav, Row, Button, Input, TextArea, Table} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";
import axios from "axios";

    export default function RelationshipAdd() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ staffID, setStaffID ] = React.useState('');
    const [ seriesID, setSeriesID ] = React.useState('');
    const [ role, setRole ] = React.useState('');

    const [ staffName, setStaffName ] = React.useState('');
    const [ seriesName, setSeriesName ] = React.useState('');

    const submitRelationshipAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/relationships/add', {
            relationship: {
                staff_id: staffID,
                series_id: seriesID,
                role: role
            }
        }).then( res => {
            // navigate to /series
            window.location.href = "/series/" + seriesID
        })
    }

    const fetchInfo = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series/' + seriesID + '/name' ).then( res => {
            setSeriesName(res.data.name)
        })
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/staffs/' + staffID + '/name' ).then( res => {
            setStaffName(res.data.name)
        })
    }

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >STAFF 关系添加</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Card>
                                STAFF 姓名: {staffName}
                                <Input placeholder={"STAFF ID"} onChange={(e) => setStaffID(e)} />
                                <br/><br/>
                                剧集名称: {seriesName}
                                <Input placeholder={"剧集 ID"} onChange={(e) => setSeriesID(e)} />
                                <br/><br/>
                                职责: 0 => 原作 / 1 => 导演 / 2 => 脚本 / 3 => 分镜 / 4 => 演出 / 5 => 音乐 / .... 等待添加
                                <Input placeholder={"职责"} onChange={(e) => setRole(e)} />
                                <br/><br/>
                                <Button onClick={fetchInfo}>检查ID内容</Button>
                                <Button onClick={submitRelationshipAdd}>添加STAFF关系</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )

}