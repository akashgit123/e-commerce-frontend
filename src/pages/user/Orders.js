import React, { useEffect, useState } from "react";
import UserMenu from "../../components/layouts/UserMenu";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import moment from "moment";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/orders/my-orders`
      );
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch your order");
    }
  };

  useEffect(() => {
    if (auth?.authToken) getOrders();
  }, [auth?.authToken]);

  return (
    <Layout>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h3>My Orders</h3>
            {orders?.map((order, index) => {
              return (
                <>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{index + 1}</td>
                        <td>{order?.status}</td>
                        <td>{order?.buyer.name}</td>
                        <td>{moment(order?.createdAt).fromNow()}</td>
                        <td>
                          {order?.payment?.success ? "Success" : "Failed"}
                        </td>
                        <td>{order?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {order?.products?.map((item) => {
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
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
