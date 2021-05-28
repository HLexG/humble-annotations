import React, {useEffect, useRef, useState} from 'react';
import { withStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';

import SettingsMenu from '../SettingsMenu'
import AuthService, { useAuthContext} from "../../../services/AuthService";
import styles from './styles';
import {handleSaveClick} from './handlers';

const Profile = ( props ) => {
    const {classes} = props;
    const { history } = props;

    console.log("================================== Profile ======================================");

    // Get Auth Context
    const auth = useAuthContext();

    // Component States
    const [username , setUsername] = useState(null);
    const [fullname , setFullname] = useState('');
    const loadProfile = () => {
        AuthService.GetProfile()
            .then(function (response) {
                //setProfile(response.data);
                let profile = response.data;
                setUsername(profile["username"]);
                setFullname(profile["full_name"]);
            })
    }

    // Setup Component
    useEffect(() => {
        // Load User profile
        if(auth.state.isAuthenticated){
            loadProfile();
        }
      }, []);
    
    return (
        <div className={classes.root}>
            <main className={classes.main}>
                <Container maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item sm={4}>
                            <SettingsMenu page="profile"/>
                        </Grid>
                        <Grid item sm={8}>
                            <Typography variant="h6" gutterBottom>
                                Profile Settings
                            </Typography>
                            <Divider />
                            <div className={classes.inputContainer}>
                                <TextField
                                    label="Full name"
                                    placeholder="Full name"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    value={fullname}
                                    onChange={(e) => setFullname(e.target.value)}
                                />
                                <TextField
                                    label="GitHub username"
                                    placeholder="GitHub username"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Twitter handle"
                                    placeholder="Twitter handle"
                                    helperText=""
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Research interests"
                                    placeholder="Research interests"
                                    helperText=""
                                    fullWidth
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.buttonContainer}>
                                <Button variant="outlined" color="primary" onClick={(event)=>handleSaveClick(event, username, fullname, auth)}>Save</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
};

export default withStyles( styles )( Profile );