
import React, { useEffect } from 'react';
import { Box, Button, MenuItem, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/dashboard/Header";
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../Redux/Slice/User';

const Index = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const JWT = cookies.get('x-auth-token');
  const decode = jwtDecode(JWT);
  const seller = useSelector(state => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const handleFormSubmit = async (values, { resetForm }) => {
    try {
  const formData = new FormData();
            formData.append('title', values.title);
            formData.append('price', values.price);
            formData.append('category', values.category);
            formData.append('quantity', values.quantity);
            formData.append('subcategory', values.subcategory);
            formData.append('ratings', values.ratings);
            formData.append('description', values.description);
            formData.append('brand', values.brand);
            formData.append('comments', values.comments);
            formData.append('substitutes', values.substitutes);
            formData.append('boycott', values.boycott);
            formData.append('sold', 0);
            
            // Append each image file
            for (let i = 0; i < values.images.length; i++) {
              formData.append('images', values.images[i]);
            }

      if (JWT) {
        const header = {
          headers: {
            'x-auth-token': JWT,
                 "Content-Type": "multipart/form-data",
          },
        };

       const postres = await axios.post(
          `http://localhost:3001/products/sellerProducts`,
          formData,
          header
        ).then(async(postres)=>{
         values.Id=postres.data.data.id
      
          const response = await axios.patch(
            `http://localhost:3001/user/${decode.user.userID}`,
            { sellerProducts: [...seller.sellerProducts, values] },
            
          ).then((response)=>{
            dispatch(getUserAction());
            enqueueSnackbar('Product added successfully', { variant: 'success' });
            console.log("valiue",values)
            console.log("response",response.data)
            resetForm();
            navigate('/dashboard/sellerTable');
          }).catch((err)=>{
            console.log("catch")
            console.log(err)
  
          })
     
        }).catch((err)=>{
          console.log("catch")
          console.log(err)
          enqueueSnackbar('Failed to add product', { variant: 'error' });

        })
        
    

    
        
      }}
    
    catch (error) {
      console.error(error);
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE Products" subtitle="Create a New Product" />
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-12">
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Product ID"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.productId}
                  name="productId"
                  error={touched.productId && !!errors.productId}
                  helperText={touched.productId && errors.productId}
                />
              </div>
              <div className="col-md-12">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Title"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.title}
                  name="title"
                  error={touched.title && !!errors.title}
                  helperText={touched.title && errors.title}
                />
              </div>
              <div className="col-md-12">
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Price"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.price}
                  name="price"
                  error={touched.price && !!errors.price}
                  helperText={touched.price && errors.price}
                />
              </div>
              <div className="col-md-12">
                <TextField
                  select
                  fullWidth
                  variant="filled"
                  label="Category"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.category}
                  name="category"
                  error={touched.category && !!errors.category}
                  helperText={touched.category && errors.category}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </TextField>
              </div>
              {values.category && (
                <div className="col-md-12">
                  <TextField
                    select
                    fullWidth
                    variant="filled"
                    label="Subcategory"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.subcategory}
                    name="subcategory"
                    error={touched.subcategory && !!errors.subcategory}
                    helperText={touched.subcategory && errors.subcategory}
                  >
                    {subcategoriesMapping[values.category].map((subcategory) => (
                      <MenuItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              )}
              <div className="col-md-12">
                <TextField
                  fullWidth
                  variant="filled"
                  type="number"
                  label="Quantity"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.quantity}
                  name="quantity"
                  error={touched.quantity && !!errors.quantity}
                  helperText={touched.quantity && errors.quantity}
                />
              </div>
              <div className="col-md-12">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.description}
                  name="description"
                  error={touched.description && !!errors.description}
                  helperText={touched.description && errors.description}
                />
              </div>
              <div className="col-md-12">
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Brand"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.brand}
                  name="brand"
                  error={touched.brand && !!errors.brand}
                  helperText={touched.brand && errors.brand}
                />
              </div>
              <div className="col-md-12">
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={(event) => {
                    setFieldValue("images", event.currentTarget.files);
                  }}
                />
              </div>
            </div>
            <div className="mt-3 d-flex justify-content-end">
              <Button type="submit" color="secondary" variant="contained">
                Create New Product
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const validationSchema = yup.object().shape({
  productId: yup.number().required("Product ID is required"),
  title: yup.string().required("Title is required"),
  price: yup.number().required("Price is required"),
  category: yup.string().required("Category is required"),
  quantity: yup.number().required("Quantity is required"),
  subcategory: yup.string(),
  ratings: yup.number().min(0, "Ratings must be at least 0"),
  description: yup.string(),
  brand: yup.string(),
  comments: yup.string(),
  substitutes: yup.string(),
  boycott: yup.boolean()
});

const initialValues = {
  productId: "",
  Id:"",
  title: "",
  price: "",
  category: "",
  quantity: "",
  subcategory: "",
  ratings: 0,
  description: "",
  brand: "",
  comments: "",
  substitutes: "",
  boycott: false,
  images: []
};

const categories = [
  "Televisions",
  "Laptops",
  "phones",
  "Health&Beauty",
  "Refrigerators",
  "Home&Kitchen",
  "Clothes"
];

const subcategoriesMapping = {
  "Televisions": ["Samsung", "LG", "TCL", "Hisense"],
  "Laptops": ["Lenovo", "Dell", "Apple"],
  "phones": ["Samsung", "Huawei", "Apple", "Xiaomi"],
  "Health&Beauty": ["L'Oréal", "Argento", "EvaCosmetics", "The Body Shop"],
  "Refrigerators": ["Whirlpool", "LG", "Samsung", "GE", "KitchenAid"],
  "Home&Kitchen": ["Samsung", "LG"],
  "Clothes": ["Women's Fashion", "Men's Fashion"]
};

export default Index;























