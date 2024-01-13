import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { toast } from "react-toastify";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

function Header() {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      authToken: "",
    });
    localStorage.removeItem("user");
    navigate("/login");
    toast.success("Logout Successful");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <NavLink className="navbar-brand" to="/">
              🛍️UrShop
            </NavLink>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={"/categories"}
                  data-bs-toggle="dropdown"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li>
                    <Link className="dropdown-item" to="/categories">
                      All Categories
                    </Link>
                  </li>
                  <li>
                    {categories?.map((cat) => {
                      return (
                        <Link
                          className="dropdown-item"
                          to={`category/${cat.slug}`}
                        >
                          {cat.name}
                        </Link>
                      );
                    })}
                  </li>
                </ul>
              </li>
            </ul>
            <Search />
            <div className="d-flex navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart">
                  🛒 Cart {cart?.length ? `(${cart.length})` : " "}
                </NavLink>
              </li>
              {auth.user ? (
                <>
                  <div
                    className="collapse navbar-collapse"
                    id="navbarNavDarkDropdown"
                  >
                    <ul className="navbar-nav">
                      <li className="nav-item dropdown">
                        <NavLink
                          className="nav-link dropdown-toggle"
                          id="navbarDarkDropdownMenuLink"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {auth.user.name}
                        </NavLink>
                        <ul
                          className="dropdown-menu dropdown-menu-dark"
                          aria-labelledby="navbarDarkDropdownMenuLink"
                        >
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to={`/dashboard/${
                                auth.user?.role === 1 ? "admin" : "user"
                              }`}
                            >
                              Dashboard
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                              className="dropdown-item"
                              to="/login"
                              onClick={handleLogout}
                            >
                              Logout
                            </NavLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      Login
                    </NavLink>
                  </li>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
