import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Nav extends Component {

    handleLogout = (e) => {
        e.preventDefault()
        // remove token from localStorage (or cookies)
        localStorage.removeItem('mernToken')
        // update the state of he App
        this.props.updateUser()
    }

    render() {
        let links = ''

        // if the use is logged in, show profile page and logout links
        if (this.props.user) {
            links = (
                <span>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <a href="/" onClick={this.handleLogout}>Logout</a>
                    </li>
                </span>
            )
        }
        else {
            links = (
                <span>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                </span>
            )
        }


        return(
            <nav>
                <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                
                    {links}
                
                </ul>
            </nav>
        )
    }
}

export default Nav