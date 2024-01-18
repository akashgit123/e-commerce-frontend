import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

function ManageOrders() {
  const [status] = useState([
    "Not Processed",
    "Processed",
    "Shipped",
    "Delivered",
    "Canceled",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/orders/all-orders`
      );
      if (data.success) {
        setOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch all orders");
    }
  };

  const handleStatus = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_API}/api/v1/orders/order-status/${orderId}`,
        {
          status: value,
        }
      );
      if (data.success) {
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch all orders");
    }
  };

  useEffect(() => {
    if (auth?.authToken) getOrders();
  }, [auth?.authToken]);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h3 className="mt-2">Manage Orders</h3>
          <hr />
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
                      <td>
                        <Select
                          bordered={false}
                          defaultValue={order?.status}
                          onChange={(value) => handleStatus(order._id, value)}
                        >
                          {status.map((s, i) => {
                            return (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            );
                          })}
                        </Select>
                      </td>
                      <td>{order?.buyer.name}</td>
                      <td>{moment(order?.createdAt).fromNow()}</td>
                      <td>{order?.payment?.success ? "Success" : "Failed"}</td>
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
    </Layout>
  );
}

export default ManageOrders;
