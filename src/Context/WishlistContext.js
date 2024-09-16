import axios from "axios"
import { createContext, useContext, useEffect, useState  } from "react"
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
    console.log('wishlist item',res.data.data);
    localStorage.setItem('wish',res.data.data)
    setWishPro(res.data.data)
    getWishlist()
    setWishCount(((prev)=>++prev))
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
     setWishlist(res.data)
     setWishCount(res.data.count)
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
    localStorage.setItem('wish',res.data.data)
    getWishlist()
    setWishPro(res.data.data)
    setWishCount(res.data.count)
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