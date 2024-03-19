import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Card from '../Card';

export default memo(function Search({ products, category }) {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [sortBy, setSortBy] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(12);

  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = filteredData?.slice(firstPostIndex, lastPostIndex);

  const totalPages = Math.ceil(filteredData?.length / postsPerPage); // Correct calculation of total pages

  useEffect(() => {
    const getAllData = async () => {
      setData(products);
      setFilteredData(products);
    };
    getAllData();
    setSortBy('');
    setCurrentPage(1);
  }, [products, category]);

  function search(e) {
    let searchVal = e.target.value;
    let searchResult;

    searchResult = data.filter((el) => {
      return el.title.toLowerCase().includes(searchVal.toLowerCase());
    });

    setFilteredData(searchResult);
  }

  const handleSortChange = (e) => {
    const sortByValue = e.target.value;

    if (sortByValue === 'lowToHigh') {
      const sortedData = [...data].sort((a, b) => a.price - b.price);
      setFilteredData(sortedData);
      setSortBy('lowToHigh');
    } else if (sortByValue === 'highToLow') {
      const sortedData = [...data].sort((a, b) => b.price - a.price);
      setFilteredData(sortedData);
      setSortBy('highToLow');
    } else {
      setFilteredData(data);
      setSortBy('');
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div id="search" className="mb-5">
      <div
        className="priceFilter d-flex justify-content-end"
        style={{ marginBottom: '15px' }}
      >
        <select
          id="sortDropdown"
          className="form-select"
          onChange={handleSortChange}
          value={sortBy}
        >
          <option value="" disabled hidden>
            Sort by:
          </option>
          <option value="lowToHigh">Price: Low to High</option>
          <option value="highToLow">Price: High to Low</option>
        </select>
      </div>

      <SearchContainer>
        <SearchIcon className="fa-solid fa-magnifying-glass"></SearchIcon>
        <SearchInput
          type="text"
          placeholder="Search for Products..."
          onChange={search}
        />
      </SearchContainer>

      <div className="row g-4">
        {currentPost?.map((prd, i) => {
          return (
            <div key={i} className="col-lg-3 col-md-6">
              <Card product={prd}></Card>
            </div>
          );
        })}
      </div>

      <div className="pagination pt-2 pb-5">
        <button onClick={prevPage}>Previous</button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
  );
});

const SearchContainer = styled.div`
  position: relative;
  margin-bottom: 1.6rem;
`;

const SearchInput = styled.input`
  padding: 13px 14px 12px 40px;
  border: 1px solid #494949;
  // border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.8rem;
  color: #1c1c1c;
  width: 100%;
  font-size: 1.2rem;

  &::placeholder {
    color: #1c1c1c;
  }
`;

const SearchIcon = styled.i`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  color: #1c1c1c;
  z-index: 1;
`;
