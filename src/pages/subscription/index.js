import {Card, Col, Layout, Nav, Row, Button, Table} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";

import axios from "axios";

export default function SubscriptionList() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '剧集ID',
            dataIndex: 'series_id',
        },
        {
            title: 'rss_link',
            dataIndex: 'rss_link',
        },
        {
            title: '状态',
            dataIndex: 'active',
        },
        {
            title: '停止订阅',
            dataIndex: 'view',
            render: (text, record, index) => {
                return (
                    <Link to={ "/staff/" + record.id } style={{ textDecoration: 'none'}}>
                        <Button type="tertiary" block>（没写）</Button>
                    </Link>
                )
            }
        }
    ]

    const [ data, setData ] = React.useState([]);

    const fetchSubscriptionList = () => {
        axios.get(process.env.REACT_APP_API_HOST + '/api/v1/subscriptions').then( res => {
            setData(res.data.data)
        })
    }

    React.useEffect(() => {
        fetchSubscriptionList()
    },[])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >剧集订阅列表</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Link to={"/admin/subscription/add"} style={{ textDecoration: 'none'}}>
                                <Button type="tertiary" block>添加订阅</Button>
                            </Link>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Table columns={columns} dataSource={data} pagination={false}/>
                        </Col>
                    </Row>
                </div>
            </Content>
            <Footer></Footer>
        </Layout>
    )

}