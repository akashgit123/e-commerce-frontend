import React from "react";
import UserMenu from "../../components/layouts/UserMenu";
import Layout from "../../components/layouts/Layout";

function Profile() {
  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">Profile</div>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
