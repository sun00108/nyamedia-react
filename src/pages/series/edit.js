import React from 'react';
import {Carousel, Typography, Space, Button, Transfer, Notification, Tag} from '@douyinfe/semi-ui';
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

export default function SeriesEdit() {

    const { id } = useParams();

    const [ reload, setReload ] = React.useState(false);

    const [ series, setSeries ] = React.useState({});
    const [ images, setImages ] = React.useState({});
    const [ relationships, setRelationships ] = React.useState([]);
    const [ episodes, setEpisodes ] = React.useState([]);

    const fetchSeries = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series/' + id).then( res => {
            setSeries(res.data.series)
            setImages(res.data.images)
            setEpisodes(res.data.episodes)
            setRelationships(res.data.relationships)
        })
    }

    const [ tags, setTags ] = React.useState([]); // tags 为系统内所有标签
    const [ taggings, setTaggings ] = React.useState([]); // taggings 为此剧集的标签关系
    const [ taggingsOld, setTaggingsOld ] = React.useState([]); // taggingsOld 为此剧集的旧标签关系

    const fetchTags = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/tags').then( res => {
            setTags(res.data)
        })
    }

    const fetchTaggings = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/taggings/' + id).then( res => {
            setTaggings(res.data.map(i => i.tag_id))
            setTaggingsOld(res.data.map(i => i.tag_id))
        })
    }

    const submitTaggingsUpdate = () => {
        axios.post( process.env.REACT_APP_API_HOST + '/api/v1/taggings/update', {
            series_id: id,
            taggings: taggings
        }).then( res => {
            Notification.open({
                title: 'TAG更新成功',
                content: 'TAG已更新成功',
                duration: 3,
            })
            setReload(!reload)
        })
    }

    React.useEffect(() => {
        fetchSeries()
    }, [])

    React.useEffect(() => {
        fetchTags()
        fetchTaggings()
    }, [reload])

    const { Header, Footer, Content } = Layout;
    const { Title, Paragraph, Text } = Typography;

    const roleMap = {
        "0": "原作",
        "1": "导演",
        "2": "脚本"
    }

    const tagData = tags.map((v) => {
        return {
            label: v.name,
            value: v.id,
            disabled: false,
            key: v.id
        };
    })

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div className="grid grid-flex">
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            {
                                images["poster"] ?
                                    <Card
                                        bordered={false}
                                        cover={<img src={process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + series.id + "/backdrop/" + images["backdrop"] + ".jpg"} />}>
                                    </Card>
                                    : <Card bordered={false}></Card>
                            }
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Title>{series.name_cn}</Title>
                            <Text>{series.name} - 第 {series.season} 季</Text>
                            <br />
                            <Text>{series.description}</Text>
                            <br />
                            {
                                relationships.map((relationship) => {
                                    return (
                                        <div>
                                            <Link to={"/staff/" + relationship.staff_id } style={{ textDecoration: 'none'}}>
                                                <Text>{roleMap[relationship.role]}: {relationship.staff_name}</Text>
                                                <br />
                                            </Link>
                                        </div>
                                    )
                                })
                            }
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            {
                                tagData.length > 0 ?
                                    <Space>
                                        {taggingsOld.map((tagging) => {
                                        return (
                                        <Tag>{tagData[tagging-1].label}</Tag>
                                        )
                                    })}
                                    </Space>
                                 : <div></div>
                            }
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
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Divider margin='12px' align='center'>
                                评论列表
                            </Divider>
                        </Col>
                    </Row>
                    <Row type={"flex"} justify={"center"}>
                        <Col md={12} xs={24}>
                            <Row>
                                <Col span={18}>
                                    {
                                       tagData.length > 0 ?
                                           <Transfer
                                               style={{ width: 568, height: 416 }}
                                               dataSource={tagData}
                                               defaultValue={taggings}
                                               onChange={(values, items) => {setTaggings(values)}}
                                           />
                                           : <div></div>
                                    }
                                </Col>
                                <Col span={6}>
                                    <Button onClick={submitTaggingsUpdate}>更新TAG列表</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    )
}