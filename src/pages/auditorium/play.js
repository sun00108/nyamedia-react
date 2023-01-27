import React, {useRef} from 'react';
import Player from 'xgplayer'
import '../../libs/playerVideoToGif.js'

import {Col, Row, Card, Divider, Button, Input, Space, Tag} from '@douyinfe/semi-ui';

import axios from 'axios';
import io, { Socket } from 'socket.io-client';

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {Layout, Nav, Typography} from '@douyinfe/semi-ui';

import AppHeader from "../../components/header";

export default function AuditoriumPlay() {

    const { id } = useParams();
    const { Header, Footer, Content } = Layout;

    let player

    const init = useRef(true)

    const [ video, setVideo ] = React.useState({});
    const [ username, setUsername ] = React.useState("");
    const [ message, setMessage ] = React.useState("");

    const socket = io(process.env.REACT_APP_SOCKET_HOST);

    if (socket) {
        // 放映室当前信息 - 初始化时使用
        socket.on('auditorium_guest_info', function(data) {
            console.log('放映室初始化成功：', data);
            setVideo(data)
        })

        // 放映室数据同步 - 房主操作时使用（播放 / 暂停 / 跳转时间）
        socket.on('auditorium_guest_sync', function(data) {
            console.log("房主操作同步：")
            console.log(data)
        })

        // 放映室聊天框 - 所有人均可向服务器发送
        socket.on('auditorium_guest_chat', function(data) {
            console.log("房间内聊天：")
            console.log(data)
        })

        // 放映室视频切换 - 房主操作时使用
        socket.on('auditorium_guest_switch', function(data) {
            console.log("房主切换了视频：")
            console.log(data)
        })
    }

    const fetchAuditoriumInfo = () => {
        console.log("放映室初始化 - 加入 ROOM " + id)
        socket.emit('auditorium_guest_join', {roomID: id});
    }

    const submitAuditoriumChat = () => {
        console.log("发送聊天信息")
        if (username === "") {
            alert("请输入用户名")
            return
        }
        socket.emit('auditorium_host_chat', {
            username: username,
            message: message
        })
    }

    React.useEffect(() => {
        // 放映室初始化 - 获取当前放映室信息 & 加入 RoomID
        fetchAuditoriumInfo()
    },[])

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                AUDITORIUM PLAY
            </Content>
        </Layout>
    )

}