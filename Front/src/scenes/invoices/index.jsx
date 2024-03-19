import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../Components/dashboard/Header";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [admit,setadmit]=useState([]);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch("http://localhost:3001/user");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        // Filter data where isSeller is true
        const sellerData = data.filter(row => row.isSeller);
      
        // Add unique id to each row
        const newData = sellerData.map((row, index) => ({
          ...row,
          id: index + 1,
       
        }));

        setadmit(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    getData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
      renderCell: (params) => (
        <div>
          <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          {params.row.admit && <span style={{ marginLeft: 5 }}><AdminPanelSettingsIcon></AdminPanelSettingsIcon></span>}
            {params.value}

          </Typography>
        </div>
      ),
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
  
    {
      field: "",
      headerName: "",
      flex: 1,
      renderCell: (params) => (
        <Link
          className="text-decoration-none"
          to= "/dashboard/seller"
            state={{data:params.row}}
        
        >
          Show Details
        </Link> 
    )}
    
  ];

  return (
    <Box m="20px">
      <Header title="Accept sellers" subtitle="List of sellers" />
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
        }}
      >
        <DataGrid checkboxSelection rows={admit} columns={columns} />
      </Box>
    </Box>
  );
};

export default Invoices;
