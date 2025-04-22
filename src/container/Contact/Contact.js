import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { object, string } from "yup";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ThemeContext } from "../../context/ThemeContext";

export default function Contact() {
  const [setcat, setcatdata] = useState([]);
  const [update , setUpdate] = useState(false)
  

  const handleDelete = (id) => {
    console.log(id);

    let localData = JSON.parse(localStorage.getItem("category"));

    console.log(localData);

    // let index = localData.findIndex((v) => v.id === id)

    // console.log(index);

    // let datas = localData.splice(index ,1)

    // console.log(datas);

    // localStorage.setItem("category" ,JSON.stringify(localData))

    let fdata = localData.filter((v) => v.id !== id);

    localStorage.setItem("category", JSON.stringify(fdata));

    setcatdata(localData)
  };

  const handleEdit = (data) => {

    console.log(data);
    setValues(data)
    setUpdate(true)
    
  };

  const columns = [
    { field: "name", headerName: "Name", width: 70 },
    { field: "email", headerName: "Email", width: 130 },
    { field: "message", headerName: "Message", width: 130 },
    {
      field: "Action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              aria-label="delete"
              onClick={() => {
                handleDelete(params.row.id);
              }}
            >
              <DeleteIcon />
            </IconButton>
            <IconButton
              aria-label="edit"
              onClick={() => {
                handleEdit(params.row);
              }}
            >
              <EditIcon />
            </IconButton>
          </>
        );
      },
    },
  ];

  const paginationModel = { page: 0, pageSize: 5 };

  let ContactSchema = object({
    name: string().required(),
    email: string().required(),
    message: string().required(),
  });

  const localedataDis = () => {
    let DisData = JSON.parse(localStorage.getItem("category"));

    setcatdata(DisData);
  };

  useEffect(() => {
    localedataDis();
  }, []);

  const localDataSet = (values) => {
    let LocalData = JSON.parse(localStorage.getItem("category"));

    if (LocalData) {
      LocalData.push({ ...values, id: Math.floor(Math.random() * 1000) });
      localStorage.setItem("category", JSON.stringify(LocalData));
      setcatdata(LocalData);
    } else {
      localStorage.setItem(
        "category",
        JSON.stringify([{ ...values, id: Math.floor(Math.random() * 1000) }])
      );
      setcatdata([{ ...values, id: Math.floor(Math.random() * 1000) }]);
    }
  };

  const updateData = (data) => {

    console.log(data);

    let LocalData = JSON.parse(localStorage.getItem("category"));

    let index = LocalData.findIndex((v) => v.id === data.id)

    LocalData[index] = data

    localStorage.setItem("category",JSON.stringify(LocalData))

    setcatdata(LocalData)
    
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema: ContactSchema,
    onSubmit: (values, { resetForm }) => {

      if(update){
        updateData(values)
      }else{
        localDataSet(values);
      }

      
      resetForm();
    },
  });

  const { handleChange, handleSubmit, handleBlur, errors, values, touched, resetForm , setValues } =
    formik;

    const Theme = useContext(ThemeContext)
          
            console.log(Theme);

  return (
    <div className={`container-fluid contact py-5  ${Theme.Theme}`}>
      <div className="container py-5">
        <div className="p-5 bg-light rounded">
          <div className="row g-4">
            <div className="col-12">
              <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                <h1 className="text-primary">Get in touch</h1>
                <p className="mb-4" style={{ color: 'black' }}>
                  The contact form is currently inactive. Get a functional and
                  working contact form with Ajax &amp; PHP in a few minutes.
                  Just copy and paste the files, add a little code and you're
                  done.{" "}
                  <a href="https://htmlcodex.com/contact-form">Download Now</a>.
                </p>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="h-100 rounded">
                <iframe
                  className="rounded w-100"
                  style={{ height: 400 }}
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.33750346623!2d-73.97968099999999!3d40.6974881!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sbd!4v1694259649153!5m2!1sen!2sbd"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

            <form action className onSubmit={handleSubmit}>
              <div className="col-lg-7">
                <TextField
                  type="text"
                  className="w-100 form-control border-0 py-3 mb-4"
                  placeholder="Your Name"
                  name="name"
                  value={values.name}
                  error={errors.name && touched.name}
                  helperText={errors.name && touched.name ? errors.name : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  type="email"
                  className="w-100 form-control border-0 py-3 mb-4"
                  placeholder="Enter Your Email"
                  name="email"
                  value={values.email}
                  error={errors.email && touched.email}
                  helperText={errors.email && touched.email ? errors.email : ""}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <TextField
                  className="w-100 form-control border-0 mb-4"
                  rows={5}
                  cols={10}
                  placeholder="Your Message"
                  name="message"
                  defaultValue={""}
                  value={values.message}
                  error={errors.message && touched.message}
                  helperText={
                    errors.message && touched.message ? errors.message : ""
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <button
                  className="w-100 btn form-control border-secondary py-3 bg-white text-primary "
                  type="submit"
                >
                  {update ? 'Update' : 'Submit'}
                </button>
              </div>
            </form>

            <Paper sx={{ height: 400, width: "100%" }}>
              <DataGrid
                rows={setcat}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                sx={{ border: 0 }}
              />
            </Paper>

            <div className="col-lg-5">
              <div className="d-flex p-4 rounded mb-4 bg-white">
                <i className="fas fa-map-marker-alt fa-2x text-primary me-4" />
                <div>
                  <h4>Address</h4>
                  <p className="mb-2">123 Street New York.USA</p>
                </div>
              </div>
              <div className="d-flex p-4 rounded mb-4 bg-white">
                <i className="fas fa-envelope fa-2x text-primary me-4" />
                <div>
                  <h4>Mail Us</h4>
                  <p className="mb-2">info@example.com</p>
                </div>
              </div>
              <div className="d-flex p-4 rounded bg-white">
                <i className="fa fa-phone-alt fa-2x text-primary me-4" />
                <div>
                  <h4>Telephone</h4>
                  <p className="mb-2">(+012) 3456 7890</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
