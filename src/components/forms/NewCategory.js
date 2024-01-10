import React from "react";

function NewCategory({ handleSubmit, setValue }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-75">
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter Category Name"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-primary mt-1">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewCategory;
