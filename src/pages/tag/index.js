import {Card, Col, Layout, Nav, Row, Button, Table, Input, Switch} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";

import axios from "axios";

export default function TagList() {

    const { Title, Paragraph, Text } = Typography;
    const { Meta } = Card;
    const { Header, Footer, Content } = Layout;

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
        },
        {
            title: 'TAG名',
            dataIndex: 'name',
        },
        {
            title: '显示',
            dataIndex: 'hidden',
            render: (text, record, index) => {
                return (
                    <Switch checked={!record.hidden} />
                )
            }
        },
        {
            title: '查看',
            dataIndex: 'view',
            render: (text, record, index) => {
                return (
                    <Link to={ "/tags/" + record.id } style={{ textDecoration: 'none'}}>
                        <Button type="tertiary" block>查看</Button>
                    </Link>
                )
            }
        }
    ]

    const [ data, setData ] = React.useState([]);

    const [ name, setName ] = React.useState("");
    const [ hidden, setHidden ] = React.useState(false);

    const [ refresh, setRefresh ] = React.useState(false);

    const fetchTagList = () => {
        axios.get(process.env.REACT_APP_API_HOST + '/api/v1/tags').then( res => {
            setData(res.data)
        })
    }

    const submitTagAdd = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/tags/add', {
            tag: {
                name: name,
                hidden: hidden
            }
        }).then( res => {
            setRefresh(!refresh)
            setName("")
        })
    }

    React.useEffect(() => {
        fetchTagList()
    },[refresh])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid">
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Title style={{ margin: '8px 0' }} >TAG列表</Title>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col xs={24} xxl={12}>
                            <Row type={"flex"} justify={"end"}>
                                <Col span={12}>
                                    <Input value={name} placeholder={"TAG名"} onChange={(e) => setName(e)} />
                                </Col>
                                <Col span={6}>
                                    <Switch checkedText="显示" uncheckedText="隐藏" defaultChecked={true} onChange={(v) => setHidden(!v)}></Switch>
                                </Col>
                                <Col span={6}>
                                    <Button type="primary" onClick={submitTagAdd}>添加TAG</Button>
                                </Col>
                            </Row>
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