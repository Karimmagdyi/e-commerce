import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import * as yup from'yup'
import axios from 'axios'

import { mycontext } from '../../Context/Context'
import { Link, useNavigate } from 'react-router-dom'


export default function Login() {
 const {setToken,token}= useContext(mycontext)
     const navigate= useNavigate()
   let[response,setResponse]=useState()
  function userInfo(userData){
    let {data}= axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',userData)
    .then((response)=>{
        navigate('/home')
        localStorage.setItem('tkn',response.data.token)
        setResponse(response.data.message)
        setToken(response.data.token)
        console.log(token);
    })
   .catch((response)=>{
    setResponse(response.response.data.message)
   })
  }

  const mySchema= yup.object({
    email:yup.string().email('email must be in format').required(),
    password:yup.string().min(6,'must be more than 6 characters').max(12,'must be less than 12 characters').required(),
  })


  const userData={
    email:'',
    password:'',
    
    }

    function mySubmit(values){
         userInfo(values)
         console.log(values);
    }
  const myFormik= useFormik({

    initialValues:userData,
    onSubmit:mySubmit,
    validationSchema:mySchema
  })



  return <>
  
  <div className="w-75 m-auto m-200">
    <form onSubmit={myFormik.handleSubmit}>

    <label htmlFor="email">Email:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email"  name='email' className='form-control mb-3' placeholder='email' />
    {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ''}

    <label htmlFor="password">password:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password"  name='password' className='form-control mb-3' placeholder='password' />
     {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ''} 

     <div className='d-flex justify-content-center'><span className='text-danger'>{response}</span></div>
    <div className="d-flex justify-content-between">
        <button type='submit' className='btn bg-main text-white rounded-3'>login</button>
     <Link to={'/ForgetPassword'}>
     <p role='button'>forget password?</p>
     </Link>
    </div>
    </form>
  </div>
    
  
  </>
  
}
