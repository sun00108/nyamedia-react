import {Card, Col, Layout, Nav, Row, Button, Table} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";

import axios from "axios";

export default function OnAirIndex() {

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
            title: '播出日',
            dataIndex: 'day',
        },
        {
            title: '播出时间',
            dataIndex: 'time',
        },
        {
            title: '查看',
            dataIndex: 'view',
            render: (text, record, index) => {
                return (
                    <Link to={ "/onair/" + record.id } style={{ textDecoration: 'none'}}>
                        <Button>查看</Button>
                    </Link>
                )
            }
        }
    ]

    const [ data, setData ] = React.useState([]);

    const fetchOnAirList = () => {
        axios.get(process.env.REACT_APP_API_HOST + '/api/v1/onairseries').then( res => {
            setData(res.data.onairseries)
        })
    }

    React.useEffect(() => {
        fetchOnAirList()
    },[])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >正在连载 - 列表</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Link to={"/onair/add"} style={{ textDecoration: 'none'}}>
                                <Button type="tertiary" block>添加连载</Button>
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