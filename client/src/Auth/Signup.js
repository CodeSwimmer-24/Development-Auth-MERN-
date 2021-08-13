import React, { useState } from 'react'
import {Link , Redirect} from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

function Signup() {

    const [values, setVal] = useState({
        name:"",
        email:'',
        password:'',
        buttonText:'Submit'
    });
    const {name,email,password,buttonText} = values;
   const handleChange = () => {};
   const clickSubmit = () => {};

    const signupForm = () => (
        <form>
            <div className="form-group">
                <label className="text-muted">Name</label>
                <input onChange={handleChange('name')} values="name" type="text" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Email</label>
                <input onChange={handleChange('email')} values="email" type="email" className="form-control" />
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input onChange={handleChange('password')} type="password" values = "password" className="form-control" />
            </div>
            <div>
                <button className="btn btn-primary" onClick={clickSubmit}>
                    {buttonText}
                    </button>
            </div>
        </form>
    );

    return (
        <Navbar>
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
        <h1>SignUp</h1>
        {signupForm()}
                </div> 
        </Navbar>
    )
}

export default Signup
