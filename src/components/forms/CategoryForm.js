import React from "react";

function CategoryForm({ handleSubmit, value, setValue, button }) {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 w-75">
          <input
            type="text"
            className="form-control"
            id="name"
            value={value}
            placeholder="Enter Category Name"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <button type="submit" className="btn btn-primary mt-1">
            {button}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CategoryForm;
