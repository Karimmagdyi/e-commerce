import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export default function CategoriesSlider() {

    function getAllCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
    }

    const { data } = useQuery('getAllCategories', getAllCategories)
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 6,
                slidesToScroll: 6,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                initialSlide: 4
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 3,
                slidesToScroll:3
              }
            }
          ]
    };
    return <>
    <div className="container">
    
        <Slider {...settings}>
            
                    {data?.data.data.map((item,index) =>
                   <Link to={`/CategoriesDetails/${item._id}`}>
                     <div key={index} className="category text-center my-5">
                            <img className='w-75 rounded-circle' height='100' src={item.image} alt="" />
                            <h3 className="h4 text-center h6">{item.name}</h3>
                        </div>
                   </Link>
                   
                   )}

                
        </Slider>
        </div>

    </>
}
