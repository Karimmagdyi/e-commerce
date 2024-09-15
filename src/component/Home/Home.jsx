import React, { useEffect, useState } from 'react'
import Products from '../Products/Products';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import Loading from '../Loading/Loading';


export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if(isLoading){
    return <Loading/>
  }
  return <>

   <MainSlider/>
   <CategoriesSlider/>
   <Products />
  </>
}