import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Table, Switch, message ,Modal,Pagination} from 'antd';
import { load, select } from 'react-cookies';
import {NavLink} from 'react-router-dom';
import { GetLists, DeleteList,SetStatus} from "../../api/department/add";
import './departmentStyle.scss'

const { Search } = Input;
export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            selectedKeys: [],
            visible:false,
            confirmLoading:false,
            id:"",
            columns: [
                {
                    title: "部门名称",
                    dataIndex: "name",
                    key: "name"
                },
                {
                    title: "禁启用",
                    dataIndex: "status",
                    key: "status",
                    render: (status,obj) => {
                        return <Switch checkedChildren="启用"  onChange={()=>{this.setStatus(obj)}}
                        unCheckedChildren="禁用" defaultChecked={status === "1" ? true : false} />
                    }


                },
                {
                    title: "人数",
                    dataIndex: "number",
                    key: "number"
                },
                {
                    title: "操作",
                    dataIndex: "options",
                    key: "options",
                    render: (options, data) => {
                        return (
                            <div className="departmentButton">
                                <Button type="primary">
                                <NavLink to={{pathname:"/index/department/add",state:{obj:data}}} >编辑</NavLink>

                                </Button>
                                <Button onClick={() => (this.handleDelete(data.id))}>删除</Button>
                            </div>
                        )
                    }

                }
            ],
            data: []
        }
    }
    componentDidMount() {
        const { pageNumber, pageSize } = this.state;
        const requestData = {
            pageNumber: pageNumber,
            pageSize: pageSize,
        }
        this.loadData(requestData)
    }
    setStatus = (obj)=>{
        console.log(obj);
        let status = {
            id:obj.id,
            status:obj.status === "1"?false:true
        }
        SetStatus(status);
        // console.log(status);

    }
    // componentWillUpdate(){
    //     console.log("update");
    //     const { pageNumber, pageSize } = this.state;
    //     const requestData = {
    //         pageNumber: pageNumber,
    //         pageSize: pageSize,
    //     }
    //     this.loadData(requestData)
    // }
    delete = (id) => {
        if(!id) return false;
        DeleteList({ id }).then((rep) => {
            message.success("删除成功！");
            this.setState({id:"",visible:false})
            this.componentDidMount();

        }).catch((reason) => {
            message.warning("删除错误！")
        })
        this.setState({confirmLoading:false})
    }
    onSearch = (value) => {
        const { pageNumber, pageSize } = this.state;
        const requestData = {
            pageNumber: pageNumber,
            pageSize: pageSize,
            name: value.name
        }
        this.loadData(requestData);
        this.searchForm.resetFields();
    }
    loadData = (requestData) => {
        GetLists(requestData).then((rep) => {
            const result = rep.data.data;
            this.setState(
                {
                    data: result.data
                }
            )
        }).catch((reason) => {
            console.log(reason);
        })
    }
    storeSelectedKeys = (selectedKeys) => {
        this.setState(
            { selectedKeys: selectedKeys }
        )
    }
    handleDelete = (id)=>{
        this.setState({
            visible:true,
            id:id
        })
    }
    handleOk = ()=> {
        this.setState({
            confirmLoading:true,

        })
        const {selectedKeys} = this.state
        if(this.state.id) {
            this.delete(this.state.id);
            this.setState({id:""})
        }
        else {
            this.delete(selectedKeys.join())
        }
        this.setState({confirmLoading:false})
    }
    handleCancel = ()=>{
        this.setState({visible:false,id:""})
    }
    render() {
        const { columns, data } = this.state;
        const rowSelection = {
            onChange: this.storeSelectedKeys,
        }
        return (
            <Fragment>
                <Form onFinish={this.onSearch} ref={form => this.searchForm = form} layout="inline">
                    <Form.Item label="部门名称" name="name">
                        <Input placeholder="搜索部门" />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">搜索</Button>
                    </Form.Item>
                </Form>

                <Table pagination={false} className="table_department" rowKey="id" rowSelection={rowSelection} columns={columns} dataSource={data} bordered>

                </Table>
                <Modal
                    title="删除确认"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    confirmLoading={this.state.confirmLoading}
                >
                    <p>删除后无法恢复</p>
                </Modal>
                <Button type="primary" onClick={()=>{this.handleDelete()}}>批量删除</Button>
                <Pagination total={100}></Pagination>
            </Fragment>
        )
    }
}