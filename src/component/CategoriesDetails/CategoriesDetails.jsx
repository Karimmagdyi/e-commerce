import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { Link, useParams } from 'react-router-dom'
import ProductDetails from '../ProductDetails/ProductDetails'
import Loading from '../Loading/Loading'
import { myCartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'

export default function CategoriesDetails() {
    const{getCartProduct}=  useContext(myCartContext)
  async function addToCart(id){
    await  getCartProduct(id)
      if(getCartProduct){
        toast.success('Added successfully',{position:'bottom-left'})
        }
        else{
        toast.error('an error has occured',{position:'bottom-left'})
        
        }
    }
   const {id}=useParams()
//    console.log(id);
    function getCategoriesDetails() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    const { isLoading, data } = useQuery('getCategoriesDetails', getCategoriesDetails)
    if (isLoading) return <Loading />;
    const filtered= data?.data.data.filter(item => item.category._id === id)
    return <>
    <div className="container mt-90">
        <div className="row">
            
        {filtered?.map((product,index)=>  <div key={index} className="col-6 col-md-3">
            <div className="product">
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
            <button onClick={()=>{addToCart(product._id)}} className='btn bg-main w-75 text-white text-center'> add to cart</button>
            </div>
            </div>
        </div>)
    }
    
    
        </div>
    </div>
    
    
    </>

}
