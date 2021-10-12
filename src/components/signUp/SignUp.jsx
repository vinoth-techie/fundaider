import React, { useRef, useState } from 'react';
import { Form, Card, Alert } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import { useAuth } from '../../contexts/AuthContext';

import { Avatar, CssBaseline } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import axios from 'axios';

import { Container } from 'react-bootstrap';
//import ParticlesBg from "particles-bg";
import { Link, useHistory } from 'react-router-dom';
import addUserForm from '../Form';

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

export default function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)
    const { signUp } = useAuth(); ///currentUser

    //useHistory
    const history = useHistory();

    const classes = useStyles();
    async function addUser(email){
        console.log(email,"vino")
        await axios.post('http://localhost:3001/userdata',{
                email:email
            } )
                .then((response) => console.log(response.data))
                .catch((error) => console.log(error))
    };
    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password does not match!');
        }

        try {
            setError('')
            setLoading(true)
            await signUp(emailRef.current.value, passwordRef.current.value);
            await addUser(emailRef.current.value)
            history.push('/home');
        }
        catch {
            setError("Failed to create an account");
        }
        setLoading(false)
    }

    return (
        <Container className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
        >
            <div className="w-100" style={{ maxWidth: '400px' }}>
                <Card style={{ padding: '10px' }}>
                    <Card.Body>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                        </div>
                        <h2 className="text-center mb-4">Sign Up</h2>
                        {/* {currentUser && currentUser.email} */}
                        {error && <Alert variant="danger"><InfoIcon></InfoIcon> {error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="email">
                                <Form.Label for="email">Email<span className="text-danger"> *</span></Form.Label>
                                <Form.Control
                                    className="pr-4"
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
                            <Form.Group id="password-confirm" className="mt-2">
                                <Form.Label for="password-confirmation">Password-confirmation<span className="text-danger"> *</span></Form.Label>
                                <Form.Control

                                    type="password"
                                    ref={passwordConfirmRef}
                                    placeholder="Confirm password"
                                    required
                                />
                            </Form.Group>
                            <Button
                                type="submit"
                                className="w-100 mt-3"
                                variant="contained"
                                disabled={loading}
                                color="primary"
                            >Sign Up</Button>
                        </Form>
                        <div className="mt-2 text-center">
                            Already have an account? <Link to="/login">Log In</Link>
                        </div>
                    </Card.Body>
                </Card>
            </div>
            {/* <ParticlesBg type="random" bg={true}/> */}
        </Container>
    )
}