import React from "react";
import { Helmet } from "react-helmet";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children, title, description, keywords, author }) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Header />

      <main style={{ height: "80vh" }}>{children}</main>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: "UrShop",
  description: "MERN Stack Project",
  keywords: "Mongodb , Express , Nodejs , React",
  author: "Akash",
};

export default Layout;
