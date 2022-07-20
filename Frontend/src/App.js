import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Logout from './components/logout'
import SignUP from './pages/SignUp'
import UserPage from './pages/UserPage'
import Edit from './components/Edit'
import "./styles/main.css"

export const baseUrl = 'http://127.0.0.1:3001/api/v1/user'
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <Route path='/sign-up' component={SignUP} />
        <Route path='/logout' component={Logout} />
        <Route path='/user' component={UserPage} />
        <Route path='/edit' component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
