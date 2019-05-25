import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import checkIn from './pages/checkIn';
import login from './pages/login';

class Routes extends React.Component {
  render(){
    return(
      <Router>
          <div className="body">
            <Route exact path="/" component={checkIn} />
            <Route exact path="/login" component={login} />
          </div>
      </Router>
    )
  }
}

export default Routes