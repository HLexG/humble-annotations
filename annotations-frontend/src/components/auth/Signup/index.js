import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import styles from './styles';
import {handleSignupClick} from './handlers'

const Signup = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Signup ======================================");

    // Component States
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');
    const [isAccountCreated,setIsAccountCreated] = useState(false);

    // Setup Component
    useEffect(() => {
        if(isAccountCreated){
            history.push('/login')
        }
      }, [isAccountCreated]);
    
    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm">
                    <Card>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Sign Up
                            </Typography>
                            <Typography color="textSecondary">
                                Join the Humble NLP community!
                            </Typography>
                            <div className={classes.inputContainer}>
                                <TextField
                                    id="outlined-full-width"
                                    label="Username"
                                    placeholder="Username"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <TextField
                                    id="outlined-full-width"
                                    label="Email"
                                    placeholder="Email"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <TextField
                                    id="outlined-full-width"
                                    label="Password"
                                    placeholder="Password"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="outlined" color="primary" onClick={(event)=>handleSignupClick(event, username, email, password, setIsAccountCreated)} >Create Account</Button>
                            </div>
                            
                            <Typography color="textSecondary">
                                Already have an account? &nbsp;<Link to="/login">Login</Link>
                            </Typography>
                        </CardContent>
                    </Card>
                </Container>
            </main>
        </div>
    );
};

export default withStyles( styles )( Signup );