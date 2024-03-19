import React, { useEffect, useState } from 'react';
import Card from '../Card';
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export default memo(function Featured() {
  const [t] = useTranslation();

  let [data1, setdata1] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const ordersResponse = await fetch('http://localhost:3001/orders');
        const ordersData = await ordersResponse.json();
        ordersData.reverse();

        const productIds = ordersData.flatMap((prd) => prd.productID);
        let uniqueProductIDs = new Set(productIds);
        uniqueProductIDs = [...uniqueProductIDs];

        const productRequests = uniqueProductIDs.map(async (productId) => {
          const productResponse = await fetch(
            `http://localhost:3001/products/${productId}`
          );
          return productResponse.json();
        });

        const productDataArray = await Promise.all(productRequests);
        setdata1(productDataArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getData();
  }, []);

  return (
    <div id="featured" className="my-5">
      <div className="text-center mb-5">
        <h2>{t('Featured Products')}</h2>
        <p>{t('Summer Collection New Modern Design')}</p>
      </div>

      <div className="g-5">
        <Splide
          options={{
            type: 'loop',
            gap: '3em',
            drag: 'free',
            arrows: false,
            pagination: false,
            perPage: 4,
            autoScroll: {
              pauseOnHover: true,
              pauseOnFocus: false,
              rewind: false,
              speed: 1,
            },
            breakpoints: {
              900: { perPage: 3 },
              640: { perPage: 2 },
            },
          }}
          extensions={{ AutoScroll }}
        >
          {data1.map((prd) => {
            return (
              <SplideSlide key={prd.id}>
                <Card product={prd}></Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </div>
    </div>
  );
});
