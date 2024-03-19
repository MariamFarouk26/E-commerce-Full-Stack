import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Components/dashboard/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import * as React from 'react';
import { Link } from "react-router-dom";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockDataContacts, setMockDataContacts] = useState([]);


  const columns = [
 
    {
      field: "orderID",
      headerName: "Order ID",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "userID",
      headerName: "User ID",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1,
    },
    {
      field: "userEmail",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "totalPrice",
      headerName: " $Price",
      flex: 1,
    },
    {
      field: "productID",
      headerName: " product ID ",
      flex: 1,
    },
    {
      field: "category",
      headerName: "Categories",
      flex: 1,
    },
    {
      field: "",
      headerName: "",
      flex: 1,
      renderCell: (params) => (
        <Link
          className="text-decoration-none"
          to= "/dashboard/Detailsorder"
            state={{data:params.row}}
        
        >
          Show Details
        </Link> 
    )}
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3001/orders");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();

        const newData = data.map((row, index) => ({
          ...row,
          id: index + 1, 
        }));
        setMockDataContacts(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getData();
  }, []);


  return (
    <Box m="20px">
      <Header
        title="ORDERS"
        subtitle="List of Orders for all customers"
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
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
