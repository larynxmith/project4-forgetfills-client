import React from 'react'
import { Redirect } from 'react-router-dom'
import List from './List';


const Profile = props => {
    if(!props.user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <h2>{props.user.firstname}'s Profile</h2>
            <hr />
            <List />
        </div>
    )
}

export default Profile