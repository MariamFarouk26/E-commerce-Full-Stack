import React, { useState } from 'react';
import FacebookLogin from 'react-facebook-login';
import Swal from 'sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js';

const Facebook = () => {
    const [facebookProfile, setFacebookProfile] = useState(null);
    const responseFacebook = (response) => {
      if (response.error) {
        console.log('Facebook login failed:', response.error);
      } else {
        console.log('Facebook login successful:', response);
        setFacebookProfile(response);
      }
    };
    
    return (
    <div>
      {/* <h1>Login with Facebook</h1> */}
      <FacebookLogin
      appId="7243707319044905"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      // icon="fa-facebook"
      //  textButton="F"
      //   buttonStyle={{width:'39px',backgroundColor:'white',color:'blue'}}
      //   size='small'
      icon="fa-facebook"
      textButton=" "
      buttonStyle={{ width: '39px',height:"39px", backgroundColor: 'white', color: 'green', textAlign:'center' }}
      size="medium"
      cssClass='border '
     />       
      {facebookProfile && Swal.fire({
        title: `Welcome ${facebookProfile?.name}, you have logged in successfully!`,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        }
      })} 
    </div>
)}

export default Facebook;
