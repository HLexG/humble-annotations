import React from "react";
import { Route, Switch } from 'react-router-dom';
import Home from "../components/Home";
import EditAnnotations from "../components/EditAnnotations";
import Dashboard from '../components/Dashboard';
import Progress from '../components/ProgressView';
import Error404 from '../components/Error/404';


const AppRouter = ( props ) => {

    console.log("================================== AppRouter ======================================");

    return (
        <React.Fragment>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/annotations" exact component={EditAnnotations} />
                <Route path="/annotations/:id" exact component={EditAnnotations} />
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/progress" exact component={Progress} />
                <Route path="/progress/:id" exact component={Progress} />
                <Route component={Error404} />
            </Switch>
        </React.Fragment>
    );
}

export default AppRouter;