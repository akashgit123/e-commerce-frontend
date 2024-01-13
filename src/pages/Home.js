import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import Checkbox from "antd/es/checkbox/Checkbox";
import { Prices } from "../components/Prices";
import { Radio } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

function Home() {
  const [cart, setCart] = useCart();

  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getAllCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/category/fetch-category`
      );
      if (response.data.success) {
        setCategories(response.data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((val) => val !== id);
    }
    setChecked(all);
  };

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/filter-products`,
        {
          checked,
          radio,
        }
      );
      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-page/${page}`
      );
      if (response.data.success) {
        setLoading(false);
        setProducts(response.data.products);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const loadMoreProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-page/${page}`
      );
      if (response.data.success) {
        setLoading(false);
        setProducts([...products, ...response?.data?.products]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const gettotalProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-count`
      );
      if (response.data.success) {
        setTotal(response.data.totalCount);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    gettotalProduct();
    if (!checked.length || !radio.length) {
      fetchAllProducts();
    } // eslint-disable-next-line
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    } // eslint-disable-next-line
  }, [checked, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMoreProducts();
    // eslint-disable-next-line
  }, [page]);

  return (
    <Layout>
      <div className="row mt-2">
        <div className="col-md-3">
          <h3 className="text-center">Filters</h3>
          <hr />
          <h5 className="mx-2">Categories</h5>
          {categories.length === 0 ? (
            <h6 className="text-center">No categories available</h6>
          ) : (
            <div className="d-flex flex-column mx-2">
              {categories.map((cat) => {
                return (
                  <>
                    <Checkbox
                      key={cat._id}
                      onChange={(e) => {
                        handleFilter(e.target.checked, cat._id);
                      }}
                    >
                      {cat.name}
                    </Checkbox>
                  </>
                );
              })}
            </div>
          )}
          <h5 className="mx-2 mt-2">Prices</h5>
          <div className="d-flex flex-column mx-2">
            <Radio.Group
              className="d-flex flex-column"
              onChange={(e) => setRadio(e.target.value)}
            >
              {Prices?.map((price) => {
                return (
                  <Radio key={price.id} value={price.array}>
                    {price.name}
                  </Radio>
                );
              })}
            </Radio.Group>
          </div>
          <button
            className="btn-sm btn-primary mt-2 mx-2"
            onClick={() => {
              setChecked([]);
              setRadio([]);
            }}
          >
            Reset
          </button>
        </div>
        <div className="col-md-9">
          <h3 className="text-center">Products</h3>
          <hr />
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
                        <button
                          className="btn btn-secondary"
                          onClick={(e) => {
                            // e.preventDefault();
                            setCart([...cart, item]);
                            localStorage.setItem(
                              "cart",
                              JSON.stringify([...cart, item])
                            );
                            toast.success("Added to Cart");
                          }}
                        >
                          🛒Add to Cart
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
          <div>
            {products && products.length < total && (
              <button
                className="btn btn-info mt-2 mx-2"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Home;
