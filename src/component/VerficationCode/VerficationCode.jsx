import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function VerficationCode() {
    const nav = useNavigate()
    function code(){
      const data=  document.getElementById('code').value
      const otp=  {
            "resetCode":data
        }
        axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',otp)
        .then((res)=>{
            console.log(res.data.status);
          if(res.data.status==="Success"){
          nav('/ResetPassword')
          console.log('hello');
          }
        })
        .catch((err)=>{
         console.log('pass err',err);
        })
    }
  return <>
   <div className="w-50 mx-auto mt-90">
    <input className='form-control' type="text" name="code" id="code" placeholder='enter your code' />
  </div>
    <div className="d-flex justify-content-center align-items-center">
    <button onClick={code} className='btn btn-primary mt-4 w-70' >send</button>
    </div>
  </>
}
