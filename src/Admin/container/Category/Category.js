import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { mixed, object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { CategoryDataget, deleteCategory, editCategory, getallCatData } from '../../../redux/Slice/categorySlice';

export default function Category() {

  const [open, setOpen] = React.useState(false);
  const [setcat, setcatdata] = useState([])
  const [update, setUpdate] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false)
    resetForm()
  };

  const dispatch = useDispatch()

  const CatgorySelector = useSelector((state => state.Category))


  const handleDelete = (id) => {
    console.log(id);

    // let localData = JSON.parse(localStorage.getItem("category"));

    // console.log(localData);

    dispatch(deleteCategory(id))

    //-------------------------1----------------------------

    //findIndex and splice method

    //   let index = localData.findIndex((v) => v.id === id)

    //   console.log(index);

    //  let datas = localData.splice(index,1)

    //  console.log(datas);

    //-------------------------------------------------------

    //-------------------------2-----------------------------

    //filter method

    // let fdata = localData.filter((v) => v.id !== id)

    // console.log(fdata);

    // localStorage.setItem("category", JSON.stringify(fdata))

    // //-------------------------------------------------------

    // setcatdata(localData)

  };

  const handleEdit = (data) => {
    console.log(data);
    setValues(data)
    setUpdate(true)
    handleClickOpen()
  };

  const columns = [
    // { field: 'id', headerName: 'Id', width: 70 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'description', headerName: 'Description', width: 350 }, 
    {
      field: 'cat_img', headerName: 'Image', width: 150,
      renderCell: (params) => <Box component="img"
        sx={{
          height: 50,
          width: 65,
        }}
        src={params.value.url}
      />,
    },
    {
      headerName: 'Action', width: 130,
      renderCell: (params) => {
        return (
          <>
            <IconButton aria-label="delete" onClick={() => { handleDelete(params.row._id) }}>
              <DeleteIcon />
            </IconButton>
            
            <IconButton aria-label="edit" onClick={() => { handleEdit(params.row) }}>
              <EditIcon />
            </IconButton>
          </>
        )
      }
    }
  ];

  const paginationModel = { page: 0, pageSize: 12 };

  let CategorySchema = object({
    name: string()
      .matches(/^[a-zA-Z ]*$/, "Only characters allowed.")
      .max(30)
      .min(2)
      .required(),
    description: string().required(),
    cat_img: mixed()
      .required("You need to provide a file")
      .test("cat_img", "The file is too large", (value) => {

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

  const localDataDis = () => {

    // let DisData = JSON.parse(localStorage.getItem("category"))

    // setcatdata(DisData)

    dispatch(getallCatData())
  }

  useEffect(() => {
    localDataDis()
  }, [])

  const localDataset = (values) => {

    // let localData = JSON.parse(localStorage.getItem("category"))

    // if (localData) {

    //   localData.push({ ...values, id: Math.floor(Math.random() * 1000) })
    //   localStorage.setItem("category", JSON.stringify(localData))
    //   setcatdata(localData)

    // } else {
    //   localStorage.setItem("category", JSON.stringify([{ ...values, id: Math.floor(Math.random() * 1000) }]))
    //   setcatdata([{ ...values, id: Math.floor(Math.random() * 1000) }])
    // }

    dispatch(CategoryDataget(values))

  }

  const updateData = (data) => {

    dispatch(editCategory(data))
    // console.log(data);

    // let localData = JSON.parse(localStorage.getItem("category"))

    // console.log(localData);

    // let index = localData.findIndex((v) => v.id === data.id)

    // console.log(index);

    // localData[index] = data;

    // localStorage.setItem("category", JSON.stringify(localData))

    // setcatdata(localData)

  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      cat_img: ''
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { resetForm }) => {

      if (update) {
        updateData(values)
      } else {
        localDataset(values)
      }

      resetForm();
      handleClose()
    },
  });

  const { handleChange, handleSubmit, handleBlur, errors, values, touched, resetForm, setValues ,setFieldValue } = formik

  {console.log(CatgorySelector?.Category)}

  return (
    <>
      <div>Category</div>
      <br></br>
    <React.Fragment>
      <Button style={{ marginLeft: '89%' }} variant="outlined" onClick={handleClickOpen} >
        Add Category
      </Button>
      <br></br>
      <Dialog
        open={open}
        onClose={handleClose}
      >

        <form onSubmit={handleSubmit} enctype="multipart/form-data">
          <DialogTitle>Category</DialogTitle>
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
              label="description"
              type="name"
              fullWidth
              variant="standard"
              value={values.description}
              error={errors.description && touched.description}
              helperText={errors.description && touched.description ? errors.description : ''}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <input
              type='file'
              name="cat_img"
              onChange={(e) => { setFieldValue("cat_img", e.target.files[0]) }}
              onBlur={handleBlur}
            />

            <img src={typeof values?.cat_img === 'string' ? 'http://localhost:8000/' + values?.cat_img : "../img/"  + values?.cat_img.name} width={'100px'} height={'100px'} />

            {errors.cat_img && touched.cat_img ? <span style={{ color: "red" }}> {errors.cat_img} </span> : ''}

          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{update ? 'Update ' : 'Submit'}</Button>

          </DialogActions>
        </form>
      </Dialog>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={CatgorySelector?.Category}
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
