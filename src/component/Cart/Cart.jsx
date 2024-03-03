import React, { useContext, useEffect } from 'react'
import { myCartContext } from '../../Context/CartContext'
import Loading from '../Loading/Loading';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function Cart() {
 const{cartItems,allProducts,count,totalCart,updateCount,removeProduct,cartId}=useContext(myCartContext)
console.log(allProducts);




async function update(id,count){
 await updateCount(id,count)
if(updateCount){
toast.success('Updated successfully',{position:'bottom-left'})
}
else{
toast.error('an error has occured',{position:'bottom-left'})

}

}
async function removeFromCart(productId){
 await removeProduct(productId)
  if(removeProduct){
    toast.success("Removed Successfully",{position:"bottom-left"});
  }
  else{
    toast.error("an error has occured",{position:"bottom-left"});

  }
}

// function onlinePayment(){
//   axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,shipping,{
//     headers:{
//       token:localStorage.getItem('tkn')
//     }
//   })
//   .then((res)=>{
//    window.location.href = res.data.url;
//   })
//   .catch(()=>{

//   })
// }
{/* <h2>Shop Cart:</h2>
  <p className='text-main'>Total cart price : {totalCart}</p> */}
  if(!allProducts){
    return <Loading/>
  }
  return <>
<div className="container mt-60 cartItem">
 <div className="row">
  <div className="col-8">
<div className="details">
<h2>Shop Cart:</h2>
  <p className='text-main'>Total cart price : {totalCart}</p>
</div>
  </div>
  <div className="col-2">
<div className="icons d-flex flex-column">
   <Link to={'/Checkout'} >
   <i className="fa-solid fa-money-bill fa-xl ms-6"></i>
     <button className='btn btn-outline-primary'>Cash On Deliverey</button>
   </Link>
</div>
  </div>
  <div className="col-2">
    <div className="icon ms-4">
    <Link to={'/OnlinePayment'}>
    <i className="fa-solid fa-credit-card fa-lg ms-6"></i>
    <button className='btn btn-outline-primary'>Debit/Credit Card</button>
    </Link> 
    </div>
  </div>
 </div>
    {allProducts?.map((items,idx)=> <div key={idx} className="row wish-pro align-items-center">
    <div className="col-2">
    <figure>
      <img className='w-100' src={items?.product.imageCover} alt="" />
    </figure>
    </div>
    <div className="col-8">
     <p>{items?.product.title}</p>
     <p className='text-main'>price: {items?.price}</p>
     <button onClick={()=>{removeFromCart(items.product._id)}} className='btn btn-outline-danger'>Remove</button>
    </div>
    <div className="col-2">
     <div className='d-flex'>
     <button onClick={()=>{update(items.product._id,items.count + 1)}} className='btn btn-outline-success'>+</button>
     <span className='mx-2'>{items?.count}</span>
     <button disabled={items.count==1} onClick={()=>{update(items.product._id,items.count - 1)}} className='btn btn-outline-success'>-</button>
     </div>
    </div>
  </div> )}
  
</div>
    
</>
}
