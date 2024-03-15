import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as yup from'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {
  const navigate=useNavigate()
   let[response,setResponse]=useState()
  function userInfo(userData){
    let {data}= axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
    .then((response)=>{
     console.log(response.data.message);
     setResponse(response.data.message);
     navigate('/login')
    })
   .catch((response)=>{
    console.log(response.response.data.message);
    setResponse(response.response.data.message)
   })
    // console.log(response.data.message);
  }

  

  const mySchema= yup.object({
    name:yup.string().min(3,'must be more than 3 characters').max(10,"must be less than 10 characters").required('name is required') ,
    email:yup.string().email('email must be in format').required(),
    phone:yup.string().matches(/^01[0125][0-9]{8}$/,'must be an egyptian number').required(),
    password:yup.string().min(6,'must be more than 6 characters').max(12,'must be less than 12 characters').required(),
    rePassword:yup.string().required().oneOf([yup.ref('password')],'must match with password'),
  })


  const userData={
    name:'',
    email:'',
    phone:'',
    password:'',
    rePassword:'',
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
  
  <div className="w-75 m-auto mt-5">
    <form onSubmit={myFormik.handleSubmit}>

    <label className='mt-5' htmlFor="name">Name:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.name} type="text" name='name' className='form-control mb-3 mt-2' placeholder='Name' />
     {myFormik.errors.name && myFormik.touched.name ? <div className="alert alert-danger">{myFormik.errors.name}</div> : ''}

    <label htmlFor="email">Email:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.email} type="email"  name='email' className='form-control mb-3' placeholder='email' />
    {myFormik.errors.email && myFormik.touched.email ? <div className="alert alert-danger">{myFormik.errors.email}</div> : ''}

    <label htmlFor="phone">phone:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.phone} type="text"  name='phone' className='form-control mb-3' placeholder='phone' />
     {myFormik.errors.phone && myFormik.touched.phone ? <div className="alert alert-danger">{myFormik.errors.phone}</div> : ''} 

    <label htmlFor="password">password:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.password} type="password"  name='password' className='form-control mb-3' placeholder='password' />
     {myFormik.errors.password && myFormik.touched.password ? <div className="alert alert-danger">{myFormik.errors.password}</div> : ''} 

    <label htmlFor="rePassword">rePassword:</label>
    <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} value={myFormik.values.rePassword} type="password"  name='rePassword' className='form-control mb-3' placeholder='rePassword' />
     {myFormik.errors.rePassword && myFormik.touched.rePassword ? <div className="alert alert-danger">{myFormik.errors.rePassword}</div> : ''} 
     <div className='d-flex justify-content-center'><span className='text-danger'>{response}</span></div>
        <button type='submit' className='btn bg-main text-white rounded-3'>register</button>
    </form>
  </div>
    
  
  </>
  
}

