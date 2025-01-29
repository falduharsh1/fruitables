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
import { number, object, string } from 'yup';
import { Formik, useFormik } from 'formik';
import { Category, Description } from '@mui/icons-material';
import { FormHelperText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addSubCat, deleteSubCat, editSubCat, getsubcat, setSubCat } from '../../../redux/Slice/SubCatSlice';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';

export default function SubCategory() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [catdata , setCatdata] = React.useState([])
  const [update , setUpdate] = useState(false)

  const columns = [
    { field: 'category', headerName: 'Category', width: 130,
      renderCell : (params) => {
        const fname = catdata?.find((v) => params.row.category === v.id)?.name
        
        return fname
      } 
    },
    { field: 'name', headerName: 'Category name', width: 170 },
    { field: 'description', headerName: 'Description name', width: 170 },
    { headerName: 'Actions', width: 300 ,
      renderCell : (params) => {
        return (  
          <>
            <Button variant="contained" color="success" onClick={() => handleEdit(params.row)}>
              Edit
            </Button>
            <Button variant="outlined" color="error" onClick={() => handleDelete(params.row.id)}>
              Delete
            </Button>
          </>
        )
      }
     }
  ];

  const handleDelete = (id) => {  
    // console.log("idd",id);  

    dispatch(deleteSubCat(id))
  }

  const handleEdit = (data) =>{
      setValues(data)
      setUpdate(true)
      handleClickOpen()
      dispatch(editSubCat(data))
  }

  const paginationModel = { page: 0, pageSize: 5 };

  const dispatch = useDispatch()

  const SubCatgoryy = useSelector((state => state.subCat))

  console.log(SubCatgoryy);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    resetForm()
  };

  // const handleChange = (event) => {
  //   setCategory(event.target.value);
  // };

  const DataGet = () => {
    const localData = JSON.parse(localStorage.getItem("category"))

    console.log(localData);

    setCatdata(localData)

    dispatch(getsubcat())
    // dispatch(addSubCat())
    
  }

  useEffect(() => {
      DataGet()
      
  } ,[])

  const CategorySchema = object({
    category : number().required(),
    name: string().required(),
    description : string().required()
  })

  const handleCatData = (values) => {
    dispatch(addSubCat(values))
  }

  const formik = useFormik({
    initialValues: {
      category: '',
      name: '',
      description: '',
    },
    validationSchema: CategorySchema,
    onSubmit: (values, { resetForm })=> {
      // alert(JSON.stringify(values, null, 2));

      if(update){
        dispatch(editSubCat(values))
      }else{
        handleCatData({...values , id : Math.floor(Math.random()*1000)}) 
      }
      
      resetForm()
     handleClose()
     
    },
  });

  const { handleSubmit, handleBlur, handleChange , errors, setValues, values , touched , resetForm} = formik

  return (
    <div>
      <React.Fragment>
        <Button variant="outlined" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
        >
          <form onSubmit={handleSubmit}>
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
              type="name"              
            >
    
              <MenuItem value="">
                <em>None</em>
              </MenuItem>

            {
              catdata?.map((v) => (
                <MenuItem value={v.id}>{v.name}</MenuItem>
              ))
            }
       
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{update ? 'Upadte' : 'Submit'}</Button>
          </DialogActions>
          </form>
        </Dialog>  

        <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={SubCatgoryy.subCat}
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
