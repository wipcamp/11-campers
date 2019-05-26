import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import checkIn from './pages/checkIn';
import login from './pages/login';

class Routes extends React.Component {
  render(){
    return(
      <Router>
          <div className="body">
            <Route exact path="/" component={login} />
            <Route exact path="/login" component={login} />
            <Route exact path="/checkin" component={checkIn} />
          </div>
      </Router>
    )
  }
}

export default Routes