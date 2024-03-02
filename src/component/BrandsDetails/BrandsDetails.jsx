import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom'
import Loading from '../Loading/Loading';
import { myCartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function BrandsDetails() {
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
    console.log(id);

    function brand(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    const{data,isLoading}=useQuery('brand',brand)
    // console.log(data?.data.data);
 const filtered=  data?.data.data.filter(item=> item.brand._id===id)
 console.log(filtered);
    if(isLoading){
        return <Loading/>
    }
  return <>
  <div className="container">
    <div className="row">
       {filtered.map((item,index)=> <div key={index} className='col-md-3'>
        <div className="product">
        <Link to={`/ProductDetails/${item._id}`}>
            <img className='w-100' src={item.imageCover} alt="" />
            <h4 className='font-sm text-main'>{item.category.name}</h4>
            <h5 className='h5'>{item.title.split(' ').slice(0, 2).join(' ')}</h5>
            <div className="d-flex justify-content-between">
              <p>{item.price} EGP</p>
              <p> <i className='fa-solid fa-star text-warning'></i> {item.ratingsAverage}</p>
          </div>
        </Link>
            <div className="d-flex justify-content-center">
            <button onClick={()=>{addToCart(item._id)}} className='btn bg-main w-75 text-white text-center'> add to cart</button>
            </div>
            </div>
        </div>
              )}
    </div>
  </div>
  </>
}

