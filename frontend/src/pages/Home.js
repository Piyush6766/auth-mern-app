import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";

function Home() {
  const [loggedInUser, setLoggedInUser] = React.useState("");
  const [products, setProducts] = React.useState([]);

  const navigate = useNavigate();

  React.useEffect(() => {
    const name = localStorage.getItem("name");
    if (name) {
      setLoggedInUser(`Welcome, ${name}`);
    } else {
      setLoggedInUser("Welcome, Guest");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("name");
    localStorage.removeItem("email"); // optional
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    handleSuccess("You have logged out successfully.");
    setLoggedInUser("You have logged out successfully.");
  };

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:8080/products";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });
      const result = await response.json();
      if (response.ok) {
        console.log("Products fetched successfully:", result);
        setProducts(result); // NOT result.products

      } else {
        console.error("Failed to fetch products:", result);
      }


    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  


  return (
    <div className="">
      <h1>This is the home page.</h1>
      <p>{loggedInUser}</p>
      <p>
        This is a simple application to demonstrate user authentication using
        JWT. You can sign up, log in, and access this home page.{" "}
      </p>
      <button onClick={handleLogout}>LogOut</button>

      <h2>Available Products</h2>
     {Array.isArray(products) && products.length > 0 ? (
  products.map((product) => (
    <div key={product._id || product.id || product.name} className="product-card">
      <h3>{product.name}</h3>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  ))
) : (
  <p>No products available.</p>
)}


      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
}

export default Home;
