import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './components/logout'
import UserPage from './pages/UserPage'
import "./styles/main.css"

function App() {
  return (
    <Router>
      <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
           <Route path='/logout' component={Logout} />
            <Route path='/user' component={UserPage} />
      </Switch>
    </Router>
  );
}

export default App;
