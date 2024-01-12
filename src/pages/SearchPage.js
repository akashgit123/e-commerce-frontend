import React from "react";
import { useSearch } from "../context/search";
import Layout from "../components/layouts/Layout";

function SearchPage() {
  const [search] = useSearch();
  return (
    <Layout>
      <div className="container">
        <h3 className="text-center">Search Results</h3>
        <h6 className="text-center">
          {search.result.length === 0
            ? "No Products Found"
            : `Found ${search.result.length} Products`}
        </h6>
        <div className="d-flex flex-wrap mt-4">
          {search.result.map((item) => {
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
                  <button className="btn btn-primary me-2">View</button>
                  <button className="btn btn-secondary">🛒Add to Cart</button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
