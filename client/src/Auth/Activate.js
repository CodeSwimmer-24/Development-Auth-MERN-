import React, { useEffect, useState } from 'react'
import {Link , Redirect} from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import Navbar from '../components/Navbar';
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

function Activate() {

    const [values, setValues] = useState({
        name:"",
        token:'',
        show:true,
    });

    useEffect(() => {
        // let token = match.params.token;
        let {name} = jwt.decode(token)
        if(token){
            setValues({...values,name,token})
        }
        console.log(token);
    },[])

    const {name,token,show} = values;

   const clickSubmit = (event) => {
   event.preventDefault();
   setValues({...values,buttonText:'Submitting...'})
   axios({
       method:'POST',
       url: `${process.env.REACT_APP_API}/signup`,
       data:{token}
   })
   .then(response => {
       console.log('SIGNUP SUCESS',response)
       setValues({...values,buttonText:'Submitted'})
       toast.success('User signup sucessfully');
   })
   .catch(error => {
       console.log('SIGNUP ERROR',error.response.data)
       setValues({...values,buttonText:'Submit'})
       toast.error(error.response.data.error);
   })
   };

const activationLink = () => (
    <div>
    <h1 className="p-5 text-center">Hey {name}, Ready to activae your account? </h1>
    <button className="btn btn-outline-primary" onClick={clickSubmit}>
        Activate Account
    </button>
    </div>
)

    return (
        <Navbar>
            <div className="col-md-6 offset-md-3">
            <ToastContainer />
        {activationLink()}
                </div> 
        </Navbar>
    )
}

export default Activate
