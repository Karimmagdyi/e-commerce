import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";

export default function MainSlider() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true
    };

    return <>

           <div className="container mt-60">

           
        
            <div className="row mt-3">
                
                    <div className="col-md-12">
                    <Slider {...settings}>
                        <div>
                            <img className="w-100" height={'300px'} src={require('../../images/slider-image-1.jpeg')} alt="" />
                        </div>
                        <div>
                            <img className="w-100" height={'300px'} src={require('../../images/slider-image-2.jpeg')} alt="" />
                        </div>
                        <div>
                            <img className="w-100" height={'300px'} src={require('../../images/slider-image-3.jpeg')} alt="" />
                        </div>
                </Slider>
                    </div>
                {/* <div className="col-md-3">
                 <div><img className="w-100" height={'150px'} src={require('../../images/grocery-banner.png')} alt="" /> </div>   
                 <div><img className="w-100" height={'150px'} src={require('../../images/grocery-banner-2.jpeg')} alt="" /> </div> 
                </div> */}
            </div>
        
</div>

    </>
        ;
}
