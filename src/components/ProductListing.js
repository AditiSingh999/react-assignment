import React, { useState } from 'react';
import data from './data';

const ProductListing = () => {
  const [products, setProducts] = useState(data);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filter, setFilter] = useState({});

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const applyFilter = () => {
    const filteredData = products.filter((product) => {
      const { name, data } = product;
      const filterKeys = Object.keys(filter);
      return filterKeys.every((key) => {
        const filterValue = filter[key];
        return data[key] === filterValue || name.includes(filterValue);
      });
    });
    setFilteredProducts(filteredData);
  };

  return (
    <div>
      <h1>Product Listing</h1>
      <div className="filter-container">
        <input
          type="text"
          name="name"
          value={filter.name}
          onChange={handleFilterChange}
          placeholder="Search by name"
        />
        <select
          name="color"
          value={filter.color}
          onChange={handleFilterChange}
        >
          <option value="">Select color</option>
          {products.map((product) => (
            <option key={product.id} value={product.data.color}>
              {product.data.color}
            </option>
          ))}
        </select>
        <button onClick={applyFilter}>Apply Filter</button>
      </div>
      <ul>
        {filteredProducts.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>
              {product.data.color} | {product.data.capacity}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListing;