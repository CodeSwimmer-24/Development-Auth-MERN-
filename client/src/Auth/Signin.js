import React, { useState } from 'react'
import {Link , Redirect} from "react-router-dom";
import axios from "axios";
import Navbar from '../components/Navbar';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

function Signin() {

    const [values, setValues] = useState({
      
        email:'',
        password:'',
        buttonText:'Submit'
    });
    const {email,password,buttonText} = values;
   const handleChange = name => event => {
   console.log(event.target.value);
   setValues({...values,[name]:event.target.value})

   };
   const clickSubmit = (event) => {
   event.preventDefault();
   setValues({...values,buttonText:'Submitting...'})
   axios({
       method:'POST',
       url: `${process.env.REACT_APP_API}/signin`,
       data:{email,password}
   })
   .then(response => {
       console.log('SIGNIN SUCESS',response);

    //    save the response (user,token) localstorage/cookie
       setValues({...values,email:'',password:'',buttonText:'Submitted'})
       toast.success('User signin sucessfully');
   })
   .catch(error => {
       console.log('SIGNIN ERROR',error.response.data)
       setValues({...values,buttonText:'Submit'})
       toast.error(error.response.data.error);
   })
   };

    const signInForm = () => (
        <form>
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
        <h1>SignIn</h1>
        {signInForm()}
                </div> 
        </Navbar>
    )
}

export default Signin
