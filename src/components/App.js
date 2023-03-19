import React from 'react'
import { Container } from 'react-bootstrap'
import Signup from './Signup'
import { BrowserRouter, Routes,Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Error from './Error';
import Login from './Login';
import { useAuth } from '../context/AuthContext';
import ForgetPassword from './ForgetPassword';
import UpdateProfile from './UpdateProfile';
// import PrivateRoute from './PrivateRoute';


const App = () => {
  const {curruntUser} = useAuth();
  return (
    <>
        <Container className='d-flex align-items-center justify-content-center' style={{minHeight:"100vh"}}>
          <div className="w-100" style={{maxWidth:"400px"}}>
<BrowserRouter>
<Routes>
  
  <Route path='/' exact element={curruntUser?<Dashboard/>:<Navigate to={'/login'} />} />
  <Route path='/update-profile' exact element={curruntUser?<UpdateProfile/>:<Navigate to={'/login'} />} />

  <Route path='/forget-password' element={<ForgetPassword/>}  />
  <Route path='/signup' element={<Signup/>}  />
  <Route path='/login' element={<Login/>}  />
  <Route path='*' element={<Error/>}  />
</Routes>
</BrowserRouter>
        
          </div>
        </Container>
    </>
  )
}

export default App