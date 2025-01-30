// name: only character and space allowed, max 30, min 2
// age: positive and greater than zero
// address: maximum 100 word allowed
// bod: must be in past / current
// file: must be less or equal size of 2MB, and png and jpef only allowed
// country: dropdown must be select
// gender: radio button must be selected
// hobby: must be any 2 hobby select

import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { array, bool, date, mixed, number, object, string } from 'yup';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { addMyAuto, deleteMyAuto, editMyAuto, getMyAuto } from '../../redux/Slice/MyAutoSlice';
import { Box } from '@mui/material';

export default function MyAuto() {

    const [open, setOpen] = React.useState(false);
    const [update , setUpdate] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false)
        resetForm()
    };

    const dispatch = useDispatch()

    const MyAutoSelector = useSelector((state => state.MyAuto))

    console.log(MyAutoSelector);

    let formSchema = object({

        name: string()
            .matches(/^[a-zA-Z ]*$/, "Only characters allowed.")
            .max(30)
            .min(2)
            .required(),

        age: number()
            .required()
            .min(1)
            .integer(),

        address: string()
            .test('address', 'Maximum 100 word allowed', (value) => {

                let str = value.trim().split(" ").length

                if (str > 100) {
                    return false
                } else {
                    return true
                }
            })
            .required(),

        bod: date()
            .required()
            .max(new Date(), "Not valid Date"),

        file: mixed()
            .required("You need to provide a file")
            .test("file", "The file is too large", (value) => {

                if(typeof value === 'string'){
                    return true
                }else if(typeof value === 'object'){
                    return value && value.size <= 2000000;
                }
               
            })
            .test("type", "Only the following formats are accepted: .jpeg, .png", (value) => {

                if(typeof value === 'string'){
                    return true
                }else if(typeof value === 'object'){
                    return value && (
                        value.type === "image/jpeg" ||
                        value.type === "image/png"
                    )     
                }

                
            }),
        select: string()
            .notOneOf(["0"], "Please select country")
            .required("please enter a country"),
       
        Gender: string()
            .notOneOf(["0"], "Please select Gender")
            .required("please enter a Gender"),
               
        select_hobby: array()
            .min(2)
            .notOneOf(["0"], "Please select Gender")
            .required("please enter 2 hobby")
    })

    const handleMyAutoData = (values) => {
        dispatch(addMyAuto(values))
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            age: '',
            address: '',
            bod: '',
            file: '',
            select: '',
            Gender: '',
            select_hobby: []
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            // alert(JSON.stringify(values, null, 2));
            console.log(values);

            if(update){
                dispatch(editMyAuto({...values, file: values?.file?.name ? values?.file?.name : values.file }))
            }else{
                handleMyAutoData({ ...values, file: values?.file?.name  })
            }

            resetForm()
            handleClose()
        },
    });

    const { handleSubmit, handleBlur, handleChange, errors, setValues, values, touched, setFieldValue, resetForm } = formik;

    const columns = [
        { field: 'name', headerName: 'Name', width: 100 },
        { field: 'age', headerName: 'Age', width: 100 },
        { field: 'address', headerName: 'Address', width: 130 },
        { field: 'bod', headerName: 'BOD', width: 130 },
        {
            field: 'file', headerName: 'Image', width: 150,
            renderCell: (params) => <Box component="img"
                sx={{
                    height: 46,
                    width: 56,
                }}
                src={"img/"+ params.value}
            />,
        },
        { field: 'select', headerName: 'Country', width: 100 },
        { field: 'Gender', headerName: 'Gender', width: 100 },
        { field: 'select_hobby', headerName: 'Hobby', width: 200 },
        {
            headerName: 'Actions', width: 180,
            renderCell: (params) => {
                return (
                    <>
                        <>
                            <Button style={{marginRight : '6px'}} variant="contained" color="success" onClick={() => handleEdit(params.row)}>
                                Edit
                            </Button>
                            <Button variant="outlined" color="error" onClick={() => handleDelete(params.row.id)}>
                                Delete
                            </Button>
                        </>
                    </>
                )
            }
        }
    ];

    const handleDelete = (id) => {
        dispatch(deleteMyAuto(id))
    }

    const handleEdit = (data) => {
        setUpdate(true)
        handleClickOpen()
        setValues(data)
        dispatch(editMyAuto(data))
    }

    const paginationModel = { page: 0, pageSize: 5 };

    const DataGet = () => {
        dispatch(getMyAuto())
    }

    useEffect(() => {
        DataGet()
    }, [])
    

    return (
        <>
            <div style={{ marginTop: '12%', marginLeft: '45%' }}>
                <h3 style={{ marginTop: '12%', marginLeft: '-10%' }}>Basic Information Form </h3>
                <br></br>
                <React.Fragment >
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Open form
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                    >
                        <form onSubmit={handleSubmit}>
                            <DialogTitle>Details</DialogTitle>
                            <DialogContent>

                                <TextField
                                    required
                                    margin="dense"
                                    id="name"
                                    name="name"
                                    label="Name"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    value={values.name}
                                    error={errors.name && touched.name}
                                    helperText={errors.name && touched.name ? errors.name : ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    required
                                    margin="dense"
                                    id="age"
                                    name="age"
                                    label="Age"
                                    type="number"
                                    fullWidth
                                    variant="standard"
                                    value={values.age}
                                    error={errors.age && touched.age}
                                    helperText={errors.age && touched.age ? errors.age : ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    required
                                    margin="dense"
                                    id="address"
                                    name="address"
                                    label="Address"
                                    type="name"
                                    fullWidth
                                    variant="standard"
                                    value={values.address}
                                    error={errors.address && touched.address}
                                    helperText={errors.address && touched.address ? errors.address : ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <TextField
                                    required
                                    margin="dense"
                                    id="bod"
                                    name="bod"
                                    label="Birth Date"
                                    type="date"
                                    fullWidth
                                    variant="standard"
                                    value={values.bod}
                                    error={errors.bod && touched.bod}
                                    helperText={errors.bod && touched.bod ? errors.bod : ''}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />

                                <br></br>
                                <br></br>

                                <input
                                    type='file'
                                    name="file"
                                    onChange={(e) => { setFieldValue("file", e.target.files[0]) }}
                                    onBlur={handleBlur}
                                />

                                <img src={typeof values?.file === 'string' ? 'img/' + values?.file :'img/' + values?.file.name } width={'100px'} height={'100px'} />

                                {errors.file && touched.file ? <span style={{ color: "red" }}> {errors.file} </span> : ''}

                                <br></br>
                                <br></br>

                                <select
                                    required
                                    name='select'
                                    margin="dense"
                                    label="Select your Country"
                                    fullWidth
                                    variant="standard"
                                    value={values.select}
                                    onChange={handleChange}
                                    onBlur={handleBlur}>
                                    <option value='0'>Select a Country</option>
                                    <option value='INDIA'>INDIA</option>
                                    <option value='USA'>USA</option>
                                    <option value='DUBAI'>DUBAI</option>
                                </select>

                                {errors.select && touched.select ? <span style={{ color: "red" }}> {errors.select} </span> : ''}

                                <br></br>
                                <br></br>

                                <label>Please select your Gender :</label>
                                <br></br>
                                <input type="radio"
                                    id="male"
                                    name="Gender"
                                    margin="dense"
                                    label="Select Hobby"
                                    fullWidth
                                    value="Male"
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.Gender === 'Male' ? true : false}
                                />

                                <label>Male</label>

                                <input type="radio"
                                    id="female"
                                    name="Gender"
                                    margin="dense"
                                    label="Select Hobby"
                                    fullWidth
                                    value="Female"
                                    variant="standard"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.Gender === 'Female' ? true : false}
                                />

                                <label>Female</label>

                                {errors.Gender && touched.Gender ? <span style={{ color: "red" }}> {errors.Gender} </span> : ''}

                                <br></br>
                                <br></br>

                                <label>Please select your 2 hobby :</label>
                                <br></br>
                                <input type="checkbox"
                                    id="Cricket"
                                    name="select_hobby"
                                    margin="dense"
                                    label="Select Hobby"
                                    fullWidth
                                    variant="standard"
                                    value="Cricket"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.select_hobby.includes('Cricket')}
                                />

                                <label>Cricket</label>


                                <input type="checkbox"
                                    id="Football"
                                    name="select_hobby"
                                    margin="dense"
                                    label="Select Hobby"
                                    fullWidth
                                    variant="standard"
                                    value="Football"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.select_hobby.includes('Football')}
                                />

                                <label>Football</label>

                                <input type="checkbox"
                                    id="Chess"
                                    name="select_hobby"
                                    margin="dense"
                                    label="Select Hobby"
                                    fullWidth
                                    variant="standard"
                                    value="Chess"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.select_hobby.includes('Chess')}
                                />

                                <label>Chess</label>

                                <input type="checkbox"
                                    id="Kabadi"
                                    name="select_hobby"
                                    margin="dense"
                                    label="Select Hobby"
                                    fullWidth
                                    variant="standard"
                                    value="Kabadi"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    checked={values.select_hobby.includes('Kabadi')}
                                />

                                <label>Kabadi</label>

                                {errors.select_hobby && touched.select_hobby ? <span style={{ color: "red" }}> {errors.select_hobby} </span> : ''}

                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button type="submit">{update ? 'Update' : 'Submit'}</Button>
                            </DialogActions>
                        </form>
                    </Dialog>
                    <Paper sx={{ height: 400, width: '100%', marginTop: '6%', marginLeft: '-40%' }}>
                        <DataGrid
                            rows={MyAutoSelector?.MyAuto}
                            columns={columns}
                            initialState={{ pagination: { paginationModel } }}
                            pageSizeOptions={[5, 10]}
                            checkboxSelection
                            sx={{ border: 0 }}
                        />
                    </Paper>
                </React.Fragment>
            </div>
        </>
    )
}

// name: only character and space allowed, max 30, min 2
// age: positive and greater than zero
// address: maximum 100 word allowed
// bod: must be in past / current
// file: must be less or equal size of 2MB, and png and jpef only allowed
// country: dropdown must be select
// gender: radio button must be selected
// hobby: must be any 2 hobby select

// import React, { useEffect, useState } from 'react'
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useFormik } from 'formik';
// import { array, bool, date, mixed, number, object, string } from 'yup';
// import { DataGrid } from '@mui/x-data-grid';
// import Paper from '@mui/material/Paper';
// import { useDispatch, useSelector } from 'react-redux';
// import { addMyAuto, deleteMyAuto, editMyAuto, getMyAuto } from '../../redux/Slice/MyAutoSlice';
// import { Box } from '@mui/material';

// export default function MyAuto() {

//     const [open, setOpen] = React.useState(false);
//     const [update , setUpdate] = useState(false)

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         setOpen(false);
//         setUpdate(false)
//         resetForm()
//     };

//     const dispatch = useDispatch()

//     const MyAutoSelector = useSelector((state => state.MyAuto))

//     console.log(MyAutoSelector);

//     let formSchema = object({

//         name: string()
//             .matches(/^[a-zA-Z ]*$/, "Only characters allowed.")
//             .max(30)
//             .min(2)
//             .required(),

//         age: number()
//             .required()
//             .min(1)
//             .integer(),

//         address: string()
//             .test('address', 'Maximum 100 word allowed', (value) => {

//                 let str = value.trim().split(" ").length

//                 if (str > 100) {
//                     return false
//                 } else {
//                     return true
//                 }
//             })
//             .required(),

//         bod: date()
//             .required()
//             .max(new Date(), "Not valid Date"),

//         file: mixed()
//             .required("You need to provide a file")
//             .test("file", "The file is too large", (value) => {

//                 if(typeof value === 'string'){
//                     return true
//                 }else if(typeof value === 'object'){
//                     return value && value.size <= 2000000;
//                 }
               
//             })
//             .test("type", "Only the following formats are accepted: .jpeg, .png", (value) => {

//                 if(typeof value === 'string'){
//                     return true
//                 }else if(typeof value === 'object'){
//                     return value && (
//                         value.type === "image/jpeg" ||
//                         value.type === "image/png"
//                     )     
//                 }

                
//             }),
//         select: string()
//             .notOneOf(["0"], "Please select country")
//             .required("please enter a country"),
       
//         Gender: string()
//             .notOneOf(["0"], "Please select Gender")
//             .required("please enter a Gender"),
               
//         select_hobby: array()
//             .min(2)
//             .notOneOf(["0"], "Please select Gender")
//             .required("please enter 2 hobby")
//     })

//     const handleMyAutoData = (values) => {
//         dispatch(addMyAuto(values))
//     }

//     const formik = useFormik({
//         initialValues: {
//             name: '',
//             age: '',
//             address: '',
//             bod: '',
//             file: '',
//             select: '',
//             Gender: '',
//             select_hobby: []
//         },
//         validationSchema: formSchema,
//         onSubmit: (values, { resetForm }) => {
//             // alert(JSON.stringify(values, null, 2));
//             console.log(values);

//             if(update){
//                 dispatch(editMyAuto({...values, file: values?.file?.name ? values?.file?.name : values.file }))
//             }else{
//                 handleMyAutoData({ ...values, file: values?.file?.name  })
//             }

//             resetForm()
//             handleClose()
//         },
//     });

//     const { handleSubmit, handleBlur, handleChange, errors, setValues, values, touched, setFieldValue, resetForm } = formik;

//     const columns = [
//         { field: 'name', headerName: 'Name', width: 100 },
//         { field: 'age', headerName: 'Age', width: 100 },
//         { field: 'address', headerName: 'Address', width: 130 },
//         { field: 'bod', headerName: 'BOD', width: 130 },
//         {
//             field: 'file', headerName: 'Image', width: 150,
//             renderCell: (params) => <Box component="img"
//                 sx={{
//                     height: 46,
//                     width: 56,
//                 }}
//                 src={"img/"+ params.value}
//             />,
//         },
//         { field: 'select', headerName: 'Country', width: 100 },
//         { field: 'Gender', headerName: 'Gender', width: 100 },
//         { field: 'select_hobby', headerName: 'Hobby', width: 200 },
//         {
//             headerName: 'Actions', width: 180,
//             renderCell: (params) => {
//                 return (
//                     <>
//                         <>
//                             <Button style={{marginRight : '6px'}} variant="contained" color="success" onClick={() => handleEdit(params.row)}>
//                                 Edit
//                             </Button>
//                             <Button variant="outlined" color="error" onClick={() => handleDelete(params.row.id)}>
//                                 Delete
//                             </Button>
//                         </>
//                     </>
//                 )
//             }
//         }
//     ];

//     const handleDelete = (id) => {
//         dispatch(deleteMyAuto(id))
//     }

//     const handleEdit = (data) => {
//         setUpdate(true)
//         handleClickOpen()
//         setValues(data)
//         dispatch(editMyAuto(data))
//     }

//     const paginationModel = { page: 0, pageSize: 5 };

//     const DataGet = () => {
//         dispatch(getMyAuto())
//     }

//     useEffect(() => {
//         DataGet()
//     }, [])
    

//     return (
//         <>
//             <div style={{ marginTop: '12%', marginLeft: '45%' }}>
//                 <h3 style={{ marginTop: '12%', marginLeft: '-10%' }}>Basic Information Form </h3>
//                 <br></br>
//                 <React.Fragment >
//                     <Button variant="outlined" onClick={handleClickOpen}>
//                         Open form
//                     </Button>
//                     <Dialog
//                         open={open}
//                         onClose={handleClose}
//                     >
//                         <form onSubmit={handleSubmit}>
//                             <DialogTitle>Details</DialogTitle>
//                             <DialogContent>

//                                 <TextField
//                                     required
//                                     margin="dense"
//                                     id="name"
//                                     name="name"
//                                     label="Name"
//                                     type="name"
//                                     fullWidth
//                                     variant="standard"
//                                     value={values.name}
//                                     error={errors.name && touched.name}
//                                     helperText={errors.name && touched.name ? errors.name : ''}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />

//                                 <TextField
//                                     required
//                                     margin="dense"
//                                     id="age"
//                                     name="age"
//                                     label="Age"
//                                     type="number"
//                                     fullWidth
//                                     variant="standard"
//                                     value={values.age}
//                                     error={errors.age && touched.age}
//                                     helperText={errors.age && touched.age ? errors.age : ''}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />

//                                 <TextField
//                                     required
//                                     margin="dense"
//                                     id="address"
//                                     name="address"
//                                     label="Address"
//                                     type="name"
//                                     fullWidth
//                                     variant="standard"
//                                     value={values.address}
//                                     error={errors.address && touched.address}
//                                     helperText={errors.address && touched.address ? errors.address : ''}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />

//                                 <TextField
//                                     required
//                                     margin="dense"
//                                     id="bod"
//                                     name="bod"
//                                     label="Birth Date"
//                                     type="date"
//                                     fullWidth
//                                     variant="standard"
//                                     value={values.bod}
//                                     error={errors.bod && touched.bod}
//                                     helperText={errors.bod && touched.bod ? errors.bod : ''}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                 />

//                                 <br></br>
//                                 <br></br>

//                                 <input
//                                     type='file'
//                                     name="file"
//                                     onChange={(e) => { setFieldValue("file", e.target.files[0]) }}
//                                     onBlur={handleBlur}
//                                 />

//                                 <img src={typeof values?.file === 'string' ? 'img/' + values?.file :'img/' + values?.file.name } width={'100px'} height={'100px'} />

//                                 {errors.file && touched.file ? <span style={{ color: "red" }}> {errors.file} </span> : ''}

//                                 <br></br>
//                                 <br></br>

//                                 <select
//                                     required
//                                     name='select'
//                                     margin="dense"
//                                     label="Select your Country"
//                                     fullWidth
//                                     variant="standard"
//                                     value={values.select}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}>
//                                     <option value='0'>Select a Country</option>
//                                     <option value='INDIA'>INDIA</option>
//                                     <option value='USA'>USA</option>
//                                     <option value='DUBAI'>DUBAI</option>
//                                 </select>

//                                 {errors.select && touched.select ? <span style={{ color: "red" }}> {errors.select} </span> : ''}

//                                 <br></br>
//                                 <br></br>

//                                 <label>Please select your Gender :</label>
//                                 <br></br>
//                                 <input type="radio"
//                                     id="male"
//                                     name="Gender"
//                                     margin="dense"
//                                     label="Select Hobby"
//                                     fullWidth
//                                     value="Male"
//                                     variant="standard"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     checked={values.Gender === 'Male' ? true : false}
//                                 />

//                                 <label>Male</label>

//                                 <input type="radio"
//                                     id="female"
//                                     name="Gender"
//                                     margin="dense"
//                                     label="Select Hobby"
//                                     fullWidth
//                                     value="Female"
//                                     variant="standard"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     checked={values.Gender === 'Female' ? true : false}
//                                 />

//                                 <label>Female</label>

//                                 {errors.Gender && touched.Gender ? <span style={{ color: "red" }}> {errors.Gender} </span> : ''}

//                                 <br></br>
//                                 <br></br>

//                                 <label>Please select your 2 hobby :</label>
//                                 <br></br>
//                                 <input type="checkbox"
//                                     id="Cricket"
//                                     name="select_hobby"
//                                     margin="dense"
//                                     label="Select Hobby"
//                                     fullWidth
//                                     variant="standard"
//                                     value="Cricket"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     checked={values.select_hobby.includes('Cricket')}
//                                 />

//                                 <label>Cricket</label>


//                                 <input type="checkbox"
//                                     id="Football"
//                                     name="select_hobby"
//                                     margin="dense"
//                                     label="Select Hobby"
//                                     fullWidth
//                                     variant="standard"
//                                     value="Football"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     checked={values.select_hobby.includes('Football')}
//                                 />

//                                 <label>Football</label>

//                                 <input type="checkbox"
//                                     id="Chess"
//                                     name="select_hobby"
//                                     margin="dense"
//                                     label="Select Hobby"
//                                     fullWidth
//                                     variant="standard"
//                                     value="Chess"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     checked={values.select_hobby.includes('Chess')}
//                                 />

//                                 <label>Chess</label>

//                                 <input type="checkbox"
//                                     id="Kabadi"
//                                     name="select_hobby"
//                                     margin="dense"
//                                     label="Select Hobby"
//                                     fullWidth
//                                     variant="standard"
//                                     value="Kabadi"
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     checked={values.select_hobby.includes('Kabadi')}
//                                 />

//                                 <label>Kabadi</label>

//                                 {errors.select_hobby && touched.select_hobby ? <span style={{ color: "red" }}> {errors.select_hobby} </span> : ''}

//                             </DialogContent>
//                             <DialogActions>
//                                 <Button onClick={handleClose}>Cancel</Button>
//                                 <Button type="submit">{update ? 'Update' : 'Submit'}</Button>
//                             </DialogActions>
//                         </form>
//                     </Dialog>
//                     <Paper sx={{ height: 400, width: '100%', marginTop: '6%', marginLeft: '-40%' }}>
//                         <DataGrid
//                             rows={MyAutoSelector?.MyAuto}
//                             columns={columns}
//                             initialState={{ pagination: { paginationModel } }}
//                             pageSizeOptions={[5, 10]}
//                             checkboxSelection
//                             sx={{ border: 0 }}
//                         />
//                     </Paper>
//                 </React.Fragment>
//             </div>
//         </>
//     )
// }
