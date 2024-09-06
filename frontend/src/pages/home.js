import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser"));
  }, []);
  const handleLogout = (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedIUser");
    handleSuccess("Logged out successfully");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };
  const fetchProducts = async () => {
    try {
      const url = "http://localhost:1000/api/products";
      const headers = {

        'Authorization': localStorage.getItem("token"),
        'content-type': 'application.json'
      };
      const res = await fetch(url, {headers});
      const result = await res.json();
      if (Array.isArray(result)) {
        
        setProducts(result);
      } else {
        console.error('Expected an array but got : ', result);
      }
    } catch (err) {
      handleError(err.message);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>
      <div>
        {products&&products?.map((item, index) => (
          <ul key={index}>
            <span>
              {item.name} : {item.price}
            </span>
          </ul>
        ))
        }
      </div>
      <ToastContainer />
    </div>
  );
}
export default Home;
