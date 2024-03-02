import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { myCartContext } from '../../Context/CartContext'
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';

export default function AllOrders() {
   
   useEffect(()=>{
    getAllOrders();
   }
   ,[])
    // function getAllOrders(){
    //     const owner=localStorage.getItem('owner')
    //     axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${owner}`)
    //     .then((res)=>{
    //    console.log('order',res.data);
    //     })
    //     .catch((err)=>{
    //     console.log('order err',err);
    //     })
    // }
const owner = localStorage.getItem( "owner" );
// console.log(owner);
    function getAllOrders(){
      return   axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${owner}`)
    }
 const {data,isLoading}  = useQuery('getAllOrders', getAllOrders)
 console.log('lalal',data?.data);
 if(isLoading){
 return   <Loading/>
 }
  return <>
  <div className="conatiner mt-60">
    <div className="row">
        {data?.data.map((order,idx)=> <div key={idx} className="col-md-6">
            <div className="order">
                <h6>price: 7000</h6>{order.paymentMethodType}
                <h6>payment method:{order.totalOrderPrice}</h6>
                <p>this oreder is delivered to {order.city} on phone number {order.phone} with details {order.details}</p>
            </div>
        </div>)}
        
    </div>
  </div>
  
  </>
}
