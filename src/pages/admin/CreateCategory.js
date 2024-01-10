import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import { Modal } from "antd";
import CategoryForm from "../../components/forms/CategoryForm";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [updateName, setUpdateName] = useState("");
  const [catData, setCatData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/category/create-category`,
        {
          name: name,
        }
      );
      if (response.data.success) {
        getAllCategory();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/category/update-category/${catData._id}`,
        {
          name: updateName,
        }
      );
      if (response.data.success) {
        getAllCategory();
        toast.success(response.data.message);
        setCatData(null);
        setUpdateName("");
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/category/delete-category/${id}`
      );
      if (response.data.success) {
        getAllCategory();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getAllCategory();
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
            <h3 className="m-2">Manage Category</h3>
            <hr />
            <CategoryForm
              handleSubmit={handleSubmit}
              setValue={setName}
              value={name}
              button="ADD"
            />
            {categories.length === 0 ? (
              <h6>No category available</h6>
            ) : (
              <div className="w-75">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories?.map((cat) => {
                      return (
                        <>
                          <tr>
                            <td key={cat._id}>{cat.name}</td>
                            <td>
                              <button
                                className="btn btn-primary me-2"
                                onClick={() => {
                                  setIsModalOpen(true);
                                  setUpdateName(cat.name);
                                  setCatData(cat);
                                }}
                              >
                                Update
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDelete(cat._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
            <Modal
              footer={null}
              open={isModalOpen}
              onOk={() => {
                setIsModalOpen(false);
              }}
              onCancel={() => {
                setIsModalOpen(false);
              }}
            >
              <CategoryForm
                button="UPDATE"
                value={updateName}
                setValue={setUpdateName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
