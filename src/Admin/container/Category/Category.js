import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

export default function Category() {

  const [open, setOpen] = React.useState(false);
  const [setcat, setcatdata] = useState([])
  const [update , setUpdate] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false)
    resetForm()
  };

  const handleDelete = (id) => {
    console.log(id);

    let localData = JSON.parse(localStorage.getItem("category"));

    console.log(localData);

    //-------------------------1----------------------------

    //findIndex and splice method

    //   let index = localData.findIndex((v) => v.id === id)

    //   console.log(index);

    //  let datas = localData.splice(index,1)

    //  console.log(datas);

    //-------------------------------------------------------

    //-------------------------2-----------------------------

    //filter method

    let fdata = localData.filter((v) => v.id !== id)

    console.log(fdata);

    localStorage.setItem("category", JSON.stringify(fdata))

    //-------------------------------------------------------

    setcatdata(localData)

  };

  const handleEdit = (data) => {
    console.log(data);
    setValues(data)
    setUpdate(true)
    handleClickOpen()
  };

  const columns = [
    // { field: 'id', headerName: 'Id', width: 70 },
    { field: 'name', headerName: 'Name', width: 70 },
    { field: 'description', headerName: 'Description', width: 130 },
    {
      headerName: 'Action', width: 130,
      renderCell: (params) => {
        return (
          <>
            <IconButton aria-label="delete" onClick={() => { handleDelete(params.row.id) }}>
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

  const paginationModel = { page: 0, pageSize: 5 };

  let CategorySchema = object({
    name: string().required(),
    description: string().required()
  });

  const localDataDis = () => {

    let DisData = JSON.parse(localStorage.getItem("category"))

    setcatdata(DisData)
  }

  useEffect(() => {
    localDataDis()
  }, [])

  const localDataset = (values) => {

    let localData = JSON.parse(localStorage.getItem("category"))

    if (localData) {

      localData.push({ ...values, id: Math.floor(Math.random() * 1000) })
      localStorage.setItem("category", JSON.stringify(localData))
      setcatdata(localData)

    } else {
      localStorage.setItem("category", JSON.stringify([{ ...values, id: Math.floor(Math.random() * 1000) }]))
      setcatdata([{ ...values, id: Math.floor(Math.random() * 1000) }])
    }

  }

  const updateData = (data) => {
    console.log(data);

    let localData = JSON.parse(localStorage.getItem("category"))

    console.log(localData);

    let index = localData.findIndex((v) => v.id === data.id)

    console.log(index);

    localData[index] = data;

    localStorage.setItem("category",JSON.stringify(localData))
    
    setcatdata(localData)
    
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      description: ''
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { resetForm }) => {

      if(update){
        updateData(values)
      }else{
        localDataset(values)
      }

      resetForm();
      handleClose()
    },
  });

  const { handleChange, handleSubmit, handleBlur, errors, values, touched , resetForm , setValues} = formik

  return (

    <React.Fragment>
      <Button style={{ marginLeft: '89%' }} variant="outlined" onClick={handleClickOpen} >
        Add Category
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
      >

        <form onSubmit={handleSubmit}>
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
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{update ? 'Update '  :'Submit'}</Button>

          </DialogActions>
        </form>
      </Dialog>
      <Paper sx={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={setcat}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>
    </React.Fragment>
  )
}
