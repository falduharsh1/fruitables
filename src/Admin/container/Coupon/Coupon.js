import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FormControlLabel, Checkbox } from '@mui/material';
import { useFormik } from 'formik';
import { object, string, number, date, InferType, boolean } from 'yup';


export default function Coupon() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const CouponSchema = object({
        Coupon_code: string().required(),
        discount: number().required().integer(),
        from: date().required(),
        to: date().required(),
        active: boolean().required().default(false),
    });

    const formik = useFormik({
        initialValues: {
            Coupon_code: '',
            discount: '',
            from: '',
            to: '',
            active: false,
        },
        validationSchema: CouponSchema,
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const { handleSubmit, handleBlur, handleChange, errors, setValues, values, touched, resetForm, setFieldValue } = formik


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
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>Coupon Form</DialogTitle>
                        <DialogContent>

                            <TextField
                                margin="dense"
                                id="name"
                                name="Coupon_code"
                                label="Coupon Code"
                                type="name"
                                value={values.Coupon_code}
                                error={errors.Coupon_code & touched.Coupon_code}
                                helperText={errors.Coupon_code && touched.Coupon_code ? (<span style={{ color: 'red' }}>{errors.Coupon_code}</span>) : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                id="dis"
                                name="discount"
                                label="Discount"
                                type="number"
                                value={values.discount}
                                error={errors.discount & touched.discount}
                                helperText={errors.discount && touched.discount ? (<span style={{ color: 'red' }}>{errors.discount}</span>) : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                id="from"
                                name="from"
                                label="From"
                                type="date"
                                value={values.from}
                                error={errors.from & touched.from}
                                helperText={errors.from && touched.from ? (<span style={{ color: 'red' }}>{errors.from}</span>) : ''}
                                onChange={handleChange}
                                onBlur={handleBlur} 
                                fullWidth
                            />

                            <TextField
                                margin="dense"
                                id="to"
                                name="to"
                                label="To"
                                type="date"
                                value={values.to}
                                error={errors.to & touched.to}
                                helperText={errors.to && touched.to ? (<span style={{ color: 'red' }}>{errors.to}</span>) : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />

                            {/* <FormControlLabel
                                control={<Checkbox name="active" />}
                                label="Active"
                                checked={values.active}
                                helperText={errors.active && touched.active ? errors.active : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                name="active"
                            /> */}

{/* <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
<label for="vehicle1"> I have a bike</label><br>
<input type="checkbox" id="vehicle2" name="vehicle2" value="Car">
<label for="vehicle2"> I have a car</label><br> */}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">Submit</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </React.Fragment>
        </>
    )
}
