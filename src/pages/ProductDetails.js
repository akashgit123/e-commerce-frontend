import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function ProductDetails() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/get-product/${params.slug}`
      );
      if (response.data.success) {
        setProduct(response.data.product);
        getSimilarProducts(
          response.data.product?._id,
          response.data.product?.category?._id
        );
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const getSimilarProducts = async (pid, cid) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product//similar-product/${pid}/${cid}`
      );
      if (response.data.success) {
        setRelatedProducts(response.data.similarProducts);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  return (
    <Layout>
      <div className="row container">
        <div className="col-md-6 mt-3">
          <img
            src={`${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-image/${product._id}`}
            className="card-img-top "
            alt={product.name}
          />
        </div>
        <div className="col-md-6 mt-3">
          <h2 className="text-center">ProductDetails</h2>
          <h5>Name : {product.name}</h5>
          <h5>Description : {product.description}</h5>
          <h5>Price : {product.price}</h5>
          <h5>Category : {product.category?.name}</h5>
          <button className="btn btn-secondary">🛒Add to Cart</button>
        </div>
        <div className="mt-2">
          <h3>Related Products</h3>
          <div className="flex flex-wrap">
            {relatedProducts.length === 0 ? (
              <h6>No Similar Products available</h6>
            ) : (
              <>
                {relatedProducts.map((item) => {
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
      </div>
    </Layout>
  );
}

export default ProductDetails;
