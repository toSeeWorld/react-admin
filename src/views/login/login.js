import React,{Component} from 'react';
import {Button, Divider} from 'antd'
import './login.scss'
import { register } from '../../serviceWorker';
import  LoginForm from './LoginForm.js'
import RetisterForm  from './RetisterForm'
// import RetisterForm   from './RetisterForm'
export default class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formType:"login"
        }
    }
    switchForm = (value)=>{
        this.setState({
            formType:value
        })
    }
    render() {
        return(
            <div className="form-wrap">
                <div>
                    {this.state.formType==="login"?<LoginForm switchForm={this.switchForm}></LoginForm> 
                    :<RetisterForm switchForm={this.switchForm }></RetisterForm>}
                </div>

            </div>
        )
    }
}