import React from 'react'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    link: {
        margin: theme.spacing(1),
    },
}));

const Nav = props => {
    const classes = useStyles();

    const handleLogout = (e) => {
        e.preventDefault()
        // remove token from localStorage (or cookies)
        localStorage.removeItem('mernToken')
        // update the state of he App
        props.updateUser()
    }


        let links = ''

        // if the user is logged in, show profile page and logout links
        if (props.user) {
            links = (
                <span>
                    <li>
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li>
                        <a href="/" onClick={handleLogout}>Logout</a>
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

export default Nav