import React, { useState } from 'react'
import {Link , Redirect} from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

function Signup() {

    const [values, setValues] = useState({
        name:"",
        email:'',
        password:'',
        buttonText:'Submit'
    });
    const {name,email,password,buttonText} = values;
   const handleChange = name => event => {
   console.log(event.target.value);
   setValues({...values,[name]:event.target.value})

   };
   const clickSubmit = (event) => {
   event.preventDefault();
   setValues({...values,buttonText:'Submitting...'})
   axios({
       method:'POST',
       url: `${process.env.REACT_APP_API}/signup`,
       data:{name,email,password}
   })
   .then(response => {
       console.log('SIGNUP SUCESS',response)
       setValues({...values,name: '',email:'',password:'',buttonText:'Submitted'})
       toast.success('User signup sucessfully');
   })
   .catch(error => {
       console.log('SIGNUP ERROR',error.response.data)
       setValues({...values,buttonText:'Submit'})
       toast.error(error.response.data.error);
   })
   };

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
                <button className="btn btn-primary mt-3" onClick={clickSubmit}>
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
