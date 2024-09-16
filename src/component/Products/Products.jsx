import React, { useContext, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { myCartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { MyWishListContext } from '../../Context/WishlistContext'

export default function Products() {

  const{addToWishlist,removeWishlist,wishPro}=useContext(MyWishListContext)
 const [ proColor,setproColor] = useState('#212529')
 function changeColor(){
  setproColor('#FF0000')
 }
 async function addWish(id){
   await addToWishlist(id)
   if(addToWishlist){
     toast.success('added successfully',{position:'bottom-left'})
     changeColor()
   }
   else{
   toast.error('error',{position:'bottom-left'})

   }
  }

  async function removeWish(id){
   await removeWishlist(id)
    if(removeWishlist){
      toast.success( "Removed From Wishlist",{position:'bottom-left'})
    }
  }

 async function addProduct(id){
  await  getCartProduct(id)
  
  if(getCartProduct){
    toast.success('Added successfully',{position:'bottom-left'})
    }
    else{
    toast.error('an error has occured',{position:'bottom-left'})
    
    }
  }
  const{getCartProduct}= useContext(myCartContext)
  
  function getAllProducts() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/products')
  }
  const { data } = useQuery('getAllProducts', getAllProducts)


  const isProductInWishlist = (productId) => wishPro.includes(productId);




  return <>


    <div className="container mt-90">
      <div className="row gy-5">
        {data?.data.data.map((product, index) => <div key={index} className="col-6 col-md-3">
          <div className="product position-relative">
            {isProductInWishlist(product._id)?<div className="wishlist">
            <i role='button' onClick={()=>{removeWish(product._id)}} className="fa-solid fa-heart fa-xl"style={{color:'red'}} ></i>
            </div>:<div className="wishlist">
            <i role='button' onClick={()=>{addWish(product._id)}} className="fa-solid fa-heart fa-xl"  ></i>
            </div>}
          <Link to={`/ProductDetails/${product._id}`}>
            <img className='w-100' src={product.imageCover} alt="" />
            <h4 className='font-sm text-main'>{product.category.name}</h4>
            <h5 className='h5'>{product.title.split(' ').slice(0, 2).join(' ')}</h5>
            <div className="d-flex justify-content-between">
              <p>{product.price} EGP</p>
              <p> <i className='fa-solid fa-star text-warning'></i> {product.ratingsAverage}</p>
            </div>
          </Link>
            <div className="d-flex justify-content-center">
            <button onClick={()=>addProduct(product._id)} className='btn bg-main w-75 text-white text-center'> add to cart</button>
            </div>
          </div>
        </div>)}
      </div>
    </div>
   

  </>
}
