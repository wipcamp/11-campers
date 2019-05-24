import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
// Component
import checkIn from './pages/checkIn';

class Routes extends React.Component {
  render(){
    return(
      <Router>
          <div className="body">
            <Route exact path="/" component={checkIn} />
          </div>
      </Router>
    )
  }
}

export default Routes