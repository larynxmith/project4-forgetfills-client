import React, { useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import List from './List';
import { datePickerDefaultProps } from '@material-ui/pickers/constants/prop-types';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';


import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';


const Profile = props => {

    if(!props.user) {
        return <Redirect to="/" />
    }
    return (
        <div>
            <Box >
                <Grid container spacing={3}>
                    <Grid item xs >
                        <img src={props.user.profileUrl}></img>
                    </Grid>
                    <Grid item xs>
                        <h2>{props.user.firstname}'s Profile({props.user.email})<UpdateUser user={props.user} updateUser={props.updateUser} /><DeleteUser user={props.user} updateUser={props.updateUser} /></h2>
                    </Grid>

                </Grid>
            </Box>
            <hr />
            <List user={props.user}/>
        </div>
    )
}

export default Profile