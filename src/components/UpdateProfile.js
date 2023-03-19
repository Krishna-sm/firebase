import React, { useRef, useState } from 'react'
import {Card, Button, Form, Alert} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const UpdateProfile = () => {
    const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const [error,setError]= useState('');
  const [loading,setLoading]=useState(false);
  const { updateEmailFun,updatePasswordFun,curruntUser } = useAuth();
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

      const promises =[];
      if(emailRef.current.value !== curruntUser.email)
      {setLoading(true);
        promises.push(updateEmailFun(emailRef.current.value))
        setLoading(false);
      }
      if(passwordRef.current.value)
      {
      setLoading(true);
        
        promises.push(updatePasswordFun(passwordRef.current.value))
        setLoading(false);

      }

      Promise.all(promises).then(()=>{
        setLoading(true);
        
            navigate('/');
        setLoading(false);

        
      }).catch(()=>{
        setError("can not change profile")
        setLoading(false);

      })
     
  }

  return (
    <>
        <Card> 
                    <Card.Body>
                        <h2 className='text-center mb-4'>Update Profile</h2>
                        {error && <Alert variant='danger'> 
                        {error} </Alert>}
                        <Form className='' onSubmit={handleSubmit}>
                            <Form.Group id="email">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type='email' required ref={emailRef} defaultValue={curruntUser.email} />
                            </Form.Group>
                            <Form.Group id="password">
                        <Form.Label> Password </Form.Label>
                        <Form.Control placeholder='Leave Blank to keep the same' minLength={6} type='password'  ref={passwordRef} />
                            </Form.Group>
                            <Form.Group id="password-confirm">
                        <Form.Label> Password Confirmation </Form.Label>
                        <Form.Control placeholder='Leave Blank to keep the same' type='password'  ref={passwordConfirmRef} />
                            </Form.Group>
                            <Button disabled={loading} className='w-100 mt-4' type='submit' variant='primary' >Update</Button>
                        </Form>

                    </Card.Body>
             </Card>
            <div className="w-100 text-center mt-2">
                 <Link to={'/'} >Back &rarr;</Link>
            </div>
    </>
  )
}

export default UpdateProfile




