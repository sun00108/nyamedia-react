import React from 'react';
import Player from 'xgplayer'

import {Col, Row, Card, Divider, Button} from '@douyinfe/semi-ui';

import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {Layout, Nav, Typography} from '@douyinfe/semi-ui';

import AppHeader from "../../components/header";

export default function SeriesPlay() {

    const { id, episode } = useParams();

    const { Header, Footer, Content } = Layout;
    const { Title, Paragraph, Text } = Typography;

    const [ series, setSeries ] = React.useState({});
    const [ images, setImages ] = React.useState({});
    const [ episodes, setEpisodes ] = React.useState([]);

    const fetchSeries = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series/' + id).then( res => {
            setSeries(res.data.series)
            setImages(res.data.images)
            setEpisodes(res.data.episodes)
        })
    }

    if (episodes[episode-1] != null) {
        const player = new Player({
            id: 'vs',
            url: process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + series.id + "/video/" + episodes[episode-1].video_hash,
            fluid: true
        })
        console.log(process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + series.id + "/video/" + episodes[episode-1].video_hash)
    }

    React.useEffect(() => {
        fetchSeries()
    },[])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className={"grid grid-flex"}>
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Card bordered={false}><div id="vs"></div></Card>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Title>{series.name_cn}</Title>
                            <Text>{series.name} - 第 {series.season} 季</Text>
                            <br />
                            <Text>{series.description}</Text>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Divider margin='12px' align='center'>
                                播放列表
                            </Divider>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Row gutter={[16, 16]}>
                                {
                                    episodes.map((item) => {
                                        return (
                                            <Col md={2} xs={4}>
                                                <Link to={"/series/" + id + "/play/" + item.episode} style={{ textDecoration: 'none'}}>
                                                    {
                                                        item.episode == episode ? (
                                                            <Button block>{item.episode}</Button>
                                                        ) : (
                                                            <Button type="tertiary" block>{item.episode}</Button>
                                                        )
                                                    }

                                                </Link>
                                            </Col>
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Divider margin='12px' align='center'>
                                剧集信息
                            </Divider>
                        </Col>
                    </Row>

                </div>
            </Content>
        </Layout>
    )

}