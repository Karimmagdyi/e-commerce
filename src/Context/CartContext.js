import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { mycontext } from './Context'
import { useQuery } from 'react-query'

export  const myCartContext= createContext()

export function CartContext({children}) {
  const [allProducts, setAllProducts] = useState(null)
 const [totalCart, setTotalCart] = useState(null)
 const [cartId, setCartId] = useState(null)
 const [count, setCount] = useState(0)
 const [owner, setOwner] = useState(null)
const{token}=useContext(mycontext)
  async  function getCartProduct(productId){
    const data= await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{productId},
         { headers:{token:localStorage.getItem('tkn')}
        })
        .then((res)=>{
        console.log('success',res.data.data.cartOwner);
        localStorage.setItem('owner',res.data.data.cartOwner)
        cartItems()
        return true
        })
        .catch((err)=>{
        console.log('err',err);
        return false
        })
        // console.log(productId);
        return data
    }

    function cartItems(){
      axios.get('https://ecommerce.routemisr.com/api/v1/cart',
      {headers:{token : localStorage.getItem("tkn")}})
      .then((res)=>{
      console.log('data',res.data.data);
      setAllProducts(res.data.data.products)
      setTotalCart(res.data.data.totalCartPrice)
      setCount(res.data.numOfCartItems)
      setCartId(res.data.data._id)
      })
      .catch((err)=>{
    console.log('return', err);
      })
    }


    useEffect(()=>{
     cartItems()
    //  console.log(token);
       },[token])


     async  function updateCount(id,count){
   const data=   await  axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{count},
        {headers:
          {token:localStorage.getItem('tkn')}})
          .then((res)=>{
         console.log('update',res.data);
         setAllProducts(res.data.data.products)
         setTotalCart(res.data.data.totalCartPrice)
         setCount(res.data.numOfCartItems)
         return true
          })
          .catch((err)=>{
         console.log('update error',err);
         return false
          })
          return data
       }

      async function removeProduct(id){
      const data= await  axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {headers:{token:localStorage.getItem('tkn')}})
        .then((res)=>{
          setAllProducts(res.data.data.products)
          setTotalCart(res.data.data.totalCartPrice)
          setCount(res.data.numOfCartItems)
          return true
        })
        .catch((err)=>{
          console.log('remove error',err);
          return false
        })
        return data
       }
 
  return <>
   <myCartContext.Provider value={{allProducts,totalCart,count,getCartProduct,cartItems,updateCount,removeProduct,cartId,owner}}>
     {children}
   </myCartContext.Provider>
  </>
}
