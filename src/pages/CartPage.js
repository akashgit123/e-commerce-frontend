import React, { useEffect, useState } from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

function CartPage() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/payment/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/payment/braintree/payment`,
        {
          nonce,
          cart,
        }
      );
      console.log(data);
      setCart([]);
      setLoading(false);
      localStorage.removeItem("cart");
      navigate("/dashboard/user/my-orders");
      toast.success("Payment Successful");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth?.authToken]);

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
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Current Address :{auth.user.address}</h5>
                  <button
                    className="btn btn-warning"
                    onClick={() => {
                      navigate("/dashboard/user/profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="nb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        navigate("/dashboard/user/profile");
                      }}
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-warning"
                      onClick={() => {
                        navigate("/login", { state: "/cart" });
                      }}
                    >
                      Please Login
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-3">
              {!clientToken || cart.length === 0 ? (
                " "
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => {
                      setInstance(instance);
                    }}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={loading}
                  >
                    {loading ? "Processing" : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default CartPage;
