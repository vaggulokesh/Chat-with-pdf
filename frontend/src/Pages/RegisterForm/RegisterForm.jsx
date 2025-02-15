import "./RegisterForm.css";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../Footer/Footer.jsx";

const RegisterForm = () => {
  const [RegisterForm, setRegisterForm] = useState({
    RegisteredFullName: "",
    RegisteredUsername: "",
    RegisteredEmail: "",
    RegisteredPassword: "",
    RegisteredConfirmPassword: "",
    RegisteredGender: "",
  });
  function RegisteredData(event) {
    setRegisterForm({
      ...RegisterForm,
      [event.target.name]: event.target.value,
    });
  }
  function EmailValidate(RegisteredEmail) {
    const keys =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (RegisteredEmail && RegisteredEmail.match(keys)) {
      return true;
    } else {
      return false;
    }
  }
  function RegisterEvent(event) {
    if (
      RegisterForm.RegisteredFullName === "" ||
      RegisterForm.RegisteredFullName === null
    ) {
      toast.warn("Name Cannot be empty");
      event.preventDefault();
      return;
    }
    if (RegisterForm.RegisteredFullName.length < 5) {
      toast.warn("Minimum of 5 character are required");
      event.preventDefault();
      return;
    }
    if (
      RegisterForm.RegisteredUsername === "" ||
      RegisterForm.RegisteredUsername === null
    ) {
      toast.warn("Username cannot be empty");
      event.preventDefault();
      return;
    }
    if (RegisterForm.RegisteredUsername.length < 5) {
      toast.warn("Minimum of 10 characters are required");
      event.preventDefault();
      return;
    }
    if (
      RegisterForm.RegisteredEmail === "" ||
      RegisterForm.RegisteredEmail === null
    ) {
      toast.warn("Email cannot be empty");
      event.preventDefault();
      return;
    }
    if (!EmailValidate(RegisterForm.RegisteredEmail)) {
      toast.warn("Please enter a valid Email Address");
      event.preventDefault();
      return;
    }
    if (
      RegisterForm.RegisteredPassword === "" ||
      RegisterForm.RegisteredPassword === null
    ) {
      toast.warn("Password cannot be empty");
      event.preventDefault();
      return;
    }
    if (
      RegisterForm.RegisteredConfirmPassword === "" ||
      RegisterForm.RegisteredConfirmPassword === null ||
      RegisterForm.RegisteredPassword !== RegisterForm.RegisteredConfirmPassword
    ) {
      toast.warn("Password doesnot match");
      event.preventDefault();
      return;
    }
    if (
      RegisterForm.RegisteredGender === "" ||
      RegisterForm.RegisteredGender === null
    ) {
      toast.warn("Please select your gender");
      event.preventDefault();
      return;
    }
  }
  console.log(RegisterForm);
  return (
    <>
      <div className="registercontainer">
        <h2 className="head">Registration</h2>
        <div className="registerinnercontainer">
          <div className="topcontainer">
            <Form.Floating className="mb-3 custom-width">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="name@example.com"
                name="RegisteredFullName"
                value={RegisterForm.RegisteredFullName}
                onChange={RegisteredData}
                autoFocus
              />
              <label htmlFor="floatingInputCustom">Full Name</label>
            </Form.Floating>
            <Form.Floating className="mb-3 custom-width">
              <Form.Control
                id="floatingInputCustom"
                type="text"
                placeholder="name@example.com"
                name="RegisteredUsername"
                value={RegisterForm.RegisteredUsername}
                onChange={RegisteredData}
              />
              <label htmlFor="floatingInputCustom">Username</label>
            </Form.Floating>
          </div>
          <Form.Floating className="mb-3 ">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="name@example.com"
              className="register"
              name="RegisteredEmail"
              value={RegisterForm.RegisteredEmail}
              onChange={RegisteredData}
            />
            <label htmlFor="floatingInputCustom">Email</label>
          </Form.Floating>
          <Form.Floating className="mb-3 ">
            <Form.Control
              id="floatingInputCustom"
              type="password"
              placeholder="name@example.com"
              className="register"
              name="RegisteredPassword"
              value={RegisterForm.RegisteredPassword}
              onChange={RegisteredData}
            />
            <label htmlFor="floatingInputCustom">Password</label>
          </Form.Floating>
          <Form.Floating className="mb-3 ">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="name@example.com"
              className="register"
              name="RegisteredConfirmPassword"
              value={RegisterForm.RegisteredConfirmPassword}
              onChange={RegisteredData}
            />
            <label htmlFor="floatingInputCustom">Confirm Password</label>
          </Form.Floating>
          <Form.Select
            aria-label="Default select example"
            name="RegisteredGender"
            value={RegisterForm.RegisteredGender}
            onChange={RegisteredData}
            className="register"
          >
            <option>Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Prefer not to say">Prefer not to say</option>
          </Form.Select>
          <div className="registerbtn">
            <Link to="/Login">
              <Button onClick={RegisterEvent} className="registerbtnsection">
                Register
              </Button>
            </Link>
            <ToastContainer
              theme="colored"
              pauseOnFocusLoss
              draggable
              autoClose={5000}
              pauseOnHover
            />
          </div>
          <div className="existingacc">
            <p className="textpara">Already have an Account?</p>
            <Link to="/Login">
              <p className="newuser">Sign In</p>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default RegisterForm;
