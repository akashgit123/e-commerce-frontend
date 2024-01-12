import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import Checkbox from "antd/es/checkbox/Checkbox";
import { Prices } from "../components/Prices";
import { Radio } from "antd";

function Home() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

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
    getAllCategory();
    if (!checked.length || !radio.length) {
      fetchAllProducts();
    }
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProducts();
    } // eslint-disable-next-line
  }, [checked, radio]);

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
                      className="card"
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
                        <button className="btn btn-primary me-2">View</button>
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

export default Home;
