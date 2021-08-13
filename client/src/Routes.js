import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom";
import App from "./App";
import Signup  from './Auth/Signup';
function Routes() {
    return (
       <BrowserRouter>
       <Switch>
           <Route path="/signUp" component={Signup}/>
           <Route path="/" component={App} />
           </Switch>
           </BrowserRouter>
    )
}


export default Routes
