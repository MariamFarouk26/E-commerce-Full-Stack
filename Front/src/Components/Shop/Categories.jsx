import React, { memo, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

export default memo(function Categories({ categories, subcategory }) {
  const [currSub, setCurrSub] = useState("");
  const [cat, setCat] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const { category } = useParams();

  useEffect(() => {
    setCurrSub(category);
    setCat(categories);
    // console.log(subcategory);
  }, [category, categories]);

  const fetchSubCategories = async (category) => {
    try {
      const response = await axios.get(`http://localhost:3001/category`);
      const categoryData = response.data.find(
        (item) => item.category === category
      );
      if (categoryData) {
        setSubCategories(categoryData.subCategories);
      }
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    if (currSub) {
      fetchSubCategories(currSub);
    }
  }, [currSub]);

  return (
    <div id="categories">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <h5 style={{ fontWeight: "700" }}>Category</h5>

        <NavLink to={"/shop"} className="text-decoration-none">
          <h4
            className="text-success"
            style={{ fontSize: "1rem", fontWeight: "700" }}
          >
            Clear
          </h4>
        </NavLink>
      </div>

      <div className="mt-4">
        {cat.map((catName, i) => {
          return (
            <div key={i}>
              <NavLink className="listCat" to={`/shop/${catName}`}>
                <h4
                  className={currSub === catName ? "selectedCat" : "text-dark"}
                >
                  {catName}
                </h4>
              </NavLink>
              {currSub === catName && subCategories.length > 0 && (
                <div className="subCategories">
                  {subCategories.map((subCat, index) => (
                    <NavLink
                      key={index}
                      className="listSubCat d-flex"
                      to={`/shop/${catName}/${subCat}`}
                      style={subcategory === subCat ? { color: "#088178" } : {}}
                    >
                      {subcategory === subCat ? (
                        <i className="fa-solid fa-check me-1"></i>
                      ) : (
                        ""
                      )}{" "}
                      <h6>{subCat}</h6>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});
