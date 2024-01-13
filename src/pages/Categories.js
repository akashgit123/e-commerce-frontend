import React from "react";
import Layout from "../components/layouts/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";

function Categories() {
  const categories = useCategory();

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mt-3 mb-5">
            {categories?.map((cat) => {
              return (
                <Link
                  to={`/category/${cat.slug}`}
                  className="btn btn-primary m-2"
                >
                  {cat.name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Categories;
