import React,{useRef,useState} from 'react';
import {Form,Card,Alert} from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';

import { Avatar,CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';


import {Container} from 'react-bootstrap';
//import ParticlesBg from "particles-bg";

import { Link, useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    paper: { 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(0),
      backgroundColor: theme.palette.secondary.main,
    },
  }));

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef(); 

    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false)
    const {login} = useAuth(); ///currentUser
      

    const classes = useStyles();

    //useHistory
    const history = useHistory();

    async function handleSubmit(e){
        e.preventDefault();
        
        try{
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/home');
        }
        catch{
            setError("  Failed to Sign in!");
        }
       setLoading(false)
    }

    return (
        <Container className="d-flex align-items-center justify-content-center"
        style={{minHeight:"100vh"}}
        >
            <div className="w-100" style={{maxWidth:'400px'}}>
                <Card style={{padding:'10px'}}>
                    <Card.Body>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                               {/*  <LockOutlinedIcon /> */}
                            </Avatar>
                        </div>
                        <h2 className="text-center mb-4">Log In</h2>
                        {/* {currentUser && currentUser.email} */}
                        {error &&<Alert variant="danger"><InfoOutlinedIcon></InfoOutlinedIcon> {error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label for="email">Email<span className="text-danger"> *</span></Form.Label>
                                <Form.Control 
                                    type="email" 
                                    ref={emailRef} 
                                    placeholder="Email" 
                                    required
                                />
                            </Form.Group>
                            <Form.Group id="password" className="mt-2">
                                <Form.Label for="password">Password<span className="text-danger"> *</span></Form.Label>
                                <Form.Control 
                                    type="password" 
                                    ref={passwordRef} 
                                    placeholder="Password" 
                                    required
                                />
                            </Form.Group>
                            <Button 
                                type="submit"
                                className="w-100 mt-3" 
                                variant="contained"
                                disabled={loading} 
                                color="primary"
                            >Log In</Button> 
                        </Form>
                        <div className='mt-2 text-center'>
                            <Link to='/forgot-password' >Forgot Password</Link>
                        </div>
                        <div className="mt-2 text-center">
                            Need an Account? <Link to='/signup'>Sign Up</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
           {/*  <ParticlesBg type="random" bg={true}/> */}
        </Container>
    )
}
