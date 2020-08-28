import React, { Component } from "react";
// layout组件
import LayoutAside from "./../components/aside";
import LayoutHeader from "./../components/header";
import ContainerMain from "../../components/containerMain/index";
// css
import "./layout.scss";
// antd
import { Layout } from 'antd';
import Aside from "./../components/aside";

const { Sider, Header, Content }  = Layout;
class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false
        };
    }

    componentDidMount(){
        const collapsed = JSON.parse(sessionStorage.getItem("collapsed"));
        this.setState({ collapsed });
    }

    toggleCollapsed = () => {
        const collapsed = !this.state.collapsed;
        this.setState({ collapsed });
        sessionStorage.setItem("collapsed", collapsed);
    }

    render(){
        return (
            <Layout className="layout-wrap">
               <Header className="header-layout">
                   <LayoutHeader toggle= {this.toggleCollapsed} collapsed={this.state.collapsed}></LayoutHeader>
                </Header> 
                <Layout>
                    <Sider width="250px" collapsed={this.state.collapsed}>
                        <Aside></Aside>
                    </Sider>
                    <Content className="layout-main">
                        <ContainerMain></ContainerMain>
                    </Content>
                </Layout>
            </Layout>
            // <Layout className="layout-wrap">
            //     <Header className="layout-header"><LayoutHeader /></Header>
            //     <Layout>
            //         <Sider width="250px" ><LayoutAside/></Sider>
            //         <Content className="layout-main">
            //             <ContainerMain />
            //         </Content>
            //     </Layout>
            // </Layout>
        )
    }
}

export default Index;