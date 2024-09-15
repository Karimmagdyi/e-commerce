import React, { useContext } from 'react'
import { MyWishListContext } from '../../Context/WishlistContext'
import axios from 'axios'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import toast from 'react-hot-toast'


export default function Wishlist() {

  const {wishlist,removeWishlist}=useContext(MyWishListContext)
  console.log(wishlist);
 
async function removeItem(id){
 await removeWishlist(id)
  if(removeWishlist){
    toast.success('item removed successfully',{position:'bottom-left'})
  }
  else{
    toast.error('an error hasa occureed',{position:'bottom-left'})

  }
}
// }
function getAllProducts() {
  return axios.get('https://ecommerce.routemisr.com/api/v1/products')
}
const { data } = useQuery('getAllProducts', getAllProducts)
console.log('kkkk',data);
const filtered=data?.data.data.filter(item=> wishlist.data?.includes(item._id))
console.log('wish data',filtered);
if(!wishlist.data){
  return <Loading/>
}

  return <>
  <div className="container mt-60 cartItem">
 <div className="row">
  <div className="col-8">
<div className="details">
<h2>Wishlist:</h2>
</div>
  </div>
 
 </div>
    {wishlist.data.map((items,idx)=> <div key={idx} className="row  gy-5 wish-pro align-items-center">
    <div className="col-2">
    <figure>
      <img className='w-100' src={items.imageCover} alt="" />
    </figure>
    </div>
    <div className="col-9">
     <p>{items.title}</p>
     <p className='text-main'>price: {items?.price}</p>
     <button onClick={()=>{removeItem(items._id)}} className='btn btn-outline-danger'>Remove</button>
    </div>
    <div className="col-2">
     <div className=''>
    
     </div>
    </div>
  </div> )}
  
</div>
  
  </>
};
