import React, { memo, useEffect, useState } from "react";
import Card from "../Card";
import { useTranslation } from "react-i18next";

export default memo(function NewArrival() {
  const [t] = useTranslation();

  let [data1, setdata1] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const productsResponse = await fetch("http://localhost:3001/products");
        const productsData = await productsResponse.json();

        // Select the first 8 products
        const selectedProducts = productsData.slice(0, 8);

        // Fetch details for each selected product concurrently using Promise.all()
        const productDetailPromises = selectedProducts.map((product) =>
          fetch(`http://localhost:3001/products/${product.id}`).then((res) =>
            res.json()
          )
        );

        // Wait for all requests to complete
        const productDetails = await Promise.all(productDetailPromises);

        // Set the product details in state
        setdata1(productDetails);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []);

  return (
    <section className="section-p1">
      <div className="row text-center mb-5">
        <h2>{t("New Arrivals")}</h2>
        <p>{t("Summer Collection New Modern Design")}</p>
      </div>

      <div className="row g-5 ">
        {data1.map((prd, i) => {
          return (
            <div key={i} className="col-lg-3 col-md-4 col-sm-6 mt-0 mb-4 ">
              <Card product={prd}></Card>
            </div>
          );
        })}
      </div>
    </section>
  );
});
