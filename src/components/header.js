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
                    <Nav.Item link={"/"} itemKey="Home" text="首页" icon={<IconHome size="large" />} />
                    <Nav.Item link={"/series"} itemKey="Live" text="剧集列表" icon={<IconLive size="large" />} />
                    <Nav.Item link={"/wishlist"} text="想看" icon={<IconSetting size="large" />} />
                </Nav>
            </div>
        </Header>
    )

}