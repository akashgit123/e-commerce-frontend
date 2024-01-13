import axios from "axios";
import { useEffect, useState } from "react";

function useCategory() {
  const [categories, setCategories] = useState([]);

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
    }
  };

  useEffect(() => {
    getAllCategory();
    // eslint-disable-next-line
  }, []);

  return categories;
}

export default useCategory;
