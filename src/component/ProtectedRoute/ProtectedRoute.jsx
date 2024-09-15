import { Navigate} from "react-router-dom"

export function Protect({children}){
    // console.log(children);

    if(localStorage.getItem('tkn')==null){
       return <Navigate to='/login'/>
    }
   

    return<>
    
    {children}
    
    </>
}