import axios from 'axios';
import BASE_URL from '../../constants';
import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CreateIcon from '@material-ui/icons/Create'


import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'


const UpdateUser = (props) => {

    const [open, setOpen] = React.useState(false)

    const [values, setValues] = React.useState({
        firstname: props.user.firstname,
        lastname: props.user.lastname,
        email: props.user.email,
        password: props.user.password,
        profileUrl: props.user.profileUrl
    });

    function handleClickOpen() {
        setOpen(true)
    }

    function handleClose() {
        setOpen(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setOpen(false)
        let token = localStorage.getItem('mernToken')
        axios.put(`${BASE_URL}/profiles/${props.user._id}`,
            {
                firstname: values.firstname,
                lastname: values.lastname,
                email: values.email,
                password: values.password,
                profileUrl: values.profileUrl
            },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                console.log('update user: ', props.updateUser)
                console.log('USER UPDATED', response)
                props.updateUser()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = (name, e) => {
        if (e.target) {
            setValues({ ...values, [name]: e.target.value })
        }
        
    }



    return (
        <div>
            <Button  color="primary" onClick={handleClickOpen}>
                <CreateIcon />
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update {props.listItem}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update {props.user.firstname}'s Profile:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="listItem"
                        label="First Name"
                        type="text"
                        fullWidth
                        value={values.firstname}
                        onChange={e => handleChange('firstname', e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="listItem"
                        label="Last Name"
                        type="text"
                        fullWidth
                        value={values.lastname}
                        onChange={e => handleChange('lastname', e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="listItem"
                        label="Email"
                        type="email"
                        fullWidth
                        value={values.email}
                        onChange={e => handleChange('email', e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="listItem"
                        label="Password"
                        type="password"
                        fullWidth
                        value={values.password}
                        onChange={e => handleChange('password', e)}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="listItem"
                        label="Profile Pic"
                        type="text"
                        fullWidth
                        value={values.profileUrl}
                        onChange={e => handleChange('profileUrl', e)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Update {props.listItem}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default UpdateUser