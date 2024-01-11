import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const navigate = useNavigate();
  const params = useParams();
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState("");

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/get-product/${params.slug}`
      );
      if (response.data.success) {
        setName(response.data.product.name);
        setId(response.data.product._id);
        setDescription(response.data.product.description);
        setPrice(response.data.product.price);
        setQuantity(response.data.product.quantity);
        setShippingAddress(response.data.product.shippingAddress);
        setCategory(response.data.product.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

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

  const handleUpdateProduct = async (e) => {
    try {
      e.preventDefault();
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("image", image);
      productData.append("category", category._id);
      productData.append("shippingAddress", shippingAddress);
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/update-product/${id}`,
        productData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const answer = window.prompt(
        "Are you sure you want to Delete this Product"
      );
      if (!answer) return;
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/product/delete-product/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
    getProduct();
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
            <h3 className="m-2">Update Product</h3>
            <hr />
            <div className="w-75">
              {categories.length === 0 ? (
                <p>Please add category in category page</p>
              ) : (
                <Select
                  placeholder="Select a Category"
                  size="large"
                  bordered={false}
                  showSearch
                  className="form-select mb-3"
                  onChange={(val) => {
                    setCategory(val);
                  }}
                  value={category.name}
                >
                  {categories.map((cat) => (
                    <Option key={cat._id} value={cat._id}>
                      {cat.name}
                    </Option>
                  ))}
                </Select>
              )}

              <div className="mb-3">
                <label className="btn btn-outline-secondary">
                  {image ? image.name : "Upload Image "}
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {image ? (
                  <div>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={image.name}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                ) : (
                  <div>
                    <img
                      src={`${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-image/${id}`}
                      alt={image.name}
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={name}
                  placeholder="Enter Product's Name"
                  className="form-control"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="textarea"
                  value={description}
                  placeholder="Enter Product's Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={price}
                  placeholder="Enter Product's Price"
                  className="form-control"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="number"
                  value={quantity}
                  placeholder="Enter Product's Quantity"
                  className="form-control"
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <Select
                  placeholder="Select Shipping"
                  size="large"
                  bordered={false}
                  showSearch
                  className="form-select mb-3"
                  onChange={(val) => {
                    setShippingAddress(val);
                  }}
                  value={shippingAddress ? "Yes" : "No"}
                >
                  <Option value="1">Yes</Option>
                  <Option value="0">No</Option>
                </Select>
              </div>
              <div className="mb-3 ">
                <button
                  className="btn btn-primary me-3"
                  onClick={handleUpdateProduct}
                >
                  UPDATE PRODUCT
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleDeleteProduct}
                >
                  DELETE PRODUCT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UpdateProduct;
