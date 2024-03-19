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
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

function UpdatePassForm() {
  const navigate = useNavigate();
  const SignUpEmail = useSelector((state) => state.SignUpEmail.SignUpEmail);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { password, confirmPassword } = formData;

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (!password.trim()) {
      setErrors({ ...errors, password: "Please enter a password." });
      return;
    }

    if (!confirmPassword.trim()) {
      setErrors({
        ...errors,
        confirmPassword: "Please confirm your password.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: "Passwords do not match." });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrors({
        ...errors,
        password:
          "Password must contain at least 2 characters, one uppercase, one lowercase, and at least 8 characters in total.",
      });
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:3001/user/updatePass",
        {
          email: SignUpEmail,
          password,
        },
        { withCredentials: true }
      );
      if (res.data.message === "Password Updated ") {
        toast.success("Password updated successfully");
        navigate("/");
      } else {
        setErrors({ ...errors, password: "Failed to update password." });
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <MDBContainer fluid className="mt-4">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">
          <MDBCard
            className="bg-white my-5 mx-auto"
            style={{ borderRadius: "1rem", maxWidth: "500px" }}
          >
            <MDBCardBody className="p-5">
              <h2 style={{ color: "#088178" }} className="fw-bold mb-4">
                Update Password
              </h2>
              <MDBInput
                wrapperClass="mb-4 w-100 position-relative d-flex justify-content-between"
                label="New Password"
                id="password"
                type={showPassword ? "text" : "password"}
                size="lg"
                name="password"
                value={password}
                onChange={handleInputChange}
              >
                <i
                  className={`bi bi-eye${
                    showPassword ? "-slash" : ""
                  } position-absolute top-50  translate-middle-y`}
                  onClick={togglePasswordVisibility}
                  style={{
                    height: "30px",
                    width: "30px",
                    cursor: "pointer",
                    right: "10px",
                    lineHeight: "30px",
                    textAlign: "center",
                    border: "1px solid black",
                    borderRadius: "15px",
                  }}
                ></i>
              </MDBInput>
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
              <MDBInput
                wrapperClass="mb-4 w-100 position-relative d-flex justify-content-between"
                label="Confirm Password"
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                size="lg"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleInputChange}
              >
                <i
                  className={`bi bi-eye${
                    showConfirmPassword ? "-slash" : ""
                  } position-absolute top-50 translate-middle-y`}
                  onClick={toggleConfirmPasswordVisibility}
                  style={{
                    height: "30px",
                    width: "30px",
                    cursor: "pointer",
                    right: "10px",
                    lineHeight: "30px",
                    textAlign: "center",
                    border: "1px solid black",
                    borderRadius: "15px",
                  }}
                ></i>
              </MDBInput>
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )}

              <MDBBtn
                size="lg"
                onClick={handleSubmit}
                style={{ backgroundColor: "#088178" }}
              >
                Update Password
              </MDBBtn>

              <hr className="my-4" />
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default UpdatePassForm;
