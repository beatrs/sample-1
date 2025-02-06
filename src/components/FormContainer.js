import React from "react";
import "./Form.scss";

const FormContainer = ({ children }) => {
  return (
    <div className="container">
      <h2 className="title">Exam track</h2>
      {children}
      <p className="footer-text">Copyright © 2024 FE Exam track, All Rights Reserved.</p>
    </div>
  )
}
export default FormContainer