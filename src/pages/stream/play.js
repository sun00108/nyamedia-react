import React, {useRef} from 'react';
import Player from 'xgplayer'
import HlsJsPlayer from 'xgplayer-hls.js';

import {Col, Row, Card, Divider, Button, Input, Space, Tag} from '@douyinfe/semi-ui';

import axios from 'axios';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {Layout, Nav, Typography} from '@douyinfe/semi-ui';

import AppHeader from "../../components/header";

export default function StreamPlay() {

    const { id } = useParams();

    const { Header, Footer, Content } = Layout;
    const { Title, Paragraph, Text } = Typography;

    const [ stream, setStream ] = React.useState({})

    let player = new HlsJsPlayer({
        id: 'vs',
        url: stream.link,
        isLive: true,
        cors: true
    })

    const fetchStream = () => {
        axios.get( process.env.REACT_APP_API_HOST + '/api/v1/streams/' + id).then( res => {
            setStream(res.data)
        })
    }

    React.useEffect(() => {
        fetchStream()
    },[])


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
                                <Title>{stream.name}</Title>
                            </Card>
                            <div id="vs"></div>
                        </div>
                    </div>
                    <div style={rightStyle}>
                        <Card bordered={false}>
                            <Divider margin='12px' align='center'>
                                相关直播
                            </Divider>
                            <Divider margin='12px' align='center'>
                            </Divider>
                        </Card>
                    </div>
                </div>
            </Content>
        </Layout>
    )

}