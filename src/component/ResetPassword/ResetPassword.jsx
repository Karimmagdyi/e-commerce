import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const nav=useNavigate()
 function newPassword(){
  const email = document.getElementById('email').value;
  const password=document.getElementById('password').value;
const data=  {
    "email":email,
    "newPassword": password
}
  axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',data)
  .then((res)=>{
    console.log('tkn',res.data.token);
localStorage.setItem('tkn',res.data.token)
nav('/login')
  })
  .catch(()=>{

  })
 }

  return <>
   <div className="w-75 m-auto m-200">
   <label htmlFor="email">Email:</label>
    <input  type="email" id='email'  name='email' className='form-control mb-3' placeholder='email' />

    <label htmlFor="password">New password:</label>
    <input type="password" id='password'  name='password' className='form-control mb-3' placeholder='New password' />
    
        <button onClick={newPassword} type='submit' className='btn bg-main text-white rounded-3'>login</button>
        </div>
        
  </>
}
