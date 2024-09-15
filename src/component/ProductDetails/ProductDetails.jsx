import axios, { Axios } from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { mycontext } from '../../Context/Context';
import { myCartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const {id}= useParams()
   const{getCartProduct}=  useContext(myCartContext)
 const{inc,dec} = useContext(mycontext)

   async function addToCart(id){
    await  getCartProduct(id)
      if(getCartProduct){
        toast.success('Added successfully',{position:'bottom-left'})
        }
        else{
        toast.error('an error has occured',{position:'bottom-left'})
        
        }
    }
    function getProductDetails(){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
  const{data,isLoading,isError,error}=   useQuery(`getProductDetails-${id}`,getProductDetails)
  const  product = data?.data.data;
  // console.log(product);
if (isLoading) {
    return <Loading/>;
}
// console.log(data.data.data.images);
var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
};
// if (isError) return {<div>{error.message}</div>;}
  return <>
  <div className="container">
    <div className="row align-items-center mt-5">
        { <div className="col-md-3">

          
        <Slider {...settings}>

            {data.data.data.images.map((item,index) => <div key={index} className="category my-5">
                    <img className='w-100' src={item} alt="" />
                    
                </div>
           
           )}
</Slider>
        </div> }
        <div className="col-md-9">
            <div className="details mt-5">
              {console.log(product)}
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>{product.category.name}</p>
                <div className='d-flex justify-content-between'>
                <p>{product.price} EGP</p>
              <p> <i className='fa-solid fa-star text-warning'></i> {product.ratingsAverage}</p>
                </div>
                <button onClick={()=>{addToCart(product._id)}} className='btn bg-main w-100 mt-4 text-white'>Add to Cart</button>
            </div>
        </div>
    </div>
  </div>
  </>
}
