import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PrivateRouter from '../../views/components/privateRouter';
import User from '../../views/user/add';
import Components from './components'
class ContainerMain extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    render() {
        return (
                <Switch>
                    {
                        Components.map((ele,i)=>{
                            return   <PrivateRouter key={ele.path} exact path={ele.path} component= {ele.component} ></PrivateRouter>
                        })
                    }
                  
                    
                </Switch>

        )
    }
}
export default ContainerMain;