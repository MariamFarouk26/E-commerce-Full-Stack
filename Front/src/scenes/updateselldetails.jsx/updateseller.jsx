import React, { useEffect, useState } from 'react';
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../Components/dashboard/Header";
import { useSnackbar } from 'notistack';
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import { useDispatch, useSelector } from 'react-redux';
import { getUserAction } from '../../Redux/Slice/User';
import axios from 'axios';

const Updateseller = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const { enqueueSnackbar } = useSnackbar();
    const cookies = new Cookies();
    const JWT = cookies.get('x-auth-token');
    const decode = jwtDecode(JWT);
    const location = useLocation();
    const navigate=useNavigate()
const user=useSelector((state)=>state.user.user)
const dispatch=useDispatch()
    const [formValues, setFormValues] = useState({
        productId: 0,
        title: '',
        price: '',
        category: '',
        quantity: '',
        images: [] // Initial value for images
    });

    useEffect(() => {
        if (location.state && location.state.data) {
            setFormValues(prevState => ({
                ...prevState,
                ...location.state.data
            }));
        }
        dispatch(getUserAction())
    }, [location.state]);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
   
const fiterseller=user.sellerProducts.filter((item)=>item.productId!==formValues.productId)
if (JWT) {
    const header = {
      headers: {
        'x-auth-token': JWT,
      }
    };
    const response = await axios.patch(`http://localhost:3001/user/${decode.user.userID}`, {
        header, 
        sellerProducts: [...fiterseller,formValues] // Send the productId to be deleted in the request body
       }).then(()=>{
         dispatch(getUserAction())
       })}
       navigate("/dashboard/sellerTable")
        // Your axios request and other logic can go here
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <Box m="20px">
            <Header title=" create product" subtitle="Create a New product" />
            <form onSubmit={handleFormSubmit}>
                <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                    }}
                >
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Product ID"
                        onBlur={handleChange}
                        onChange={handleChange}
                        value={formValues.productId}
                        name="productId"
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Title"
                        onBlur={handleChange}
                        onChange={handleChange}
                        value={formValues.title}
                        name="title"
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Price"
                        onBlur={handleChange}
                        onChange={handleChange}
                        value={formValues.price}
                        name="price"
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="text"
                        label="Category"
                        onBlur={handleChange}
                        onChange={handleChange}
                        value={formValues.category}
                        name="category"
                        sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                        fullWidth
                        variant="filled"
                        type="number"
                        label="Quantity"
                        onBlur={handleChange}
                        onChange={handleChange}
                        value={formValues.quantity}
                        name="quantity"
                        sx={{ gridColumn: "span 4" }}
                    />
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        onChange={(event) => {
                            // Set form field value to selected files
                            setFormValues(prevState => ({
                                ...prevState,
                                images: event.currentTarget.files
                            }));
                        }}
                        sx={{ gridColumn: "span 4", display: "none" }} // Hide input
                    />
                </Box>
                <Box display="flex" justifyContent="end" mt="20px">
                    <Button type="submit" color="secondary" variant="contained">
                        Create New Admin
                    </Button>
                </Box>
            </form>
        </Box>
    );
}

export default Updateseller;
