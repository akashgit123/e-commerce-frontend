import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layouts/UserMenu";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import axios from "axios";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [auth, setAuth] = useAuth();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/profile`,
        {
          name,
          email,
          address,
          phone,
        }
      );
      if (response.data.success) {
        setAuth({ ...auth, user: response.data?.updateUser });
        let store = localStorage.getItem("user");
        store = JSON.parse(store);
        store.user = response.data.updateUser;
        localStorage.setItem("user", JSON.stringify(store));
        toast.success(response.data.message);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setName(name);
    setAddress(address);
    setPhone(phone);
    setEmail(email);
  }, [auth?.user]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="container">
              <h4 mt-2>Profile</h4>
              <form onSubmit={handleUpdate}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    required
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">
                    Phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="textarea"
                    className="form-control"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                    }}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update Profile
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
