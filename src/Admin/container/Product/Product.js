import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { mixed, number, object, string } from 'yup';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { Box, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getallCatData } from '../../../redux/Slice/categorySlice';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { addproduct, deleteproduct, editproduct, getproduct, getSubByCat } from '../../../redux/Slice//ProductSlice';
import { getsubcat } from '../../../redux/Slice/SubCatSlice';

export default function Product() {
    const [open, setOpen] = React.useState(false);
    const [catdata, setCatdata] = React.useState([])
    const [update, setUpdate] = useState(false);
    const [filterSubCat, setfilterSubCat] = useState([])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        resetForm()
    };

    const dispatch = useDispatch()

    const categoryData = useSelector((state => state.Category));
    console.log(categoryData);

    // const subCategoryData = useSelector(state => state.subCat)

    const SubCatSelecter = useSelector((state) => state.subCat)
        console.log("dddddd",SubCatSelecter);

    const productselector = useSelector((state => state.product));
        console.log(productselector);    

    const [category, setCategory] = React.useState('');
    const [subcategory, setSubCategory] = React.useState('');

    const handleDelete = (id) => {
        dispatch(deleteproduct(id))
    }

    const handleEdit = (data) => {
        setValues(data)
        setUpdate(true)
        handleClickOpen()
        dispatch(getSubByCat())
        dispatch(editproduct(data))
        handleSubCat(data.category)
    }

    const columns = [
        {
            field: 'category', headerName: 'Category', width: 170,
            renderCell: (params) => {

                console.log("id",params.row.category);
                
                const categoryName = categoryData?.Category?.find((v) => v._id ===  params.row?.category)

                return categoryName?.name
            }
        },
        {
            field: 'subcategory', headerName: 'Subcategory name', width: 160,
            renderCell: (params) => {
              
                const SubcategoryName = SubCatSelecter?.subCat?.find((v) => v._id === params.row?.subcategory )

                console.log("sub_id",params.row.subcategory);
                
                return SubcategoryName?.name
            }
        },
        { field: 'name', headerName: 'Product name', width: 190 },
        { field: 'description', headerName: 'Description ', width: 400 },
        { field: 'price', headerName: 'Price', width: 100 },
        {
            field: 'product_img', headerName: 'Image', width: 150,
            renderCell: (params) => <Box component="img"
                sx={{
                    height: 50,
                    width: 65,
                }}
                src={'http://localhost:8000/' + params.value}
            />,


        },
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

    const paginationModel = { page: 0, pageSize: 12 };


    const productSchema = object({
        category: string().required(),
        subcategory: string().required(),
        name: string().required('Name is required'),
        description: string().required('Description is required'),
        price: number().required('Price is required').positive('Price must be a positive number'),
        product_img: mixed()
            .required("You need to provide a file")
            .test("product_img", "The file is too large", (value) => {

                if (typeof value === 'string') {
                    return true
                } else if (typeof value === 'object') {
                    return value && value.size <= 2000000;
                }

            })
            .test("type", "Only the following formats are accepted: .jpeg, .png", (value) => {

                if (typeof value === 'string') {
                    return true
                } else if (typeof value === 'object') {
                    return value && (
                        value.type === "image/jpeg" ||
                        value.type === "image/png"
                    )
                }

            }),
    });

    console.log(productselector?.product);
    
    const formik = useFormik({
        initialValues: {
            category: '',
            subcategory: '',
            name: '',
            description: '',
            price: '',
            product_img: ''
        },
        validationSchema: productSchema,
        onSubmit: (values) => {
            // alert(JSON.stringify(values, null, 2));

             if (update) {
                    dispatch(editproduct(values))
                  } else {
                    handleData({ ...values, id: Math.floor(Math.random() * 1000) })
                  }
            
                  resetForm()
                  handleClose()
        },
    });

    const handleData = (values) => {
        dispatch(addproduct(values))
        dispatch(getSubByCat())
      }

    const { handleSubmit, handleBlur, handleChange, errors, setValues, values, touched, resetForm, setFieldValue } = formik

    const DataGet = async () => {
        dispatch(getsubcat())
        dispatch(getSubByCat())
        dispatch(getproduct())
    };


    useEffect(() => {
        DataGet()
    }, [])

    const handleSubCat = (category_id) => {
        console.log("ccc",category_id);
        
        dispatch(getSubByCat(category_id))
    }

    console.log(values);
    
    return (
        <div>
            <div>Product</div>
            <br></br>
            <React.Fragment>
                <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                </Button>
                <br></br>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <DialogTitle>Product Data</DialogTitle>
                        <DialogContent>
                            

                            <Select
                                variant='standard'
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={values.category}
                                error={errors.category && touched.category}
                                onChange={(e) => {
                                    handleChange(e);
                                    handleSubCat(e.target.value)
                                    // const subCatData = dispatch(getsubcat())
                                    // console.log(subCatData);
                                }}

                                onBlur={handleBlur}
                                label="category"
                                name="category"
                                
                            >
                                
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                {categoryData.Category?.map((v) => (
                                    <MenuItem key={v._id} value={v._id}>
                                        {v.name}
                                    </MenuItem>
                                ))}

                            </Select>

                            <br></br>
                            <FormHelperText>{errors.category && touched.category ? errors.category : ''}</FormHelperText>

                            <Select
                                variant='standard'
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={values.subcategory}
                                error={errors.subcategory && touched.subcategory}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                label="subcategory"
                                name="subcategory"
                            >

                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>

                                {/* {
                                    if(update){

                                    }else{

                                    }
                                } */}
                                {productselector?.subcategory?.map((v) => (
                                    <MenuItem key={v._id} value={v._id}>
                                        {v.name}
                                    </MenuItem>
                                ))}

                                {/* {SubCatSelecter?.subCat?.map((v) => (
                                    <MenuItem key={v._id} value={v._id}>
                                        {v.name}
                                    </MenuItem>
                                ))} */}

                            </Select>

                            <TextField
                                margin="dense"
                                id="name"
                                name="name"
                                label="Name"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.name}
                                error={errors.name && touched.name}
                                helperText={errors.name && touched.name ? errors.name : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                variant="standard"
                                value={values.description}
                                error={errors.description && touched.description}
                                helperText={errors.description && touched.description ? errors.description : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <TextField
                                margin="dense"
                                id="price"
                                name="price"
                                label="Price"
                                type="number"
                                fullWidth
                                variant="standard"
                                value={values.price}
                                error={errors.price && touched.price}
                                helperText={errors.price && touched.price ? errors.price : ''}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />

                            <input
                                type='file'
                                name='product_img'
                                onChange={(e) => { setFieldValue("product_img", e.target.files[0]) }}
                                onBlur={handleBlur}
                            />

                            <img src={typeof values?.product_img === 'string' ? 'http://localhost:8000/' + values?.product_img : "../img/" + values?.product_img.name} width={'100px'} height={'100px'} />

                            {errors.product_img && touched.product_img ? <span style={{ color: "red" }}> {errors.product_img} </span> : ''}

                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{update ? 'Upadte' : 'Submit'}</Button>
                        </DialogActions>
                    </form>
                </Dialog>

                <Paper sx={{ height: 570, width: '100%' }}>
                    <DataGrid
                        rows={productselector?.product}
                        getRowId={(row) => row._id}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                        sx={{ border: 0 }}
                    />
                </Paper>

            </React.Fragment>
        </div>
    );
}
