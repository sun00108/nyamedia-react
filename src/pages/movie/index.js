import {Card, Col, Layout, Nav, Row} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";
import axios from "axios";

export default function MovieIndex() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ movieList, setMovieList ] = React.useState([]);

    const fetchAllMovies = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/movies').then( res => {
            setMovieList(res.data.movies)
        })
    }

    React.useEffect(() => {
        fetchAllMovies()
    }, [])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={18}>
                            <Title style={{ margin: '8px 0' }} >电影列表</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={18}>
                            <Row gutter={16} type={"flex"}>
                                {
                                    movieList.map((item) => {
                                        return (
                                            <Col xs={12} lg={8} xxl={3}>
                                                <Link to={"/movie/" + item.id} style={{ textDecoration: 'none'}}>
                                                    <Card cover={<img src={ process.env.REACT_APP_MINIO_HOST + "/nyamedia/movies/" + item.id + "/poster/" + item.poster + ".jpg"} width={300} />}
                                                          bordered={false} shadows='hover'>
                                                        <Meta
                                                            title={item.name}
                                                            description={item.name_cn}
                                                        />
                                                    </Card>
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
            <Footer></Footer>
        </Layout>
    )

}