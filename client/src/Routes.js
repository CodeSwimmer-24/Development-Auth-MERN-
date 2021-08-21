import React from 'react'
import {BrowserRouter,Switch,Route} from "react-router-dom";
import App from "./App";
import Signup  from './Auth/Signup';
import Signin from './Auth/Signin';
import Activate from "./Auth/Activate";
function Routes() {
    return (
       <BrowserRouter>
       <Switch>
           <Route path="/signUp" component={Signup}/>
           <Route path="/signIn" component={Signin} />
           <Route path="/auth/activate/:token" component={Activate} />
           <Route path="/" component={App} />
           </Switch>
           </BrowserRouter>
    )
}


export default Routes
