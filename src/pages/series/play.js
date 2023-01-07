import React, {useRef} from 'react';
import Player from 'xgplayer'
import '../../libs/playerVideoToGif.js'

import {Col, Row, Card, Divider, Button, Input, Space, Tag} from '@douyinfe/semi-ui';

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
    const [ seriesSimilar, setSeriesSimilar ] = React.useState([]);

    const [ tags, setTags ] = React.useState([]); // tags 为系统内所有标签
    const [ taggings, setTaggings ] = React.useState([]); // taggings 为此剧集的标签关系

    let player

    const init = useRef(true)

    const fetchSeries = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series/' + id).then( res => {
            setSeries(res.data.series)
            setImages(res.data.images)
            setEpisodes(res.data.episodes)
        })
    }

    const fetchTags = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/tags').then( res => {
            setTags(res.data)
        })
    }

    const fetchTaggings = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/taggings/' + id).then( res => {
            setTaggings(res.data)
        })
    }

    const tagData = tags.map((v) => {
        return {
            label: v.name,
            value: v.id,
            disabled: false,
            key: v.id
        };
    })

    const fetchSeriesSimilar = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/taggings/match?series_id=' + id).then( res => {
            setSeriesSimilar(res.data.data)
        })
    }

    if (episodes.length > 0) {
        //console.log(process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + id + "/video/" + episodes[episode-1].video_hash)
        let subtitle = null
        if (episodes[episode-1].subtitle != null) {
            subtitle = [ { src: process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + id + "/subtitle/" + episodes[episode-1].subtitle.zh_CN_hash, label: '中文简体', srclang: "zh", kind: 'subtitles', default: true } ]
        }
        player = new Player({
            id: 'vs',
            url: process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + id + "/video/" + episodes[episode-1].video_hash,
            lastPlayTime: localStorage.getItem("nyavideo_" + id + "_" + episode) != null ? localStorage.getItem("nyavideo_" + id + "_" + episode) : 0,
            textTrack: subtitle,
            playsinline: true,
            fluid: true,
            screenShot: {
                saveImg: true,
                quality: 0.92,
                type: 'image/png',
                format: '.png'
            },
            playerVideoToGif: true
        })
        player.on('play', function() {
            setInterval(() => {
                localStorage.setItem("nyavideo_" + id + "_" + episode, player.currentTime)
            }, 10000)
        })
    }

    React.useEffect(() => {
        fetchSeries()
        fetchSeriesSimilar()
        fetchTags()
        fetchTaggings()
    },[])

    React.useEffect(() => {
        if (!init.current) {
            console.log("episode changed")
            player.src = ""
            player.destroy()
            let subtitle = null
            if (episodes[episode-1].subtitle != null) {
                subtitle = [ { src: process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + id + "/subtitle/" + episodes[episode-1].subtitle.zh_CN_hash, label: '中文简体', srclang: "zh", kind: 'subtitles', default: true } ]
            }
            player = new Player({
                id: 'vs',
                url: process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + id + "/video/" + episodes[episode-1].video_hash,
                lastPlayTime: localStorage.getItem("nyavideo_" + id + "_" + episode) != null ? localStorage.getItem("nyavideo_" + id + "_" + episode) : 0,
                textTrack: subtitle,
                playsinline: true,
                fluid: true,
                screenShot: {
                    saveImg: true,
                    quality: 0.92,
                    type: 'image/png',
                    format: '.png'
                },
                playerVideoToGif: true
            })
        }
        init.current = false
    },[episode])

    // 减去滚动条宽度，虽然不准确，但是能用
    const width = window.innerWidth - 17

    const wrapStyle = {
        maxWidth: '2540px',
        minWidth: width > 820? '1080px' : width,
        margin: '0 auto',
        display: 'flex',
        flexDirection: width > 1080 ? 'row' : 'column',
        justifyContent: 'center',
        position: 'relative',
    }


    const leftStyle = {
        width: width > 820 ? 'calc(100% - 400px)' : width,
        minWidth: width > 820 ? 600 : width,
        maxWidth: "56vw"
    }

    const rightStyle = {
        width: width > 820 ? '400px' : width,
        flex: 'none',
        position: 'relative'
    }

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                <div style={wrapStyle}>
                    <div style={leftStyle}>
                        <div className={"grid grid-flex"}>
                            <Card bordered={false}>
                                <Title>{series.name_cn}</Title>
                                <Text>{series.name} - 第 {series.season} 季</Text>
                            </Card>
                            <div id="vs"></div>
                            <Text>{series.description}</Text>
                            <Divider margin='12px' align='center'>
                                剧集信息
                            </Divider>
                            <Card bordered={false}>
                                {
                                    tagData.length > 0 ?
                                        <Space>
                                            {taggings.map((item) => {
                                                return (
                                                    <Tag>{tagData[item.tag_id - 1].label} - {item.weight}</Tag>
                                                )
                                            })}
                                        </Space>
                                        : <div></div>
                                }
                            </Card>
                        </div>
                    </div>
                    <div style={rightStyle}>
                        <Card bordered={false}>
                            <Divider margin='12px' align='center'>
                                播放列表
                            </Divider>
                            <Row gutter={[16, 16]}>
                                {
                                    episodes.map((item) => {
                                        return (
                                            <Col span={6}>
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
                            <Divider margin='12px' align='center'>
                            </Divider>
                        </Card>
                        <Card bordered={false}>
                            <Divider margin='12px' align='center'>
                                相关剧集
                            </Divider>
                            {
                                seriesSimilar.map((item) => {
                                    return (
                                        <Link to={"/series/" + item.series_id} style={{ textDecoration: 'none'}}>
                                            <Card>
                                                <Text>{item.series_name_cn} - 第 {item.series_season} 季</Text>
                                            </Card>
                                            <br />
                                        </Link>
                                    )
                                })
                            }
                            <Divider margin='12px' align='center'>
                            </Divider>
                        </Card>
                    </div>
                </div>
            </Content>
        </Layout>
    )

}