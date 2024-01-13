import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function CategoryProduct() {
  const params = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({});
  const [products, setProducts] = useState([]);

  const getCategoryWiseProducts = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-category/${params.slug}`
      );
      if (response.data.success) {
        setCategory(response.data.category);
        setProducts(response.data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (params?.slug) getCategoryWiseProducts();
    // eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout>
      <div className="container mt-3">
        <h3 className="text-center">{category?.name}</h3>
        <h6 className="text-center">Total Products :{products?.length}</h6>
        <div className="d-flex flex-wrap">
          {products.length === 0 ? (
            <h6>No Products available</h6>
          ) : (
            <>
              {products.map((item) => {
                return (
                  <div
                    className="card mx-2 my-2"
                    key={item._id}
                    style={{ width: "18rem" }}
                  >
                    <img
                      src={`${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-image/${item._id}`}
                      className="card-img-top"
                      alt={item.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text mb-1">
                        {item.description.substring(0, 30)}..
                      </p>
                      <p className="card-text">Rs.{item.price}</p>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          navigate(`/product/${item.slug}`);
                        }}
                      >
                        View
                      </button>
                      <button className="btn btn-secondary">
                        🛒Add to Cart
                      </button>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default CategoryProduct;
