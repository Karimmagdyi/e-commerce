import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './component/Layout/Layout'
import Products from './component/Products/Products'
import Brands from './component/Brands/Brands'
import Categories from './component/Categories/Categories'
import Register from './component/Register/Register'
import Login from './component/Login/Login'
import { AuthContext } from './Context/Context'
import { Protect} from './component/ProtectedRoute/ProtectedRoute'
import Home from './component/Home/Home.jsx'
import Cart from './component/Cart/Cart.jsx'
import { QueryClient, QueryClientProvider } from 'react-query'
import ProductDetails from './component/ProductDetails/ProductDetails.jsx'
import CategoriesDetails from './component/CategoriesDetails/CategoriesDetails.jsx'
import BrandsDetails from './component/BrandsDetails/BrandsDetails.jsx'
import { CartContext } from './Context/CartContext.js'
import { Toaster } from 'react-hot-toast'
import Checkout from './component/Checkout/Checkout.jsx'
import OnlinePayment from './component/OnlinePayment/OnlinePayment.jsx'
import Wishlist from './component/Wishlist/Wishlist.jsx'
import { WishlistContext } from './Context/WishlistContext.js'
import AllOrders from './component/AllOrders/AllOrders.jsx'
import ForgetPassword from './component/ForgetPassword/ForgetPassword.jsx'
import VerficationCode from './component/VerficationCode/VerficationCode.jsx'
import ResetPassword from './component/ResetPassword/ResetPassword.jsx'








export default function App() {
let routes =createBrowserRouter([
  {path:'/',element:<Layout/>,children:[
    {index:true, element: <Home />},
    { path:'home',element:<Home/>},
    {path:'products',element:<Protect><Products/></Protect>},
    {path:'ProductDetails/:id',element:<Protect><ProductDetails/></Protect>},
    {path:'CategoriesDetails/:id',element:<Protect><CategoriesDetails/></Protect>},
    {path:'BrandsDetails/:id',element:<Protect><BrandsDetails/></Protect>},
    {path:'OnlinePayment',element:<Protect><OnlinePayment/></Protect>},
    {path:'AllOrders',element:<Protect><AllOrders/></Protect>},
    {path:'ForgetPassword',element:<ForgetPassword/>},
    {path:'VerficationCode',element:<VerficationCode/>},
    {path:'ResetPassword',element:<ResetPassword/>},
    {path:'cart',element:<Protect><Cart/></Protect>},
    {path:'Brands',element:<Protect><Brands/></Protect>},
    {path:'Wishlist',element:<Protect><Wishlist/></Protect>},
    {path:'categories',element:<Protect><Categories/></Protect>},
    {path:'Checkout',element:<Protect><Checkout/></Protect>},
    {path:'register',element:<Register/>},
    {path:'login',element:<Login/>},
  ]}
])

const myClient= new QueryClient()

  return <>
<QueryClientProvider client={myClient}>
  <AuthContext>
    <CartContext>    
<WishlistContext>
  <RouterProvider router={routes}/>
  {/* <ReactQueryDevtools/> */}
</WishlistContext>
    </CartContext>
  </AuthContext>
</QueryClientProvider>
<Toaster/>
  </>
}

