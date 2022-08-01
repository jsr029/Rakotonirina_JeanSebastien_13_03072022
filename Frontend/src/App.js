import React from 'react'
import { Router, Route, Switch } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import UserProfile from './components/UserProfile'
import EditProfile from './components/EditProfile'
import { createBrowserHistory } from 'history'
import "./styles/main.css"

export const history = createBrowserHistory()
export const baseUrl = 'http://localhost:27017/api/v1/user'
function App() {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/sign-in' component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/user/:name" component={UserProfile} />
        <Route path="/edit-profile/:name" component={EditProfile} />
      </Switch>
    </Router>
  );
}

export default App;
