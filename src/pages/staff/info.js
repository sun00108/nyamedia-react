import {Card, Col, Layout, Nav, Row, Button, Table} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link, useParams} from "react-router-dom";

import axios from "axios";

export default function StaffInfo() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const { id } = useParams();

    const roleMap = {
        "0": "原作",
        "1": "导演",
        "2": "脚本"
    }

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: '职责',
            dataIndex: 'role',
            render: (text, record, index) => {
                return roleMap[record.role]
            }
        },
        {
            title: '剧集名',
            dataIndex: 'series_name_cn',
        },
        {
            title: '季度',
            dataIndex: 'series_season',
            render: (text, record, index) => {
                return "第 " + record.series_season + " 季"
            }
        },
        {
            title: '年份',
            dataIndex: 'series_year',
        },
        {
            title: '查看',
            dataIndex: 'view',
            render: (text, record, index) => {
                return (
                    <Link to={ "/series/" + record.series_id } style={{ textDecoration: 'none'}}>
                        <Button type="tertiary" block>查看</Button>
                    </Link>
                )
            }
        }
    ]

    const [ data, setData ] = React.useState([]);

    const [ staffName, setStaffName ] = React.useState("");

    const fetchStaffInfo = () => {
        axios.get(process.env.REACT_APP_API_HOST + '/api/v1/relationships?staff_id=' + id).then( res => {
            setData(res.data.relationships)
        })
        axios.get(process.env.REACT_APP_API_HOST + '/api/v1/staffs/' + id + '/name' ).then( res => {
            setStaffName(res.data.name)
        })
    }

    React.useEffect(() => {
        fetchStaffInfo()
    }, [])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >STAFF 数据 - {staffName}</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Link to={"/staff"} style={{ textDecoration: 'none'}}>
                                <Button type="tertiary" block>返回列表</Button>
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