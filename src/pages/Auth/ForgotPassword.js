import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Layout from "../../components/layouts/Layout";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/forgot-password`,
        {
          email,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/forgot-password");
      } else {
        toast.error(data.message);
        navigate("/forgot-password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  return (
    <Layout>
      <div className="signup">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
            />
          </div>
          <div className="d-flex flex-column  mb-3">
            <button type="submit" className="btn btn-primary">
              Send Mail
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default ForgotPassword;
