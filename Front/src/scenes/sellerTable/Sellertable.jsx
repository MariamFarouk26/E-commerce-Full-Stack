import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useSnackbar } from 'notistack';
import Cookies from 'universal-cookie';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
import Header from "../../Components/dashboard/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUserAction } from "../../Redux/Slice/User";
import axios from "axios";

const SellerTable = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockDataContacts, setMockDataContacts] = useState([]);
  const user=useSelector(state=>state.user.user)
  const dispatch=useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const JWT = cookies.get("x-auth-token");
  const decode = jwtDecode(JWT);




const getdata = async () => {
  try {
     const response = await axios.get(`http://localhost:3001/user/${decode.user.userID}`);

     setMockDataContacts(response.data[0].sellerProducts )
  } catch (error) {
     console.error(error); // Log any errors that might occur during the request
  }
};

console.log("Idiiiiiiiiiiiiiiiiiii",mockDataContacts?.Id)

useEffect(() => {
   
  dispatch(getUserAction())
  getdata()
},[]);

const handleDeleteClick = async (rowId,id, variant) => {
  try {
    if (JWT) {
      const header = {
        headers: {
          'x-auth-token': JWT,
        }
      };
let fitersellerproducts=user.sellerProducts.filter((item)=>item.productId!==rowId)
      const response = await axios.patch(`http://localhost:3001/user/${decode.user.userID}`, {
       header, // Include JWT token in headers
       sellerProducts: [...fitersellerproducts] // Send the productId to be deleted in the request body
      }).then(async()=>{
        dispatch(getUserAction())
       await axios.delete(`http://localhost:3001/products/${id}`,header).then((res)=>{
        console.log("res",res.data);
       })
      })

      // If the deletion was successful, update the state to reflect the change
      if (response.status === 200) {
        setMockDataContacts(prevData =>
          prevData.filter(row => row.productId !== rowId)
        );

        // Show success snackbar
        enqueueSnackbar('Successfully Deleted!', { variant });
      } else {
        console.error('Error deleting product:', response.data);
        // Handle error if needed
      }
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    // Handle error if needed
  }
};







  const handleupdateClick = async (rowId) => {
   console.log(rowId)

  }

  const columns = [
    { field: "Id", headerName: "ID", flex: 0.5 },
    // { field: "productId", headerName: "productId", flex: 0.5 },
    { field: "title", headerName: "Title", flex: 2.5 },
    { field: "category", headerName: "Category", flex: 1 },
    { field: "price", headerName: "price", flex: 0.75 },
    { field: "quantity", headerName: "Quantity", flex: 0.75 },
    
    {
      field: "update",
      headerName: "Update",
      flex: 0.5,
     
      renderCell: (params) => (
        <Link 
        to="/dashboard/Updateseller"
        state={{data:params.row}}
        >
        <IconButton aria-label="update" color="success" onClick={() => handleupdateClick(params.row.id)}>
           <SystemUpdateAltIcon />
      
        </IconButton>
   </Link> ),},
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(params.row.productId,params.row.Id ,'success')}>
          <DeleteOutlineIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header
        title="products"
        // subtitle="Managing the Team Members"
      />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
  rows={user?.sellerProducts}
  columns={columns}
  getRowId={(row) => row.Id} // Assuming productId is a unique identifier
/>
      </Box>
    </Box>
  );
};

export default SellerTable;
// import { Box, IconButton } from "@mui/material";
// import { DataGrid } from "@mui/x-data-grid";
// import { tokens } from "../../theme";
// import { useSnackbar } from 'notistack';
// import Cookies from 'universal-cookie';
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import SystemUpdateAltIcon from '@mui/icons-material/SystemUpdateAlt';
// import Header from "../../Components/dashboard/Header";
// import { useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { getUserAction } from "../../Redux/Slice/User";

// const SellerTable = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const [mockDataContacts, setMockDataContacts] = useState([]);
//   const { enqueueSnackbar } = useSnackbar();
//   const navigate = useNavigate();
//   const cookies = new Cookies();
//   const JWT = cookies.get("x-auth-token");
//   const decode = jwtDecode(JWT);
//   const seller = useSelector(state => state.user.user);
//   const dispatch =useDispatch()
//   dispatch(getUserAction())
// const sellerProducts = seller ? seller.sellerProducts : []; 
// console.log(seller)
// console.log(sellerProducts)
// useEffect(() => {
//   const getData = async () => {
//     try {
//       if (JWT && seller) { 
//         const header = {
//           headers: {
//             'x-auth-token': JWT,
//           },
//         };
//         console.log("Seller:", seller); // Add this log statement
//         console.log("Seller Products:", sellerProducts); // Add this log statement
//         setMockDataContacts(sellerProducts);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   getData();
// }, [seller, sellerProducts]);

  

// const handleDeleteClick = (rowId, variant) => {
//   // Filter out the row with the specified rowId
//   setMockDataContacts((prevData) =>
//     prevData.filter((row) => row.productId !== rowId)
//   );

//   // Show success snackbar
//   enqueueSnackbar('Successfully Deleted!', { variant });
// }


//   const handleupdateClick = async (rowId) => {
//     console.log('update');
//     navigate('dashboard/Updateseller');
//   }

//   const columns = [
//     { field: "productId", headerName: "productId", flex: 0.5 },
//     { field: "title", headerName: "Title", flex: 2.5 },
//     { field: "category", headerName: "Category", flex: 1 },
//     { field: "price", headerName: "price", flex: 0.75 },
//     { field: "quantity", headerName: "Quantity", flex: 0.75 },
//     {
//       field: "update",
//       headerName: "Update",
//       flex: 0.5,
//       renderCell: (params) => (
//         <IconButton aria-label="delete" color="success" onClick={() => handleupdateClick(params.row.id)}>
//           <SystemUpdateAltIcon />
//         </IconButton>
//       ),
//     },
//     {
//       field: "delete",
//       headerName: "Delete",
//       flex: 0.5,
//       renderCell: (params) => (
//         <IconButton aria-label="delete" color="error" onClick={() => handleDeleteClick(params.row.userID, 'success')}>
//           <DeleteOutlineIcon />
//         </IconButton>
//       ),
//     },
//   ];

//   return (
//     <Box m="20px">
//       <Header
//         title="Menage Team"
//         subtitle="Managing the Team Members"
//       />
//       <Box
//         m="40px 0 0 0"
//         height="75vh"
//         sx={{
//           "& .MuiDataGrid-root": {
//             border: "none",
//           },
//           "& .MuiDataGrid-cell": {
//             borderBottom: "none",
//           },
//           "& .name-column--cell": {
//             color: colors.greenAccent[300],
//           },
//           "& .MuiDataGrid-columnHeaders": {
//             backgroundColor: colors.blueAccent[700],
//             borderBottom: "none",
//           },
//           "& .MuiDataGrid-virtualScroller": {
//             backgroundColor: colors.primary[400],
//           },
//           "& .MuiDataGrid-footerContainer": {
//             borderTop: "none",
//             backgroundColor: colors.blueAccent[700],
//           },
//           "& .MuiCheckbox-root": {
//             color: `${colors.greenAccent[200]} !important`,
//           },
//           "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
//             color: `${colors.grey[100]} !important`,
//           },
//         }}
//       >
//         <DataGrid
//   rows={mockDataContacts}
//   columns={columns}
//   getRowId={(row) => row.productId} // Assuming productId is a unique identifier
// />
//       </Box>
//     </Box>
//   );
// };

// export default SellerTable;
