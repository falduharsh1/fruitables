import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Coupon() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div>Coupon</div>
            <br></br>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <br></br>
                <Dialog
                    open={open}
                    onClose={handleClose}
                >
                    <DialogTitle>Coupon Form</DialogTitle>
                    <DialogContent>

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="Coupon_code"
                            label="Coupon Code"
                            type="name"
                            fullWidth
                            variant="standard"
                        />

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="dis"
                            name="discount"
                            label="Discount"
                            type="number"
                            fullWidth
                            variant="standard"
                        />

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="from"
                            name="from"
                            label="From"
                            type="date"
                            fullWidth
                            variant="standard"
                        />

                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="to"
                            name="to"
                            label="To"
                            type="date"
                            fullWidth
                            variant="standard"
                        />

                        {/* <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="name"
                            name="email"
                            label="Active"
                            type="email"
                            fullWidth
                            variant="standard"
                        /> */}

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">Submit</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}
