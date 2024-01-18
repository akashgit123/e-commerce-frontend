import React, { useState } from "react";
import Layout from "../../components/layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UpdatePassword() {
  const params = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/update-password/${params.token}`,
        {
          password,
          cpassword,
        }
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/login");
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
        <h1>Update Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="mb-1">
            <label htmlFor="password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={cpassword}
              onChange={(e) => {
                setCpassword(e.target.value);
              }}
              required
            />
          </div>
          <div className="d-flex flex-column  mt-3">
            <button type="submit" className="btn btn-primary">
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}

export default UpdatePassword;
