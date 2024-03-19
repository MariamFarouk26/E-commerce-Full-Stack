import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { tokens } from '../../theme';
import Header from '../../Components/dashboard/Header';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSnackbar } from 'notistack';

const Team = () => {
  const [mockDataContacts, setMockDataContacts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDeleteClick = async (id, variant) => {
    console.log(id);
    try {
      const response = await axios.delete(
        `http://localhost:3001/comments/${id}`
      );
      console.log(response);
      getData();
      enqueueSnackbar('Successfully Deleted!', { variant });
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const columns = [
    { field: 'id', headerName: ' ' },
    {
      field: 'user',
      headerName: 'Name',
      flex: 1,
      cellClassName: 'name-column--cell',
      renderCell: (params) => {
        return params.row.user.name;
      },
    },
    {
      field: 'productID',
      headerName: 'Product ID',
      flex: 1,
    },
    {
      field: 'message',
      headerName: 'Review Message',
      flex: 1,
    },
    {
      field: 'email',
      headerName: 'Send Email',
      flex: 1,
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <Box
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.greenAccent[600]}
            borderRadius="4px"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              window.location.href = 'mailto:' + params.row.user.email;
            }}
          >
            <Typography
              component="span"
              sx={{ color: 'white', ml: '5px' }} 
            >
              {params.row.user.email}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: 'delete',
      headerName: 'Delete',
      flex: 1,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <IconButton
          aria-label="delete"
          color="error"
          onClick={() => handleDeleteClick(params.row.id, 'success')}
        >
          <DeleteOutlineIcon />
        </IconButton>
      ),
    },
  ];

  const getData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/comments');
      console.log(response);
      setMockDataContacts(response.data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };
  useEffect(() => {
    getData();
  }, [mockDataContacts]);

  return (
    <Box m="20px">
      <Header title="Customers Reviews" subtitle="Managing Customers complaints and sending them emails" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: 'none',
          },
          '& .name-column--cell': {
            color: colors.greenAccent[300],
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: colors.blueAccent[700],
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: colors.primary[400],
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: colors.blueAccent[700],
          },
          '& .MuiCheckbox-root': {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={mockDataContacts} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
