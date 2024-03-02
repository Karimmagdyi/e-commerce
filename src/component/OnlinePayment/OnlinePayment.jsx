import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { myCartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function OnlinePayment() {
 const{cartId,cartItems}= useContext(myCartContext)
   const nav=useNavigate()
  const shipping=  {
    "shippingAddress":{
      details: "",
      phone: "",
      city: ""
    }
  }


  function onlinePayment(values){
    axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,shipping,{
      headers:{
        token:localStorage.getItem('tkn')
      }
    })
  .then((res)=>{
    toast.success('payment done successfully',{position:'top-center'})
   console.log(res.data);
   window.open(res.data.session.url,'_self')
  })
  .catch((err)=>{
// console.log(payment,'error');
toast.success('an error has occurred',{position:'top-center'})

  })
}


function mySubmit(values){
    onlinePayment(values)
  console.log('submit',values);
}
const myFormik= useFormik({
  initialValues:shipping,
  onSubmit: mySubmit
})

  return <>
  <div className="w-50 mt-60 mx-auto">
  <form onSubmit={myFormik.handleSubmit}>
    <label htmlFor="details"></label>
    <input onChange={myFormik.handleChange} value={myFormik.values.details} type="text" name='details' placeholder='details' id='details' className='form-control mb-2'/>

    <label htmlFor="phone"></label>
    <input onChange={myFormik.handleChange} value={myFormik.values.phone} type="number" name='phone' placeholder='phone' id='phone' className='form-control mb-2'/>

    <label htmlFor="city"></label>
    <input onChange={myFormik.handleChange} value={myFormik.values.city} type="text" name='city' placeholder='city' id='city' className='form-control mb-2'/>
  
    <button type='submit' className='btn btn-primary mt-3'>pay online</button>
  </form>
  </div>

  
  </>
}



