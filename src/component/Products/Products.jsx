import React, { useContext, useEffect, useState } from 'react'
import axios, { Axios } from 'axios'
import { useQuery } from 'react-query'
import { CirclesWithBar } from 'react-loader-spinner'
import Loading from '../Loading/Loading'
import { Link, Navigate } from 'react-router-dom'
import { myCartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { MyWishListContext, WishlistContext } from '../../Context/WishlistContext'
export default function Products() {

  const{addToWishlist,wishlist,removeWishlist,wishPro}=useContext(MyWishListContext)
 const [proColor, setproColor] = useState('#212529')
 function changeColor(){
  // console.log('Changing color...');
  setproColor('#FF0000')
 }
 async function addWish(id){
  console.log('Adding to wishlist:', id);
   await addToWishlist(id)
  //  console.log(id);
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
  const { data, error, isLoading } = useQuery('getAllProducts', getAllProducts)
  // console.log(data.data.data);
  // console.log('kkkk',data);
  if (isLoading) {
    return <Loading/>
  }
console.log('wishlist pro',wishlist);
  const isProductInWishlist = (productId) => wishPro.includes(productId);
// if(!wishlist.data) return <Loading/>



  return <>


    <div className="container mt-60">
      <div className="row gy-5">
        {data?.data.data.map((product, index) => <div key={index} className="col-sm-6 col-md-3">
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
              {/* <p>{product._id}</p> */}
            </div>
          </Link>
            <div className="d-flex justify-content-center">
            <button onClick={()=>addProduct(product._id)} className='btn bg-main w-75 text-white text-center'> add to cart</button>
            {/* <i  onClick={()=>addProduct(product._id)} className="fa-solid fa-cart-plus fa-xl btn "></i> */}
            </div>
          </div>
        </div>)}
      </div>
    </div>
   

  </>
}

  // console.log('wishlist', wishlist);
  // console.log(addToWishlist);


  // function removeWish(id){
  //   removeWishlist(id)
  //   if(removeWishlist){
  //     toast.success( "Removed From Wishlist",{position:'bottom-left'})
  //   }
  // }

    // const [product, setProduct] = useState([])
// useEffect(()=>{
//   if(wishlist.includes(data?.data.data._id)){
    
//   }
// },[])







// import React, { useContext, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useQuery } from 'react-query';
// import { Link } from 'react-router-dom';
// import { MyWishListContext } from '../../Context/WishlistContext';
// import toast from 'react-hot-toast';
// import Loading from '../Loading/Loading';

// export default function Products() {
//   const { addToWishlist, wishlist, removeWishlist } = useContext(MyWishListContext);

//   // State to hold colors for each product
//   const [productColors, setProductColors] = useState({});

//   async function addWish(id) {
//     await addToWishlist(id);
//     toast.success('Added to wishlist', { position: 'bottom-left' });
//   }

//   function removeWish(id) {
//     removeWishlist(id);
//     toast.success('Removed from wishlist', { position: 'bottom-left' });
//   }

//   function getAllProducts() {
//     return axios.get('https://ecommerce.routemisr.com/api/v1/products');
//   }

//   const { data, error, isLoading } = useQuery('getAllProducts', getAllProducts);

//   useEffect(() => {
//     if (data?.data?.data) {
//       // Initialize colors for each product
//       const colors = {};
//       data.data.data.forEach((product) => {
//         colors[product._id] = '#212529'; // Default color
//       });
//       setProductColors(colors);
//     }
//   }, [data]);

//   if (isLoading) {
//     return <Loading />;
//   }

//   const isProductInWishlist = (productId) => wishlist.data.includes(productId);
//   if (!wishlist.data) return <Loading />;

//   const handleAddToWishlist = (productId) => {
//     addWish(productId);
//     changeColor(productId);
//   };

//   const changeColor = (productId) => {
//     setProductColors((prevColors) => ({
//       ...prevColors,
//       [productId]: '#FF0000', // Change color for the clicked product
//     }));
//   };

//   return (
//     <div className="container mt-60">
//       <div className="row gy-5">
//         {data?.data?.data.map((product, index) => (
//           <div key={index} className="col-md-3">
//             <div className="product position-relative">
//               {isProductInWishlist(product._id) ? (
//                 <div className="wishlist">
//                   <i
//                     role="button"
//                     onClick={() => removeWish(product._id)}
//                     className="fa-solid fa-heart fa-xl"
//                     style={{ color: 'red' }}
//                   ></i>
//                 </div>
//               ) : (
//                 <div className="wishlist">
//                   <i
//                     role="button"
//                     onClick={() => handleAddToWishlist(product._id)}
//                     className="fa-solid fa-heart fa-xl"
//                     style={{ color: productColors[product._id] }}
//                   ></i>
//                 </div>
//               )}
//               <Link to={`/ProductDetails/${product._id}`}>
//                 <img className="w-100" src={product.imageCover} alt="" />
//                 <h4 className="font-sm text-main">{product.category.name}</h4>
//                 <h5 className="h5">{product.title.split(' ').slice(0, 2).join(' ')}</h5>
//                 <div className="d-flex justify-content-between">
//                   <p>{product.price} EGP</p>
//                   <p>
//                     {' '}
//                     <i className="fa-solid fa-star text-warning"></i> {product.ratingsAverage}
//                   </p>
//                 </div>
//               </Link>
//               <div className="d-flex justify-content-center">
//                 <button
//                   onClick={() => addWish(product._id)}
//                   className="btn bg-main w-75 text-white text-center"
//                 >
//                   {' '}
//                   add to cart
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

