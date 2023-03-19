import React, { useRef, useState } from 'react'
import {Card, Button, Form, Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const Signup = () => {
    const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error,setError]= useState('');
  const [loading,setLoading]=useState(false);
  const { signup } = useAuth();
 async function handleSubmit(e){
      e.preventDefault();
      if(emailRef.current.value === '')
      { 
        return setError("Enter valid Email Address");
      }
      if(passwordRef.current.value !== passwordConfirmRef.current.value)
      {
                    return setError("Passwords Do not match");
      }

      if(passwordRef.current.value.length < 6 )
      {
                    return setError("password must be in 6 character");
      }
      try {
        setError('');
        setLoading(true);
        await  signup(emailRef.current.value,passwordRef.current.value)
        emailRef.current.value='';
        passwordConfirmRef.current.value='';
        passwordRef.current.value='';
        
        setLoading(false);
        navigate('/');
      } catch (error) {
        setError('');
        setError("Failed to Create an Account");
        setLoading(false);
        
      }
  }

  return (
    <>
        <Card> 
                    <Card.Body>
                        <h2 className='text-center mb-4'>Sign up</h2>
                        {error && <Alert variant='danger'> 
                        {error} </Alert>}
                        <Form className='' onSubmit={handleSubmit}>
                            <Form.Group id="email">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type='email' required ref={emailRef} />
                            </Form.Group>
                            <Form.Group id="password">
                        <Form.Label> Password </Form.Label>
                        <Form.Control minLength={6} type='password' required ref={passwordRef} />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                        <Form.Label> Password Confirmation </Form.Label>
                        <Form.Control type='password' required ref={passwordConfirmRef} />
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-4' type='submit' variant='primary' >Sign Up</Button>
                        </Form>

                    </Card.Body>
             </Card>
            <div className="w-100 text-center mt-2">
                Already Have an Account ? <Link to={'/login'} >Log In</Link>
            </div>
    </>
  )
}

export default Signup