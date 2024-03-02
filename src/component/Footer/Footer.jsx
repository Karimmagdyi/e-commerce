import React from 'react'

export default function Footer() {
  return <>
  
<footer className="">
<div className='footer mt-5'>
    <div className="container py-4">
    <h4 className='mt-3'>Get The Freshcart App </h4>
    <p className='text-muted'>we will send you a link,open it on your phone to download the app.</p>
    <div className='d-flex'>
    <input className='form-control w-75 mx-4' type="email" placeholder='Email' />
      <button className='btn bg-main text-white px-4'> share app link</button>
    </div>
    <hr />
    <div className='d-flex justify-content-between'>
        <div className="left">
            <p>Payment partners</p>
            <img className='w-100' src={require('../../images/amazonpay.svg')} alt="" />
            <img className='w-100' src={require('../../images/american-express.svg')} alt="" />
            <img className='w-100' src={require('../../images/mastercard.svg')} alt="" />
        </div>
        <div className="right">
            <p className='fw-bold'>Get deliveries with freshcart </p>
            <img className='w-100' src={require('../../images/appstore-btn.svg')} alt="" />
            <img className='w-100' src={require('../../images/googleplay-btn.svg')} alt="" />
        </div>
    </div>
    </div>
  </div>
</footer>
  
  </>
}
