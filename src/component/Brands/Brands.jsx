import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'

export default function Brands() {

  function getBrands(){
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands')
  }
  const{data,isLoading}=useQuery('getBrands',getBrands)
  console.log(data?.data.data);
  if(isLoading){
  return  <Loading/>
  }
  return <>
   <div className="container mt-60">
    <div className="row gy-3">
          {data.data.data.map((val,index)=> <div key={index} className="col-md-3">
        <Link to={`/BrandsDetails/${val._id}`}>
        <div className="brand text-center">
           <img className='w-75' src={val.image} alt="" />
           <h4 className='text-center fw-bold h6'> {val.name}</h4>
        </div>
        </Link>
      </div>)}
        
    </div>
   </div>
  </>
}
