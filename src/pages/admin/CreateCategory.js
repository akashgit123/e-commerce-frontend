import React, { useEffect, useState } from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import { toast } from "react-toastify";
import axios from "axios";
import NewCategory from "../../components/forms/NewCategory";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

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
            <NewCategory
              handleSubmit={handleSubmit}
              setValue={setName}
              value={name}
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
                              <button className="btn btn-primary m-2">
                                Update
                              </button>
                              <button className="btn btn-danger">Delete</button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;
