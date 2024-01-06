import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer bg-dark text-white p-2 position-absolute bottom-0 w-100">
      <h6 className="text-center">All Rights Reserved &copy; UrShop</h6>
      <p className="text-center mt-1 mb-0">
        <Link to="/about"> About </Link> |
        <Link to="/policy"> Privacy Policy </Link> |
        <Link to="/contact"> Contact</Link> |
      </p>
    </div>
  );
}

export default Footer;
