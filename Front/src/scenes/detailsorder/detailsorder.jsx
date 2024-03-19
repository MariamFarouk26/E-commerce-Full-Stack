
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Box,
    Avatar,
    Grid,

  } from "@mui/material";
  import React, { useEffect, useState } from "react";
  import { useLocation } from "react-router-dom";
  import MailOutlineIcon from "@mui/icons-material/MailOutline";
  import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
  import CurrencyPoundIcon from '@mui/icons-material/CurrencyPound';
  import ContactsIcon from "@mui/icons-material/Contacts";

const Detailsorder = () => {
    const [sellerData, setSellerData] = useState(null);

    const location=useLocation()
    useEffect(() => {
        if (location.state && location.state.data) {
          setSellerData(location.state.data);
        }
      }, [location.state]);



    return (
        <Container fixed sx={{ marginTop: "4%", marginBottom: "20px" }}>
        <Typography variant="h4" gutterBottom></Typography>
        {sellerData && (
          <Grid container spacing={2}>
            
            <Grid item xs={12} md={58}>
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        &nbsp; &nbsp;
                        <strong>OrderID</strong>
                      </TableCell>
                      <TableCell>{sellerData.orderID}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        &nbsp; &nbsp;
                        <strong>ProductID</strong>
                      </TableCell>
                      <TableCell>{sellerData.productID}</TableCell>
                    </TableRow>
  
                    <TableRow>
                      <TableCell>
                        <MailOutlineIcon /> &nbsp; &nbsp;
                        <strong>Category</strong>
                      </TableCell>
                      <TableCell>{sellerData.category}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <LocalPhoneIcon /> &nbsp; &nbsp;
                        <strong>Email</strong>
                      </TableCell>
                      <TableCell>{sellerData.userEmail}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <CurrencyPoundIcon /> &nbsp; &nbsp;
                        <strong>TotalPrice</strong>
                      </TableCell>
                      <TableCell>{sellerData.totalPrice}</TableCell>
                    </TableRow>
                  </TableBody>
              
                </Table>
              </TableContainer>

  
      </Grid>
          </Grid>
        )}
      </Container>
    );
}

export default Detailsorder;
