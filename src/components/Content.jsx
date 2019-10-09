// required
import React from 'react'
import { Route } from 'react-router-dom'
// Custom compnents
import Home from './pages/Home'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'




const Content = props => {
    return (
        <div className="container">

            <Route exact path="/" component={Home} />
            <Route path="/profile" render={
                () => <Profile user={props.user} />

            } />
            <Route path="/login" render={
                () => <Login user={props.user} updateUser={props.updateUser} />
            } />
            <Route path="/signup" render={
                () => <Signup user={props.user} updateUser={props.updateUser} />
            } />

        </div>
    )
}

export default Content