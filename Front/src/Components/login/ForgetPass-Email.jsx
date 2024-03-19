import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from "mdb-react-ui-kit";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignUpEmail } from "../../Redux/Slice/Email";

function ForgetPassEmail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const { email } = formData;

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim()) {
      setErrors({ ...errors, email: "Please enter your email." });
      return;
    }
    await axios
      .post("http://localhost:3001/user/forgetPassEmail", { email })
      .then((res) => {
        if (res.data.message === "Email Sent") {
          dispatch(setSignUpEmail(email));
          navigate("/updatePassCode");
        } else {
          setErrors({ ...errors, email: "Wrong email." });
        }
      });
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  return (
    <MDBContainer fluid className="mt-4">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5 d-flex flex-column align-items-center">
              <div className="d-flex align-items-center mb-4">
                <h2 style={{ color: " #088178" }} className="fw-bold mb-0 m-2">
                  Welcome to
                </h2>
                <img
                  className="w-90"
                  src="../assets/img/logo.jpg"
                  alt="logo"
                />
              </div>
              <p className="text-black-100 mb-3">Please enter your email </p>

              <MDBInput
                wrapperClass="mb-4 w-100"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}

              <MDBBtn
                size="lg"
                onClick={handleSubmit}
                style={{ backgroundColor: " #088178" }}
              >
                Send Code{" "}
              </MDBBtn>

              <hr className="my-4" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default ForgetPassEmail;
