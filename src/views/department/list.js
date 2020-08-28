import React, { Component, Fragment } from 'react';
import { Button, Form, Input, Table, Switch, message } from 'antd';
import { load, select } from 'react-cookies';
import { GetLists,DeleteList} from "../../api/department/add";
import './departmentStyle.scss'

const { Search } = Input;
export default class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            selectedKeys:[],
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
                    render:(status)=>{
                     return   <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked={status==="1"?true:false} />
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
                    render:(options,data)=>{
                        return (
                            <div className="departmentButton">
                                <Button type="primary">编辑</Button>
                                <Button onClick={()=>(this.delete(data.id))}>删除</Button>
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
    delete = (id)=>{
        DeleteList({id}).then((rep)=>{
            message.success("删除成功！");
        }).catch((reason)=>{
            message.warning("删除错误！")
        })
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
        }).catch((reason)=>{
            console.log(reason);
        })
    }
    storeSelectedKeys = (selectedKeys) =>{
       this.setState(
           {selectedKeys:selectedKeys}
       )
    }
    test = ()=>{
        console.log(this.state.selectedKeys);
    }
    render() {
        const { columns, data } = this.state;
        const rowSelection = {
            onChange:this.storeSelectedKeys,
            onSelect:this.test
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
                
                <Table className="table_department" rowKey="id" rowSelection={ rowSelection} columns={columns} dataSource={data} bordered>

                </Table>
            </Fragment>
        )
    }
}