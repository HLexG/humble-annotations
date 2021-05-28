import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import SettingsMenu from '../SettingsMenu'
import AuthService,{ useAuthContext} from "../../../services/AuthService";
import styles from './styles';
import {handleSaveClick} from './handlers'

const Account = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Account ======================================");

    // Get Auth Context
    const auth = useAuthContext();

    // Component States
    const [username , setUsername] = useState('');
    const [email , setEmail] = useState('');
    const loadAccount = () => {
        AuthService.GetAccount()
            .then(function (response) {
                //setProfile(response.data);
                let account = response.data;
                setUsername(account["username"]);
                setEmail(account["email"]);
            })
    }

    // Setup Component
    useEffect(() => {
        if(auth.state.isAuthenticated){
            loadAccount();
        }
      }, []);
    
    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="md">
                    <Grid container spacing={2}>
                        <Grid item sm={4}>
                            <SettingsMenu page="account"/>
                        </Grid>
                        <Grid item sm={8}>
                            <Typography variant="h6" gutterBottom>
                                Account Settings
                            </Typography>
                            <Divider />
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
                                    disabled
                                />
                                <TextField
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
                                    label="Password"
                                    placeholder="Enter new password"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="outlined" color="primary" onClick={(event)=>handleSaveClick(event, username, email)}>Save</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default withStyles( styles )( Account );