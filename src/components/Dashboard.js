import React, { useState } from 'react'
import { Alert, Button, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
    const navigate = useNavigate();
    const [error,setError] = useState('');
    const { curruntUser ,logout } = useAuth();
  async function handleLogout(){
                setError('');
                try {
                    await logout();
                    navigate('/login');

                } catch (error) {
                    setError("failed to logout");
                }
    }       
  return (
   <>
        <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Profile</h2>
                    {error && <Alert variant='danger'> 
                        {error} </Alert>}

                        <strong> Email : {curruntUser.email} </strong>
                        <Link to={'/update-profile'} className="w-100 btn-primary btn mt-3" >update Profile</Link>
                </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
                <Button varient="link" onClick={handleLogout} >Logout</Button>
            </div>
   </>
  )
}

export default Dashboard