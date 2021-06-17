import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from "react-router-dom";
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {useAuthContext} from "../../../services/AuthService";
import styles from './styles';
import {handleLoginClick} from './handlers'

const Login = ( props ) => {
    const {classes} = props;
    let history = useHistory();

    console.log("================================== Login ======================================");

    // Get Auth Context
    const auth = useAuthContext();

    // Component States
    const [username , setUsername] = useState('');
    const [password , setPassword] = useState('');
    const [isAuthenticated,setIsAuthenticated] = useState(false);

    // Setup Component
    useEffect(() => {
        if(isAuthenticated){
            history.push('/')
        }
      }, [isAuthenticated]);
    
    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="sm">
                    <Card>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Log In
                            </Typography>
                            <Typography color="textSecondary">
                                Don't have an account?&nbsp;<Link to="/signup">Sign up</Link>
                            </Typography>
                            <div className={classes.inputContainer}>
                                <TextField
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
                                <Button variant="outlined" color="primary" onClick={(event)=>handleLoginClick(event, username, password, auth, setIsAuthenticated)}>Login</Button>
                            </div>
                        </CardContent>
                    </Card>
                </Container>
            </main>
        </div>
    );
};

export default withStyles( styles )( Login );