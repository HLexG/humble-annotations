import React from 'react';
import { Redirect } from 'react-router-dom';

import { useAuthContext} from "../../../services/AuthService";

const Logout = ( props) => { 
    console.log("================================== Logout ======================================");

    //localStorage.removeItem("auth")

    // Get Auth Context
    const auth = useAuthContext();

    // Logout
    auth.dispatch({
        type: "LOGOUT"
      })

    return (
        <Redirect to="/" push={true} />
        //<div>Logout</div>
    );
};
export default Logout;