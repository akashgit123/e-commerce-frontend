import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";

function Users() {
  return (
    <Layout>
      {" "}
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">Users</div>
        </div>
      </div>
    </Layout>
  );
}

export default Users;
