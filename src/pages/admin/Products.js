import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/all-products`
      );
      if (response.data.success) {
        setProducts(response.data.product);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    fetchAllProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="m-2">Products</h3>
            <hr />
            <div className="d-flex">
              {products.length === 0 ? (
                <h6>No Products available</h6>
              ) : (
                <>
                  {products.map((item) => {
                    return (
                      <Link
                        className="card-link"
                        key={item._id}
                        to={`/dashboard/admin/product/${item.slug}`}
                      >
                        <div className="card" style={{ width: "18rem" }}>
                          <img
                            src={`${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-image/${item._id}`}
                            className="card-img-top"
                            alt={item.name}
                          />
                          <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">{item.description}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
