import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";

function CreateCategory() {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">CreateCategory</div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
