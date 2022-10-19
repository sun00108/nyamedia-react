import React from 'react';
import {Carousel, Typography, Space, Button} from '@douyinfe/semi-ui';
import { Col, Row } from '@douyinfe/semi-ui';
import { Card } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { Image } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconBell, IconHelpCircle, IconBytedanceLogo, IconHome, IconLive, IconSetting } from '@douyinfe/semi-icons';

import axios from 'axios';
import {Link} from "react-router-dom";
import { useParams } from "react-router-dom";

import AppHeader from "../../components/header";

export default function SeriesInfo() {

    const { id } = useParams();

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

    React.useEffect(() => {
        fetchSeries()
    }, [])

    const { Header, Footer, Content } = Layout;
    const { Title, Paragraph, Text } = Typography;

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid grid-flex">
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Card
                                bordered={false}
                                cover={<img src={process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + series.id + "/backdrop/" + images["backdrop"] + ".jpg"} />}>
                            </Card>
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
                                                    <Button type="tertiary" block>{item.episode}</Button>
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
        </Layout>
    )
}