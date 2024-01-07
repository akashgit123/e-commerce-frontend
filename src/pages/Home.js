import React from "react";
import Layout from "../components/layouts/Layout";
import { useAuth } from "../context/auth";

function Home() {
  const [auth] = useAuth();
  return (
    <Layout>
      <h1>Home</h1>
      <pre>{JSON.stringify(auth, null, 2)}</pre>
    </Layout>
  );
}

export default Home;
