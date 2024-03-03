import React, { useContext, useEffect, useState } from 'react'
import axios, { Axios } from 'axios';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import { Link } from 'react-router-dom';

export default function Categories() {
//   const [product, setProduct] = useState([])

//   useEffect( ()=>{
//    axios.get('https://ecommerce.routemisr.com/api/v1/categories')
//    .then((data)=>{
//      setProduct(data.data.data)
//     //  console.log(data.data.data);
//    })
//    .catch(()=>{
//     console.log('error');
//    })
// }, [])

function getCategory(){
 return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
}
 const{isLoading,data}= useQuery('getCategory',getCategory)
// console.log(data.data.data);
 if(isLoading){
  return <Loading/>
 }
  return <>
    <div className="container mt-60">
      <div className="row">
    {data?.data.data.map((product,index)=><div key={index} height='100' className=" col-sm-6 col-md-3">
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
