import React, { useState } from "react";
import "./Form.scss";
import FormContainer from "./FormContainer";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const { userExists } = useAuth();
  
  const handleChange = ({ target }) => {
		setUsername(target.value);
    setError("");
	};

  const handleSubmit = () => {
    if (userExists(username)) {
      alert('Email sent');
    } else {
      setError("User does not exist");
    }
  }

  return (
    <FormContainer>
      <form>
        <div className="form-group">
          <label htmlFor="username">Name</label>
          <input 
            name="username"
            type="text" 
            placeholder="Username or Email"
            value={username}
            onChange={handleChange}
          />
          {error && (
            <p className="field-error">{ error }</p>
          )}
        </div>
        <button 
          className="btn" 
          type="button"
          onClick={handleSubmit}
        >
          Send
        </button>
        <Link className="text-center" to="/">Back to Login</Link>
      </form>
    </FormContainer>
  )
}
export default ForgotPassword