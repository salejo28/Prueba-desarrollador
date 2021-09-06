import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom'
import './App.css';
import { Nav } from './components/Nav';
import { routes } from './config/routes';
import { AuthProvider } from './context/index'
import { AppRoutes } from './components/AppRoutes'

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        {
          routes.map(route => (
            <AppRoutes 
              exact
              key={route.path}              
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
              isSpeaker={route.isSpeaker}
              isAttendant={route.isAttendant}
            />
          ))
        }
      </Switch>
    </Router>
  );
}

function main() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  )
}

export default main;
