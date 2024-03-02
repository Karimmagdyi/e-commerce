import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const { data, isLoading } = useQuery('getAllCategories', getAllCategories)
    // console.log(data);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true
    };
    // if (isLoading) {
    //     return <Loading />
    // }
    return <>
    <div className="container">
    
        <Slider {...settings}>
            
                    {data?.data.data.map((item,index) =>
                   <Link to={`/CategoriesDetails/${item._id}`}>
                     <div key={index} className="category my-5">
                            <img className='w-75 rounded-circle' height='100' src={item.image} alt="" />
                            <h3 className="h4 text-center">{item.name}</h3>
                        </div>
                   </Link>
                   
                   )}

                
        </Slider>
        </div>

    </>
}
