import React from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";

function CartPage() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  //   const navigate = useNavigate();

  const totalAmount = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        return (total = total + item.price);
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log("Total error ", error);
    }
  };

  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((val) => val._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Removed the item");
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove item");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light ">{`Hello ${
              auth.authToken ? auth.user.name : ""
            }`}</h1>
            <h5 className="text-center">
              {cart?.length > 0
                ? `You have ${cart.length} items in your cart ${
                    auth?.authToken ? " " : " Please Login to Checkout"
                  }`
                : " Your Cart is Empty Now"}
            </h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {cart.map((item) => {
              return (
                <div className="row my-2 card flex-row">
                  <div className="col-md-4 my-2 ">
                    <img
                      src={`${process.env.REACT_APP_BACKEND_API}/api/v1/product/product-image/${item._id}`}
                      className="card-img-top"
                      alt={item.name}
                      style={{ height: "200px", width: "200px" }}
                    />
                  </div>
                  <div className="col-md-8 my-2">
                    <p>Name : {item.name}</p>
                    <p>Descriptin : {item.description} </p>
                    <p>Price : {item.price} </p>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => {
                        e.preventDefault();
                        removeCartItem(item._id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="col-md-4">
            <h2>Summary</h2>
            <p>Total | Checkout | Payment </p>
            <hr />
            <h4>Total : {totalAmount()}</h4>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
