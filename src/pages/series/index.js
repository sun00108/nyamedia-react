import {Card, Col, Layout, Nav, Row} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";
import axios from "axios";

export default function SeriesIndex() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const [ seriesList, setSeriesList ] = React.useState([]);

    const fetchAllSeries = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series').then( res => {
            setSeriesList(res.data.series)
        })
    }

    React.useEffect(() => {
        fetchAllSeries()
    }, [])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={18}>
                            <Title style={{ margin: '8px 0' }} >剧集列表</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={18}>
                            <Row gutter={16} type={"flex"}>
                                {
                                    seriesList.map((item) => {
                                        return (
                                            <Col xs={12} lg={8} xxl={3}>
                                                <Link to={"/series/" + item.id} style={{ textDecoration: 'none'}}>
                                                    <Card cover={<img src={ process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + item.id + "/poster/" + item.poster + ".jpg"} width={300} />}
                                                          bordered={false} shadows='hover'>
                                                        <Meta
                                                            title={item.name}
                                                            description={item.name_cn}
                                                        />{"第" + item.season + "季"}
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