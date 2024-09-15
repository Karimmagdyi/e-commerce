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
  

  return <>
  <div className="col-12 mt-60">
    <div className='paymentContainer d-flex justify-content-end mt-3'>
   <Link to={'/Checkout'} >
     <button className='btn btn-success me-3'>Cash On Deliverey</button>
   </Link>

    <Link to={'/OnlinePayment'}>
    <button className='btn btn-success ms-3'>Debit/Credit Card</button>
    </Link> 

    </div>
  </div>
  <div className=''>
<div className="container mt-3">
 <div className="row gy-3">
  <div className="col-12">
<div className="details">
<h2>Shop Cart:</h2>
  <p className='text-main'>Total cart price : {totalCart}</p>
</div>
  </div>

    {allProducts?.map((items,idx)=><>   
      <div key={idx} className="col-12 col-md-6">
    <div className="d-flex justify-content-between">
      <div className='leftSide d-flex'>
    <figure>
      <img width={100} className='' src={items?.product.imageCover} alt="" />
    </figure>
    <div className="ps-3">
     <p>{items?.product.title}</p>
     <p className='text-main'>price: {items?.price}</p>
     <button onClick={()=>{removeFromCart(items.product._id)}} className='btn btn-outline-danger'>Remove</button>
    </div>
      </div>

      <div className='rightSide'>
    <div className="">
     <div className='d-flex justify-content-center'>
     <button onClick={()=>{update(items.product._id,items.count + 1)}} className='btn btn-outline-success'>+</button>
     <span className='mx-2'>{items?.count}</span>
     <button disabled={items.count==1} onClick={()=>{update(items.product._id,items.count - 1)}} className='btn btn-outline-success'>-</button>
     </div>
    </div>
      </div>
    </div>
  <div className='row pt-2'>
  </div>
  </div>
    </>
)}
 </div>

</div>

  
</div>
  {/* </div> */}

    
</>
}
