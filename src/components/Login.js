import React, { useRef, useState } from 'react'
import {Card, Button, Form, Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Login = () => {
    const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error,setError]= useState('');
  const [loading,setLoading]=useState(false);
  const { login } = useAuth();
 async function handleSubmit(e){
      e.preventDefault();
      
      try {
        setError('');
        setLoading(true);
        await  login(emailRef.current.value,passwordRef.current.value)
        emailRef.current.value='';
        passwordRef.current.value='';
        navigate('/');
        setLoading(false);
      } catch (error) {
        setError('');
        setError("Failed to Login");
        setLoading(false);
        
      }
  }

  return (
    <>
        <Card className='shadow'> 
                    <Card.Body>
                        <h2 className='text-center mb-4'>Login</h2>
                        {error && <Alert variant='danger'> 
                        {error} </Alert>}
                        <Form className='' onSubmit={handleSubmit}>
                            <Form.Group id="email">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type='email' required ref={emailRef} />
                            </Form.Group>
                            <Form.Group id="password">
                        <Form.Label> Password </Form.Label>
                        <Form.Control type='password' required ref={passwordRef} />
                            </Form.Group>
                           
                            <Button disabled={loading} className='w-100 mt-4' type='submit' variant='primary' >Login</Button>
                        </Form>

                        <div className="w-100 text-center mt-2">
                 <Link to={'/forget-password'} >Forget Password</Link>
            </div>
                    </Card.Body>
             </Card>
            <div className="w-100 text-center mt-2">
                Don't Have an Account ? <Link to={'/signup'} >Sign up</Link>
            </div>
    </>
  )
}

export default Login