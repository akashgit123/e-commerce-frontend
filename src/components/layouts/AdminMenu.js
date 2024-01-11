import React from "react";
import { NavLink } from "react-router-dom";

function AdminMenu() {
  return (
    <>
      <div className="container mt-2">
        <h4 className="text-center">Admin Panel</h4>
        <div className="list-group">
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
            key={"cc"}
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
            key={"cp"}
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
            key={"us"}
          >
            Users
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
            key={"pr"}
          >
            Products
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default AdminMenu;
