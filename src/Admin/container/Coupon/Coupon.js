import React, { useEffect, useState } from 'react'
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
import Switch from '@mui/material/Switch';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCoupon, getCoupon, postCoupon, putCoupon } from '../../../redux/Slice/couponSlice';
import dayjs from 'dayjs';
const label = { inputProps: { 'aria-label': 'Switch demo' } };

export default function Coupon() {

    const [open, setOpen] = React.useState(false);
    const [update, setUpdate] = useState(false);

    const dispatch = useDispatch()

    const CouponSelecter = useSelector(state => state.Coupon)
    console.log(CouponSelecter);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        resetForm()
    };

    const handleDelete = (id) => {
        dispatch(deleteCoupon(id))
    }

    const handleEdit = (data) => {
        setValues(data)
        setUpdate(true)
        handleClickOpen()
        dispatch(putCoupon(data))
    }

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
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));
            if (update) {
                dispatch(putCoupon(values))
            } else {
                handleData({ ...values, id: Math.floor(Math.random() * 1000) })
            }

            resetForm() 
            handleClose()
        },
    });

     const handleData = (values) => {
            dispatch(postCoupon(values))
     } 

     const DataGet = () => {
        dispatch(getCoupon())
     }
     
     useEffect(() => {
        DataGet()
     },[]) 

    const { handleSubmit, handleBlur, handleChange, errors, setValues, values, touched, resetForm, setFieldValue } = formik

    const columns = [
        { field: 'Coupon_code', headerName: 'Coupon Code', width: 130 },
        { field: 'discount', headerName: 'Discount', width: 130 },
        { field: 'from', headerName: 'From Date', width: 130 },
        { field: 'to', headerName: 'To Date', width: 130 },
        { field: 'active', headerName: 'Active / InActive', width: 130 },
        {
            headerName: 'Actions', width: 300,
            renderCell: (params) => {
                return (
                    <>
                        <Button variant="contained" color="success" onClick={() => handleEdit(params.row)}>
                            Edit
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => handleDelete(params.row._id)}>
                            Delete
                        </Button>
                    </>
                )
            }
        }
    ];

    const paginationModel = { page: 0, pageSize: 5 };

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
                                value={dayjs(values.from).format("YYYY-MM-DD")}
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
                                value={dayjs(values.to).format("YYYY-MM-DD")}
                                error={errors.to & touched.to}
                                helperText={errors.to && touched.to ? (<span style={{ color: 'red' }}>{errors.to}</span>) : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                fullWidth
                            />

                            <Switch {...label} defaultChecked
                                name="active"
                                checked={values.active}
                                helperText={errors.active && touched.active ? errors.active : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Upadte' : 'Submit'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <Paper sx={{ height: 400, width: '100%' }}>
                    <DataGrid
                        rows={CouponSelecter?.Coupon}
                        getRowId={(row) => row._id}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>
            </React.Fragment>
        </>
    )
}
