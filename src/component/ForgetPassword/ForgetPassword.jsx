import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function ForgetPassword() {
 const nav=useNavigate()
function forget(){
    const data=  document.getElementById('email').value
    const email=  {
        "email":data
    }
axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',email)
.then((res)=>{
   console.log('forget',res.data.statusMsg);
   if(res.data.statusMsg==="success"){
    nav('/VerficationCode')
   }
})
.catch(()=>{
    
})
}

  return <>
  
  <div className="w-50 mx-auto mt-90">
    <input className='form-control' type="email" name="email" id="email" placeholder='enter your email' />
  </div>
    <div className="d-flex justify-content-center align-items-center">
    <button className='btn btn-primary mt-4 w-70' onClick={forget}>send</button>
    </div>
  </>
}
