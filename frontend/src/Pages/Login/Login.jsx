import { useState } from "react";
import Form from "react-bootstrap/Form";
import "./Login.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
const Login = () => {
  const [Login, setLogin] = useState({
    LoginUsername: "",
    LoginPassword: "",
  });
  function LoginData(event) {
    setLogin({ ...Login, [event.target.name]: event.target.value });
  }
  console.log(Login.LoginUsername);
  console.log(Login.LoginPassword);
  function LoginEvent(event) {
    if (Login.LoginUsername === "" || Login.LoginUsername === null) {
      toast.warn("Username cannot be empty");
      event.preventDefault();
      return;
    }
    if (Login.LoginPassword === "" || Login.LoginPassword === null) {
      toast.warn("Password cannot be empty");
      event.preventDefault();
      return;
    } else {
      toast.success("Logined In sucessfully");
      return;
    }
  }
  return (
    <>
      <div className="signupcontainer">
        <h2>Login</h2>
        <div className="innercontainer">
          <Form.Floating className="mb-6">
            <Form.Control
              id="floatingInputCustom"
              type="email"
              placeholder="name@example.com"
              className="inputs"
              name="LoginUsername"
              value={Login.LoginUsername}
              onChange={LoginData}
              required
              autoFocus
            />
            <label htmlFor="floatingInputCustom"> Username</label>
          </Form.Floating>
          <Form.Floating>
            <Form.Control
              id="floatingPasswordCustom"
              type="password"
              placeholder="Password"
              className="inputs"
              name="LoginPassword"
              value={Login.LoginPassword}
              onChange={LoginData}
              required
            />
            <label htmlFor="floatingPasswordCustom">Password</label>
          </Form.Floating>
          <div className="btncontainer">
            <Link to="/Bot">
              <button onClick={LoginEvent} className="login">
                Login
              </button>
            </Link>
            <ToastContainer
              theme="colored"
              pauseOnFocusLoss
              draggable
              autoClose={5000}
              pauseOnHover
            />
          </div>
          <div className="new">
            <p className="textpara">Don't have an account?</p>
            <Link to="/Register">
              <p className="newuser">Sign Up Now</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
