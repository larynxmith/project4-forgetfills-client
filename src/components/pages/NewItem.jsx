import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import BASE_URL from '../../constants';


const NewItem = (props) => {

    const [open, setOpen] = React.useState(false)

    const [values, setValues] = React.useState({
        listItem: '',
        lastChanged: '',
        nextChanged: '',
        itemDetails: ''
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
        console.log('values: ', values)
        axios.post(`${BASE_URL}/listItems`,
            {
                listItem: values.listItem,
                lastChanged: values.lastChanged,
                nextChanged: values.nextChanged,
                itemDetails: values.itemDetails
            },
            {
                headers: { 'Authorization': `Bearer ${token}` }
            })
            .then(response => {
                console.log('ITEM ADDED', response)
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }




    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Add to Your Forgetfuls
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Add a New Item!</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Fill out the Fields Below:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="listItem"
                        label="listItem"
                        type="text"
                        fullWidth
                        value={values.listItem}
                        onChange={handleChange('listItem')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="lastChanged"
                        label="lastChanged"
                        type="date"
                        fullWidth
                        value={values.lastChanged}
                        onChange={handleChange('lastChanged')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="nextChanged"
                        label="nextChanged"
                        type="date"
                        fullWidth
                        value={values.nextChanged}
                        onChange={handleChange('nextChanged')}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="itemDetails"
                        label="itemDetails"
                        type="text"
                        fullWidth
                        value={values.itemDetails}
                        onChange={handleChange('itemDetails')}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleSubmit} color="primary">
                        Add Item
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
export default NewItem