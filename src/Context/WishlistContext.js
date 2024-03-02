import axios from "axios"
import { Children, createContext, useContext, useEffect, useState,  } from "react"
import { json } from "react-router-dom"
import { mycontext } from "./Context"

 export const MyWishListContext=createContext()

 export function WishlistContext({children}){
  const{token}=useContext(mycontext)

  const [wishlist, setWishlist] = useState([])
  const [wishCount, setWishCount] = useState(0)
  const [wishPro, setWishPro] = useState([])


 async function addToWishlist(productId){
  const data=await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId},{
    headers:{token:localStorage.getItem('tkn')}
  })
  .then((res)=>{
    console.log('kakak',res.data.data);
    localStorage.setItem('wish',res.data.data)
    setWishPro(res.data.data)
    getWishlist()
    return true
  })
  .catch((err)=>{
    console.log('error in adding to wishlist',err);
    return false
  })
  return data
 }
 function getWishlist(){
     axios.get('https://ecommerce.routemisr.com/api/v1/wishlist',{
      headers:{token:localStorage.getItem('tkn')}
    })
    .then((res)=>{
      console.log('wishlist items', res.data);
     setWishlist(res.data)
    
 })
    .catch((err)=>{
         console.log('errrrrrrrr',err);
 })
 }

 async function removeWishlist(id){
 const data= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,{headers:{
    token : localStorage.getItem("tkn")
  }})
  .then((res)=>{
    console.log('removed wishlist',res.data);
    getWishlist()
    setWishPro(res.data.data)
    return true
  })
  .catch((err)=>{
console.log('error wishlist',err);
return false
  })
  return data
 }
 useEffect(()=>{
getWishlist() 
if(localStorage.getItem('wish')!==null){
  setWishPro(localStorage.getItem('wish'))
}

},[])

  return<>
    <MyWishListContext.Provider value={{addToWishlist,wishlist,wishCount,getWishlist,removeWishlist,wishPro}}>
        {children}
    </MyWishListContext.Provider>
    
    </>
  }