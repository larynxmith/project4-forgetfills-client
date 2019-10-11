import axios from 'axios';
import BASE_URL from '../../constants';
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteUser = (props) => {

    const [open, setOpen] = React.useState(false)
    const [redirect, setRedirect] = useState(false);

    function handleClickOpen() {
        setOpen(true);
    }

    function handleCancel() {
        setOpen(false)
        setRedirect(false)
    }

    function handleClose() {
        setOpen(false)
        setRedirect(true)

    }

    const handleDelete = () => {
        let token = localStorage.getItem('authToken')
        console.log(token)
        axios.delete(`${BASE_URL}/profiles/${props.user._id}`,
            {
                headers: { 'Authorization': `Bearer ${token}` }
            }
        )

            .then(response => {
                console.log(response)
                localStorage.removeItem('authToken')
                props.updateUser()
            })
            .catch(err => {
                console.log(err)
            })
        handleClose()
        console.log('USER DELETED')
    }

    if (redirect === true) {
        return (
            <Redirect to='/' />
        )
    } else {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Delete User
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"YOU HAVE ELECTED TO BE REMOVED FROM OUR SYSTEMS!!!"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you Really, REALLY Sure You Want to Delete Your Account...?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCancel} color="primary">
                            No, I've Changed My Mind
                        </Button>
                        <Button onClick={handleDelete} color="primary" autoFocus>
                            Yes, Please Delete My Account
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default DeleteUser