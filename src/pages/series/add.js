import {Card, Col, Layout, Nav, Row} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Input, TextArea, Button } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";

import axios from 'axios';

import {Link} from "react-router-dom";

export default function SeriesAdd() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ seriesName, setSeriesName ] = React.useState("");
    const [ seriesNameCN, setSeriesNameCN ] = React.useState("");
    const [ seriesSeason, setSeriesSeason ] = React.useState("");
    const [ seriesDescription, setSeriesDescription ] = React.useState("");
    const [ seriesTMDBID, setSeriesTMDBID ] = React.useState("");
    const [ seriesBGMID, setSeriesBGMID ] = React.useState("");

    const submitSeriesAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/series/add', {
            series: {
                name: seriesName,
                name_cn: seriesNameCN,
                season: seriesSeason,
                description: seriesDescription,
                tmdb_id: seriesTMDBID,
                bgm_id: seriesBGMID
            }
        }).then( res => {
            // navigate to /series
            window.location.href = "/series"
        })
    }

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >添加剧集</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Card>
                                <Input placeholder={"剧集原名"} onChange={(e) => setSeriesName(e)} />
                                <br/><br/>
                                <Input placeholder={"剧集中文名"} onChange={(e) => setSeriesNameCN(e)} />
                                <br/><br/>
                                <Input placeholder={"剧集季数"} onChange={(e) => setSeriesSeason(e)} />
                                <br/><br/>
                                <TextArea autosize maxCount={1000} placeholder={"剧集简介"} onChange={(e) => setSeriesDescription(e)} />
                                <br/><br/>
                                <Input placeholder={"剧集 TMDB ID"} onChange={(e) => setSeriesTMDBID(e)} />
                                <br/><br/>
                                <Input placeholder={"剧集 BGM ID"} onChange={(e) => setSeriesBGMID(e)} />
                                <br/><br/>
                                <Button onClick={submitSeriesAdd}>添加剧集</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )

}