import React from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Categories() {


function getCategory(){
 return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
 const{isLoading,data}= useQuery('getCategory',getCategory)
 if(isLoading){
  return <Loading/>
 }
  return <>
    <div className="container mt-60">
      <div className="row">
    {data?.data.data.map((product,index)=><div key={index} height='100' className=" col-6 col-md-3">
      <Link to={`/CategoriesDetails/${product._id}`}>
      <div className="product">
              <img className='w-100' height='200' src={product.image} alt="" />
              <h3>{product.name}</h3>
            </div>
      </Link>
    </div>)}
      </div>
    </div>
  </>
}
