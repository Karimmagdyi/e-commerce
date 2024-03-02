import React, { useContext, useEffect, useState } from 'react'
import axios, { Axios } from 'axios';
import Categories from '../Categories/Categories';
import Products from '../Products/Products';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';


export default function Home() {

  return <>
   <MainSlider/>
   <CategoriesSlider/>
   <Products />
  </>
}