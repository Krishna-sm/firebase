import React from 'react'
import {Route,Navigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const PrivateRoute = ({component:Component,...rest}) => {
    const {curruntUser} = useAuth();
    
  return (
    <Route {...rest} Component={(props)=>{
          return  curruntUser ? <Component {...props} />:<Navigate to={'/login'} />
    }} >

    </Route>
  )
}

export default PrivateRoute