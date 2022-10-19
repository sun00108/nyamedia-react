import {Layout, Nav} from "@douyinfe/semi-ui";
import {IconHome, IconLive, IconSemiLogo, IconSetting} from "@douyinfe/semi-icons";
import React from "react";

export default function AppHeader() {

    const { Header, Footer, Content } = Layout;

    return (
        <Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
            <div>
                <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
                    <Nav.Header>
                        <IconSemiLogo style={{ fontSize: 36 }} />
                    </Nav.Header>
                    <Nav.Item itemKey="Home" text="首页" icon={<IconHome size="large" />} />
                    <Nav.Item itemKey="Live" text="直播" icon={<IconLive size="large" />} />
                    <Nav.Item itemKey="Setting" text="设置" icon={<IconSetting size="large" />} />
                </Nav>
            </div>
        </Header>
    )

}