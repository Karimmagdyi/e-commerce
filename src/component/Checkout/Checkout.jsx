import axios from 'axios'
import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { myCartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function Checkout() {
 const{cartId,cartItems}= useContext(myCartContext)
   const nav=useNavigate()
 


function payWithCash(){
  const details= document.getElementById('details').value
  const phone= document.getElementById('phone').value
 const city=  document.getElementById('city').value
  const shipping= {
    "shippingAddress":{
      details,
      phone,
      city,
    }
  }
  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{shipping},{
    headers:{
      token:localStorage.getItem('tkn')
    }
  })
  .then((res)=>{
    toast.success('payment done successfully',{position:'top-center'})
    cartItems()
    nav('/home')
  })
  .catch((err)=>{
toast.success('an error has occurred',{position:'top-center'})

  })
}


  return <>
  <div className="w-50 mt-60 mx-auto">
 
    <label htmlFor="details"></label>
    <input type="text" name='details' placeholder='details' id='details' className='form-control mb-2'/>

    <label htmlFor="phone"></label>
    <input  type="number" name='phone' placeholder='phone' id='phone' className='form-control mb-2'/>

    <label htmlFor="city"></label>
    <input type="text" name='city' placeholder='city' id='city' className='form-control mb-2'/>
  
    <button onClick={payWithCash} type='submit' className='btn btn-primary mt-3'>pay with cash</button>
  
 
  </div>

  
  </>
}
