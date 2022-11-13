import React, {useRef} from 'react';
import Player from 'xgplayer'

import {Col, Row, Card, Divider, Button, Input} from '@douyinfe/semi-ui';

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

    let player

    const init = useRef(true)

    const fetchSeries = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/series/' + id).then( res => {
            setSeries(res.data.series)
            setImages(res.data.images)
            setEpisodes(res.data.episodes)
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
            fluid: true
        })
        player.on('play', function() {
            setInterval(() => {
                localStorage.setItem("nyavideo_" + id + "_" + episode, player.currentTime)
            }, 10000)
        })
    }

    React.useEffect(() => {
        fetchSeries()
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
                fluid: true
            })
        }
        init.current = false
    },[episode])

    const wrapStyle = {
        maxWidth: '2540px',
        minWidth: '1080px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
    }


    const leftStyle = {
        width: 'calc(100% - 400px)',
        minWidth: 600,
        maxWidth: "56vw"
    }

    const rightStyle = {
        width: '400px',
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
                            <Card bordered={false}><div id="vs"></div></Card>
                            <Text>{series.description}</Text>
                            <Divider margin='12px' align='center'>
                                剧集信息
                            </Divider>
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
                    </div>
                </div>
            </Content>
        </Layout>
    )

}