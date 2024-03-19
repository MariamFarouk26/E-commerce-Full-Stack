import React, { useEffect, useState } from "react";
import Navbar from "../Components/Home/Navbar";
import Categories from "../Components/Shop/Categories";
import Search from "../Components/Shop/Search";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../Components/Home/footer";

export default function Shop() {
  const [currCat, setcurrCat] = useState(null);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const { category, subcategory } = useParams();

  const fetchCategories = async () => {
    await axios.get("http://localhost:3001/category").then((res) => {
      const categoryNames = res.data.map((cat) => cat.category);
      setCategories(categoryNames);
    });
  };

  useEffect(() => {
    setcurrCat(category);
    fetchCategories();
    const fetchData = async () => {
      try {
        let url;

        if (subcategory) {
          url = `http://localhost:3001/products/${category}/${subcategory}`;
        } else if (currCat) {
          url = `http://localhost:3001/products/findByCategory/category/${currCat}`;
        } else {
          url = "http://localhost:3001/products";
        }
        await axios.get(url).then((res) => {
          setData(res.data);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [category, subcategory, currCat]);

  return (
    <>
      <Navbar></Navbar>
      <div id="shop">
        <section
          className="container-fluid d-flex flex-column justify-content-center align-items-center text-center"
          style={{
            backgroundImage: "url('../Assets/img/about/banner.png')",
            height: "30vh",
            backgroundSize: "cover",
            padding: "1rem",
            color: "#fff",
            marginBottom: "1.3rem",
          }}
        >
          <h1 className="d-block">{currCat || "#Cara Shop"}</h1>
          <p style={{ color: "white" }}>We wish you a happy shopping</p>
          {subcategory ? <h4 className="d-block">{subcategory}</h4> : ""}
        </section>

        <div className="container-fluid" style={{ overflowX: "hidden" }}>
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <Categories
                categories={categories}
                subcategory={subcategory}
              ></Categories>
            </div>
            <div className="col-lg-9 col-md-8">
              <Search products={data} category={currCat}></Search>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
