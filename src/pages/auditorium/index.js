import {Card, Col, Layout, Nav, Row, Button, Table} from "@douyinfe/semi-ui";
import { Carousel, Typography, Space } from '@douyinfe/semi-ui';
import { Divider } from '@douyinfe/semi-ui';
import React from "react";
import AppHeader from "../../components/header";
import {Link} from "react-router-dom";

import axios from "axios";

export default function AuditoriumList() {

    const { Header, Footer, Content } = Layout;

    return (
        <Layout className="components-layout-demo">
            <AppHeader />
            <Content>
                AuditoriumList // 施工中
            </Content>
            <Footer></Footer>
        </Layout>
    )

}