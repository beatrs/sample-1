import React, { useState } from "react";
import "./Form.scss";
import FormContainer from "./FormContainer";
import { useAuth } from "./AuthContext";
import { Link, useNavigate } from "react-router-dom";

const INITIAL_STATES = {
  username: "",
  password: ""
};

const Login = () => {
  const [user, setUser] = useState(INITIAL_STATES);
  const [errors, setErrors] = useState(INITIAL_STATES);
  const { login } = useAuth();
  const navigate = useNavigate();

  
  const validate = (name, value) => {
		let error = "";
		switch(name) {
			case "username":
        if (!value) {
          error = "Username is required";
        } else if (!/^\w+@[a-zA-Z_\s]+?\.[a-zA-Z]{2,3}(.[a-zA-Z]{2,3})?$/.test(
        value)) {
					error = "Invalid email";
				}
        break;
      case "password": 
        if (!value || value.length < 4) {
          error = "Input valid password";
        }
        break;
			default:
				break;
		};
		return error;
	};

  const handleChange = ({ target: { name, value }}) => {
		setUser({ ...user, [name]: value });
		setErrors({ ...errors, login: "", [name]: "" });
	};

  const handleBlur = ({ target: { name, value }}) => {
		setErrors({ ...errors, [name]: validate(name, value) });
	};

  const handleSubmit = () => {
    if (login(user.username, user.password)) {
      navigate("/home");
    } else {
      setErrors({ ...errors, login: "Invalid username or password" })
    }
  };


  return (
    <FormContainer>
      <form>
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input 
            name="username"
            type="text" 
            placeholder="Username or Email"
            value={user.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && (
            <p className="field-error">{ errors.username }</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input 
            name="password"
            type="password" 
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.password && (
            <p className="field-error">{ errors.password }</p>
          )}
        </div>
        <button
          className="btn"
          type="button"
          onClick={handleSubmit}
          disabled={user.password.length < 4}
        >
          Login
        </button>
        {errors?.login && (
          <p className="field-error">{ errors.login }</p>
        )}
        <Link className="text-center" to="/forgot_pass">Forgot Password?</Link>
      </form>
    </FormContainer>
  )
}
export default Login