import React, { useRef, useState } from 'react'
import {Card, Button, Form, Alert} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
const ForgetPassword = () => {
  const emailRef = useRef();
  const [error,setError]= useState('');
  const [loading,setLoading]=useState(false);
  const { resetPassword } = useAuth();
  const [message,setMessage] = useState('');
 async function handleSubmit(e){
      e.preventDefault();
      
      try {
        setError('');
        setMessage('');
        setLoading(true);
        await  resetPassword(emailRef.current.value)
        emailRef.current.value='';
        setMessage('Check your inbox email has been sent');

       
        setLoading(false);
      } catch (error) {
        setMessage('');
        setError('');
        setError("Failed to Reset Password");
        setLoading(false);
        
      }
  }

  return (
    <>
        <Card className='shadow'> 
                    <Card.Body>
                        <h2 className='text-center mb-4'>Forget Password</h2>
                        {error && <Alert variant='danger'> 
                        {error} </Alert>}
                        {message && <Alert variant='success'> 
                        {message} </Alert>}
                        
                        <Form className='' onSubmit={handleSubmit}>
                            <Form.Group id="email">
                        <Form.Label> Email </Form.Label>
                        <Form.Control type='email' required ref={emailRef} />
                            </Form.Group>
                         
                           
                            <Button disabled={loading} className='w-100 mt-4' type='submit' variant='primary' >Forget Password</Button>
                        </Form>

                
                    </Card.Body>
             </Card>
            <div className="w-100 text-center mt-2">
                Already Know ? <Link to={'/login'} >Login</Link>
            </div>
    </>
  )
}

export default ForgetPassword