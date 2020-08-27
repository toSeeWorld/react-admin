import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
// 方法
import { getToken } from "../../utils/session";
// const PrivateRouter = ({ component: Component, ...rest }) => {//?
//     // console.log({Component});
//     return (
//       <Route {...rest} render={routeProps => (
//         getToken() ? <Component {...routeProps} /> : <Redirect to="/" />
//       )} />
//     );
// }
const PrivateRouter = ({component:Com,...rest})=>{
  return(

     <Route {...rest} render= {props=>(
      getToken()?<Com {...props} />:<Redirect to="/"/> 
     )} />
  )
}
export default PrivateRouter;

