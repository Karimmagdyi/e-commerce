import { createContext, useEffect, useState } from "react"

export const mycontext = createContext()


export function AuthContext({children}){
    const [counter, setCounter] = useState(0)
 
const [token, setToken] = useState(null)

useEffect(()=>{
  if (localStorage.getItem("tkn") !== null){
       setToken(localStorage.getItem('tkn'))
  }
},[])

function inc(){
  setCounter(counter+ 1)
}
function dec(){
  setCounter(counter-1)
}
    return<>
     
     <mycontext.Provider value={{token,setToken,counter,inc,dec}}>
       
       {children}

     </mycontext.Provider>
    
    
    </>
}