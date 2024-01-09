import React from "react";
import { NavLink } from "react-router-dom";

function UserMenu() {
  return (
    <>
      <div className="container mt-2">
        <h4 className="text-center">Dashboard</h4>
        <div className="list-group">
          <NavLink
            to="/dashboard/user/profile"
            className="list-group-item list-group-item-action"
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/my-orders"
            className="list-group-item list-group-item-action"
          >
            My Orders
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default UserMenu;
