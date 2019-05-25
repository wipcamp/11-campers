import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import checkIn from './pages/checkIn';
import login from './pages/login';
import admin from './pages/admin';

class Routes extends React.Component {
  render(){
    return(
      <Router>
          <div className="body">
            <Route exact path="/" component={checkIn} />
            <Route exact path="/login" component={login} />
            <Route exact path="/admin" component={admin} />
          </div>
      </Router>
    )
  }
}

export default Routes