import React from "react";
import { Route, Switch , Redirect} from 'react-router-dom';
import Home from "../components/Home";
import Error404 from '../components/Error/404';
import Login from '../components/auth/Login';
import Signup from '../components/auth/Signup';
import Logout from '../components/auth/Logout';
import Account from '../components/settings/Account';
import Profile from '../components/settings/Profile';
// import Annotation from "../components/Annotation";
// import EditAnnotations from "../components/EditAnnotations";
import { useAuthContext} from "../services/AuthService";
import Datasets from "../components/Datasets";



const AppRouter = ( props ) => {

    console.log("================================== AppRouter ======================================");

    function AuthenticatedRoute({ children, ...rest }) {
        // Get Auth Context
        const auth = useAuthContext();

        return (
          <Route
            {...rest}
            render={({ location }) =>
              auth.state.isAuthenticated ? (
                children
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                    state: { from: location }
                  }}
                />
              )
            }
          />
        );
      }

    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/login" exact component={Login} />
                <Route path="/logout" exact component={Logout} />
                <AuthenticatedRoute path="/settings/account">
                    <Account />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/settings/profile">
                    <Profile />
                </AuthenticatedRoute>
                <Route path="/datasets" exact component={Datasets} />
                <Route component={Error404} />
            </Switch>
        </React.Fragment>
    );
}

export default AppRouter;