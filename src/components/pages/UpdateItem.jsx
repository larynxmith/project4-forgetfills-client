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

import MomentUtils from '@date-io/moment'
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker
} from '@material-ui/pickers'


const UpdateItem = (props) => {

    const [open, setOpen] = React.useState(false)

    const [values, setValues] = React.useState({
        listItem: props.listItem,
        lastChanged: props.lastChanged,
        nextChanged: props.nextChanged,
        itemDetails: props.itemDetails
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
        axios.put(`${BASE_URL}/listItems`,
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
                console.log('ITEM UPDTAED', response)
                props.getItems()
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = (name, e, d) => {
        console.log(e)
        console.log(name)
        console.log(d)
        if (e.target) {
            setValues({ ...values, [name]: e.target.value })
        }
        else if (name === 'lastChanged' || name === 'nextChanged') {
            setValues({ ...values, [name]: d })
        }
    }



    return (
        <div>
            {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Update {props.listItem}
            </Button> */}
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Update {props.listItem}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Update the Necessary Fields Below:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="listItem"
                        label="What Would You Like to Forget?"
                        type="text"
                        fullWidth
                        value={values.listItem}
                        onChange={e => handleChange('listItem', e)}
                    />
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <KeyboardDatePicker
                            margin="dense"
                            id="lastChanged"
                            name='lastChanged'
                            label="Date Last Changed"
                            format="MM/DD/YYYY"
                            value={values.lastChanged}
                            onChange={(e, x) => handleChange('lastChanged', e, x)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <span>    </span>
                        <KeyboardDatePicker
                            margin="dense"
                            id="nextChanged"
                            label="Next Change Date"
                            format="MM/DD/YYYY"
                            value={values.nextChanged}
                            onChange={(e, x) => handleChange('nextChanged', e, x)}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                    </MuiPickersUtilsProvider>
                    <TextField
                        margin="dense"
                        id="itemDetails"
                        label="Got Some Particulars You're Never Gonna Remember Anyway?"
                        type="text"
                        fullWidth
                        onChange={e => handleChange('itemDetails', e)}
                        value={values.itemDetails}
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
export default UpdateItem