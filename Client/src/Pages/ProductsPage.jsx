import React from "react";
import Layout from "../Components/Layout/Layout";
import { useAuth } from "../Context/auth";

function ProductsPage() {
  const [auth, setAuth] = useAuth();
  // console.log(auth);

  const { user, token } = auth;

  return (
    <Layout>
      <div>ProductsPage</div>
      <pre>
        User: {user && JSON.stringify(user, null, 2)}
        Token: {token}
      </pre>
    </Layout>
  );
}

export default ProductsPage;
