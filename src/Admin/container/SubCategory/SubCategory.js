import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { mixed, number, object, string } from 'yup';
import { Formik, useFormik } from 'formik';
import { Category, Description } from '@mui/icons-material';
import { Box, FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCat, deleteSubCat, editSubCat, getsubcat, setSubCat } from '../../../redux/Slice/SubCatSlice';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { getallCatData } from '../../../redux/Slice/categorySlice';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

export default function SubCategory() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  // const [catdata, setCatdata] = React.useState([])
  const [update, setUpdate] = useState(false);

  const dispatch = useDispatch()

  const SubCatgoryy = useSelector((state => state.subCat));
  console.log(SubCatgoryy);

  const categoryData = useSelector(state => state.Category);
  console.log(categoryData);
  

  const columns = [
    {
      field: 'category', headerName: 'Category', width: 170,
      renderCell: (params) => {
        console.log(params.row.category);
        
        const categoryName = categoryData?.Category?.find((v) => v._id === params.row.category)

        return categoryName?.name 
      }
    },
    { field: 'name', headerName: 'SubCategory name', width: 180 },
    { field: 'description', headerName: 'Description', width: 520 },
    {
      field: 'subCat_img', headerName: 'Image', width: 150,
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

  const handleDelete = (id) => {
    dispatch(deleteSubCat(id))
  }

  const handleEdit = (data) => {
    setValues(data)
    setUpdate(true)
    handleClickOpen()
    dispatch(editSubCat(data))
  }

  const paginationModel = { page: 0, pageSize: 10 };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    resetForm()
  };

  const DataGet = async () => {
    dispatch(getallCatData());
    dispatch(getsubcat())
  };

  useEffect(() => {
    DataGet()
  }, [])

  const CategorySchema = object({
    category: string().required(),
    name: string().required(),
    description: string().required(),
    subCat_img: mixed()
      .required("You need to provide a file")
      .test("subCat_img", "The file is too large", (value) => {

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
  })

  const handleCatData = (values) => {
    dispatch(addSubCat(values))
  }

  const formik = useFormik({
    initialValues: {
      category: '',
      name: '',
      description: '',
      subCat_img: ''
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { resetForm }) => {
      // alert(JSON.stringify(values, null, 2));

      if (update) {
        dispatch(editSubCat(values))
      } else {
        handleCatData({ ...values, id: Math.floor(Math.random() * 1000) })
      }

      resetForm()
      handleClose()

    },
  });

  const { handleSubmit, handleBlur, handleChange, errors, setValues, values, touched, resetForm, setFieldValue } = formik
    // console.log(values)
  return (
    <div>
        <div>SubCategory</div>
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
          <form onSubmit={handleSubmit} enctype="multipart/form-data">
            <DialogTitle>SubCategory</DialogTitle>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>

              <Select
                variant='standard'
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={values.category}
                error={errors.category && touched.category}
                onChange={handleChange}
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

              <FormHelperText>{errors.category && touched.category ? errors.category : ''}</FormHelperText>

            </FormControl>

            <DialogContent>
              <TextField
                margin="dense"
                id="name"
                name="name"
                label="name"
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
                margin="dense"
                id="description"
                name="description"
                label="Description"
                type="name"
                fullWidth
                variant="standard"
                value={values.description}
                error={errors.description && touched.description}
                helperText={errors.description && touched.description ? errors.description : ''}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <br></br>
              <br></br>

              <input
                type='file'
                name='subCat_img'
                onChange={(e) => { setFieldValue("subCat_img", e.target.files[0]) }}
                onBlur={handleBlur}
              />

              <img src={typeof values?.subCat_img === 'string' ? 'http://localhost:8000/' + values?.subCat_img : "../img/" + values?.subCat_img.name} width={'100px'} height={'100px'} />

              {errors.subCat_img && touched.subCat_img ? <span style={{ color: "red" }}> {errors.subCat_img} </span> : ''}

            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">{update ? 'Upadte' : 'Submit'}</Button>
            </DialogActions>
          </form>
        </Dialog>

        <Paper sx={{ height: 600, width: '100%' }}>
          <DataGrid
            rows={SubCatgoryy?.subCat}
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
  )
}
