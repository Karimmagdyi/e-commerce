import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner'

export default function Loading() {


  return <>
  
  <div className="w-100 h-100 position-absolute bg-info d-flex justify-content-center align-items-center z-3">
  <CirclesWithBar
        height="100"
        width="100"
        color="#4fa94d"
        outerCircleColor="#4fa94d"
        innerCircleColor="#4fa94d"
        barColor="#4fa94d"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
  </div>
  
  </>
}
