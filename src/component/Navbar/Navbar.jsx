import React, { useContext } from 'react'
import logo from '../../images/freshcart-logo.svg'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { mycontext } from '../../Context/Context'
import { myCartContext } from '../../Context/CartContext'
import { MyWishListContext } from '../../Context/WishlistContext'
export default function Navbar() {
  const { count } = useContext(myCartContext)
  const { wishlist,wishCount } = useContext(MyWishListContext)
  // console.log(wishlist);
  const navigate = useNavigate()
  function Logout() {
    localStorage.removeItem('tkn')
    setToken(null)
    navigate('/login')
  }
  const { setToken } = useContext(mycontext)
  return <>

    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 end-0 start-0 mb-5 z-3 py-3">
      <div className="container-fluid d-flex justify-content-between">
        <div className='navImage d-flex'>
        <Link to={'/home'}>
        <img src={logo} alt="" />
        </Link>
        <div className="d-flex align-items-center iconss ">  
        {localStorage.getItem('tkn') !== null ? (
              count !== 0 ? (
                <li className="nav-item position-relative list-unstyled mx-3 cart">
                  <Link className="nav-link" to="/cart">
                    <i className="fa-solid fa-cart-shopping fa-xl"></i>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-main text-white">
                      {count}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  </Link>
                </li>
              ) :  <li className="nav-item position-relative cart mx-3 list-unstyled">
              <Link className="nav-link" to="/cart">
                <i className="fa-solid fa-cart-shopping fa-xl "></i></Link></li>
            ) : (
              ''
            )}`
        {localStorage.getItem('tkn') != null ? (
          wishCount>0?(
         <Link to={'/Wishlist'}>
              <li className='nav-item position-relative text-decoration-none list-unstyled wish'>
                <i className="fa-regular fa-heart fa-xl px-md-3"></i>
                <span className=" translate-middle badge rounded-pill bg-main text-white wishIcon">
                  {wishlist.count}
                  <span className="visually-hidden">unread messages</span>
                </span>
              </li>
            </Link>
        ) 
          :<>
          <Link to={'/Wishlist'}>      
          <li className='nav-item position-relative text-decoration-none list-unstyled wish'>
                <i className="fa-regular fa-heart fa-xl px-md-3"></i></li>
          </Link>
          </>    
        )
          : ''}
          
        </div>
        </div>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {localStorage.getItem('tkn') != null ? <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">Home</NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/products">Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/brands">brands</NavLink>
            </li>
          </ul> : ''}
              <ul>
            <div className="d-flex intro ">

            {localStorage.getItem('tkn') == null ? <>  <li className="nav-item mx-3 list-unstyled">
              <NavLink className="nav-link" to="/register">register</NavLink>
            </li>
              <li className="nav-item list-unstyled">
                <NavLink className="nav-link" to="/login">login</NavLink>
              </li></> : ''}
            </div>
            {localStorage.getItem('tkn')!==null?  <li className="nav-item list-unstyled ms-3 logout">
                <span onClick={Logout} role='button' className="nav-link">logout</span>
              </li>:''}
              </ul>
             
           

            
          {/* </ul> */}
          </div>
          <div className='navDropdown'>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        </div>
      </div>
      
    </nav>


  </>
}
