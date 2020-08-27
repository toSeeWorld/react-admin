import React, { Component } from "react";
import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import data from './../../router'
import { NavLink, withRouter } from "react-router-dom";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

// asideMenu
// import AsideMenu from "../../../components/asideMneu/Index";

class Aside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: "",
            selectKeys: "",
            collapsed: true
        };
    }
    componentDidMount() {
        const { pathname } = this.props.location;
        const fpathname = pathname.split("/").slice(0, 3).join("/");

        this.setMenuState(fpathname, pathname);

    }
    setMenuState = (fpathname, pathname) => {
        this.setState(
            {
                openKeys: fpathname,
                selectKeys: pathname
            }
        )
    }
    openMenu = (keyPath) => {
        this.setMenuState(keyPath[1])
    }

    renderMenu = (ele) => {
        return <Menu.Item key={ele.key} >
            <NavLink to={ele.key}>
                <span>{ele.title}</span>
            </NavLink>
        </Menu.Item>
    }
    selectMenu = ({ key, keyPath }) => {
        this.setMenuState(keyPath[keyPath.length - 1], key);
    }
    renderSubMenu = (ele) => {
        return (
            <SubMenu key={ele.key} icon={<UserOutlined />} title={ele.title}>
                {ele.child.map((item) => {
                    return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                })}
            </SubMenu>
        )

    }

    render() {
        const { selectKeys, openKeys } = this.state
        return (
            // <AsideMenu  />
            <Menu
                mode="inline"
                defaultSelectedKeys={["/index"]}
                selectedKeys={[selectKeys]}
                openKeys={[openKeys]}
                onOpenChange={this.openMenu}
                onClick={this.selectMenu}
                
                style={{ height: '100%', borderRight: 0 }}
            >
                {
                    data.map((ele) => {
                        if (!ele.child || ele.child.length === 0) {
                            return this.renderMenu(ele)
                        }
                        else {
                            return this.renderSubMenu(ele)
                        }
                    })
                }

            </Menu>


        )
    }
}

export default withRouter(Aside);