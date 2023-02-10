import React, {useRef} from 'react';
import Player from 'xgplayer'

import {Col, Row, Card, Divider, Button, Input, Space, Tag} from '@douyinfe/semi-ui';

import axios from 'axios';

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useUpdateEffect } from 'usehooks-ts'

import {Layout, Nav, Typography} from '@douyinfe/semi-ui';

import AppHeader from "../../components/header";

export default function SeriesPlay() {

    const { id, episode } = useParams();

    const { Header, Footer, Content } = Layout;
    const { Title, Paragraph, Text } = Typography;

    const [ seriesSimilar, setSeriesSimilar ] = React.useState([]);

    const [ series, setSeries ] = React.useState({});
    const [ episodes, setEpisodes ] = React.useState({});

    const fetchSeries = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series/' + id).then( res => {
            setSeries(res.data.data.series)
            setEpisodes(res.data.data.episodes)
            setVideoId(res.data.data.episodes[episode])
        })
    }

    const [ videoId, setVideoId ] = React.useState(0)
    const [ video, setVideo ] = React.useState({})

    const fetchVideo = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/videos/' + videoId ).then( res => {
            if (res.data.code == 0) {
                setVideo(res.data.data)
            }
        })
    }

    useUpdateEffect(() => {
        console.log("videoId 变了 " + videoId + "，fetchVideo() ")
        fetchVideo()
    }, [videoId])

    const fetchSeriesSimilar = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/taggings/match?series_id=' + id).then( res => {
            setSeriesSimilar(res.data.data)
        })
    }

    let player = new Player({
        id: 'vs',
        url: '',
        fluid: true
    })

    React.useEffect(() => {
        fetchSeries()
        //fetchSeriesSimilar()
    },[])

    useUpdateEffect(() => {
        console.log("老板，换碟到 videoID " + video.video.id + "!")
        player.src = ""
        player.destroy()
        let subtitle = null
        if (Object.keys(video.subtitle).length > 0) {
            subtitle = [ { src: process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + id + "/subtitle/" + video.subtitle["zh-CN"], label: '中文简体', srclang: "zh", kind: 'subtitles', default: true } ]
            console.log("这个碟里有字幕，字幕内容：", video.subtitle['zh-CN'])
        }
        player = new Player({
            id: 'vs',
            url: process.env.REACT_APP_MINIO_HOST + "/nyamedia/series/" + id + "/video/" + video.video.video_hash,
            lastPlayTime: localStorage.getItem("nyavideo_" + id + "_" + episode) != null ? localStorage.getItem("nyavideo_" + id + "_" + episode) : 0,
            textTrack: subtitle,
            playsinline: true,
            fluid: true,
            screenShot: {
                saveImg: true,
                quality: 0.92,
                type: 'image/png',
                format: '.png'
            }
        })
        window.addEventListener('keydown', (event) => {
            if (event.key === 'o') {
                Player.util.addClass(player.root, 'xgplayer-pause')
            } else if (event.key === 'p') {
                Player.util.removeClass(player.root, 'xgplayer-pause')
            } else {
                console.log(event.key)
            }
        })
    },[video])

    useUpdateEffect(() => {
        setVideoId(episodes[episode])
    }, [episode])

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
                                <Text>{series.name}</Text>
                            </Card>
                            <div id="vs"></div>
                            <Text>{series.description}</Text>
                            <Divider margin='12px' align='center'>
                                剧集信息
                            </Divider>
                            {/*<Card bordered={false}>
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
                            </Card>*/}
                        </div>
                    </div>
                    <div style={rightStyle}>
                        <Card bordered={false}>
                            <Divider margin='12px' align='center'>
                                播放列表
                            </Divider>
                            <Row gutter={[16, 16]}>
                                {
                                    Object.keys(episodes).map((item) => {
                                        return (
                                            <Col span={6}>
                                                <Link to={"/series/" + id + "/play/" + item} style={{ textDecoration: 'none'}}>
                                                    {
                                                        item == episode ? (
                                                            <Button block>{item}</Button>
                                                        ) : (
                                                            <Button type="tertiary" block>{item}</Button>
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
