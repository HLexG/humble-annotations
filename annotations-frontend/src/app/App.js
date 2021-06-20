import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  ThemeProvider,
  CssBaseline
} from '@material-ui/core';
import './App.css';
import Theme from "./Theme";
import AppRoutes from "./AppRoutes";
import Content from "../common/Content";
import Header from "../common/Header";
import DataService from '../services/DataService';
import { AuthContextProvider } from '../services/AuthService';
import { EnumContextProvider } from '../services/EnumService';
import SideMenu from '../common/SideMenu';



const App = (props) => {

  console.log("================================== App ======================================");

  // Init Data Service
  DataService.Init();

  // State
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open)
    console.log("drawer toggled!");
  };

  // Build App
  let view = (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={Theme}>
        <AuthContextProvider>
          <EnumContextProvider>
            <Router basename="/">
              <Header toggleDrawer={toggleDrawer}></Header>
              <SideMenu
                toggleDrawer={toggleDrawer}
                drawerOpen={drawerOpen}
              ></SideMenu>
              <Content drawerOpen={drawerOpen}>
                <AppRoutes />
              </Content>
            </Router>
          </EnumContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </React.Fragment>
  )

  // Return View
  return view
}

export default App;
