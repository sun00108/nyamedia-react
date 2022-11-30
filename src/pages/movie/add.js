import {Card, Col, Layout, Nav, Row} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Input, TextArea, Button } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";

import axios from 'axios';

import {Link} from "react-router-dom";

export default function MovieAdd() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ movieName, setMovieName ] = React.useState("");
    const [ movieNameCN, setMovieNameCN ] = React.useState("");
    const [ movieDescription, setMovieDescription ] = React.useState("");
    const [ movieTMDBID, setMovieTMDBID ] = React.useState("");
    const [ movieBGMID, setMovieBGMID ] = React.useState("");

    const submitMovieAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/movies/add', {
            movie: {
                name: movieName,
                name_cn: movieNameCN,
                description: movieDescription,
                tmdb_id: movieTMDBID,
                bgm_id: movieBGMID
            }
        }).then( res => {
            if (res.data.code == 200) {
                // navigate to /series
                window.location.href = "/movie"
            } else {
                alert(res.data.message)
            }

        })
    }

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >添加电影</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Card>
                                <Input placeholder={"电影原名"} onChange={(e) => setMovieName(e)} />
                                <br/><br/>
                                <Input placeholder={"电影中文名"} onChange={(e) => setMovieNameCN(e)} />
                                <br/><br/>
                                <TextArea autosize maxCount={1000} placeholder={"电影简介"} onChange={(e) => setMovieDescription(e)} />
                                <br/><br/>
                                <Input placeholder={"电影 TMDB ID"} onChange={(e) => setMovieTMDBID(e)} />
                                <br/><br/>
                                <Input placeholder={"电影 BGM ID"} onChange={(e) => setMovieBGMID(e)} />
                                <br/><br/>
                                <Button onClick={submitMovieAdd}>添加剧集</Button>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )

}