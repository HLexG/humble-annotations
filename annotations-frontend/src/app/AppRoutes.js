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
import EditAnnotations from "../components/EditAnnotations";
import { useAuthContext} from "../services/AuthService";
import DatasetsOverview from "../components/DatasetsOverview";
import DocsOverview from "../components/DocsOverview";
import CrossDocOverview from "../components/CrossDocOverview";
import EntityLinking from "../components/EntityLinking";
import CrossDoc from  "../components/CrossDoc";

import DocStats from "../components/DocStats"
import Progress from "../components/ProgressView"
// 

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
                {/* <AuthenticatedRoute path="/grounding">
                  <EntityLinking />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/datasets">
                  <DatasetsOverview />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/datasets/:dsID" >
                  <DocsOverview />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/cross_doc/:dsID" >
                  <CrossDocOverview />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/docs_entity/:docID" >
                  <EditAnnotations />
                </AuthenticatedRoute>
                <AuthenticatedRoute path="/docs_event/:docID" >
                  <EditAnnotations />
                </AuthenticatedRoute> */}
                
                <Route path="/datasets" exact component={DatasetsOverview} />
                <Route path="/datasets/:dsID" exact component={DocsOverview} />
                <Route path="/datasets/cross_doc/:dsID" exact component={CrossDocOverview} />
                <Route path="/docs_entity/:id" exact component={EditAnnotations} />
                <Route path="/docs_event/:id" exact component={EditAnnotations} />
                <Route path="/grounding/:cluster_id" exact component={EntityLinking} />
                <Route path="/crossdoc" exact component={CrossDoc} />
                <Route path="/DocStats" exact component={DocStats} />
                <Route path="/progress/:dsID" exact component={Progress} />

                <Route component={Error404} />
            </Switch>
        </React.Fragment>
    );
}

export default AppRouter;
{/* 
<Route path="/datasets" exact component={} />
<Route path="/datasets/:dsID" exact component={DocsOverview} />
<Route path="/docs/:docID" exact component={EditAnnotations} />


*/}