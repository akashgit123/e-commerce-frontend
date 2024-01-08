import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/auth/admin-auth`
      );
      if (response.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.authToken) {
      authCheck();
    }
  }, [auth?.authToken]);
  return ok ? <Outlet /> : <Spinner path=" " />;
}

export default AdminRoute;
