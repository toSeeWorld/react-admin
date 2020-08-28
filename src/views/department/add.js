import React, { Component } from 'react';
import { Form, Button, Input, InputNumber, Radio, message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import DepartmentAdd from "../../api/department/add"
export default class Add extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading:false,
        }
    }
    onSubmit = (value)=>{
        this.setState(
            {
                loading:true
            }
        )
        DepartmentAdd(value).then((rep)=>{
            this.setState({
                loading:false
            })
            const data = rep.data;
            this.addform.resetFields();
            message.success("提交成功！");
        }).catch((reason)=>{
            this.setState(
                {
                    loading:false
                }
            )
        })

    }
    render() {
        return (
            <Form ref= {form=>this.addform = form} labelCol={{span:2}} initialValues={{status:false,number:0}} onFinish={this.onSubmit}>
                <Form.Item name="name" required={true} label="部门名称">
                    <Input />
                </Form.Item>

                <Form.Item name="number" required={true} label="部门人数">
                    <InputNumber min={0} max={100} />
                </Form.Item>
                <Form.Item name="status" label="待禁用" >
                    <Radio.Group >
                        <Radio value={true}>启用</Radio>
                        <Radio value={false}>禁用</Radio>
                    </Radio.Group>
                </Form.Item>
                <Form.Item name="content" label="描述">
                    <TextArea />
                </Form.Item>
                <Form.Item  >
                    <Button type="primary" htmlType="submit" loading={this.state.loading}> 
                        提交
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}