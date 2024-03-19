import Header from "../../Components/dashboard/Header";
import Typography from "@mui/material/Typography";
import { Box, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Cookies from 'universal-cookie';
import axios from "axios";
import * as React from 'react';
import { useSnackbar } from 'notistack';

const FAQ = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [mockDataContacts, setMockDataContacts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const cookies = new Cookies(); 
    const JWT = cookies.get("x-auth-token");
  

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3001/user");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setMockDataContacts(data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleDeleteClick = async (rowId,variant) => {
 
  
    if(JWT) {
      const header={
        headers: {
          'x-auth-token': JWT,
        }
      }
      axios.delete(`http://localhost:3001/user/${rowId}`, header)
      .then(response => {
        setMockDataContacts((prevData) =>
        prevData.filter((row) => row.userID !== rowId)
        );
        enqueueSnackbar('Successfully Deleted!', { variant });
      })};
  }
  const columns = [
    { field: "userID", headerName: "ID", flex: 0.25 },
    {
      field: "name",
      headerName: "Name",
      flex: 0.75,
      cellClassName: "name-column--cell",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 0.75,
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },

    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row }) => {
        let access = "";
        if (row && row.isAdmin === true) {
          access = "Admin";
        } else if (row && row.isSeller === true) {
          access = "Seller";
        } else if (row && row.isUser === true) {
          access = "User";
        }

        return (
          <Box
            width="60%"
            m="0 "
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              access === "admin"
                ? colors.greenAccent[600]
                : access === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          > 
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {access}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "delete",
      headerName: "Delete",
      flex: 0.5,
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleDeleteClick(params.row.userID,'success')  }
          >
          <DeleteOutlineIcon />
        </IconButton>
      ),},
  ];
  return (
    <Box m="20px">
      <Header
        title="Menage Team"
        subtitle="Managing the Team Members"
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
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default FAQ;






