import React, { useState, useEffect } from 'react';
import productsData from './data/products.json';
import Chart from './Chart';
import CapacityPieChart from './components/CapacityPieChart';
import './App.css';

const App = () => {
  const [products, setProducts] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [colorFilter, setColorFilter] = useState('');
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    color: '',
    capacity: ''
  });

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const handleNameFilterChange = (e) => {
    setNameFilter(e.target.value);
  };

  const handleColorFilterChange = (e) => {
    setColorFilter(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.color) {
      setProducts((prevProducts) => [
        ...prevProducts,
        {
          ...newProduct,
          id: (prevProducts.length + 1).toString(), // Generate a new id
          data: { color: newProduct.color, capacity: newProduct.capacity }
        }
      ]);
      setNewProduct({ id: '', name: '', color: '', capacity: '' });
    }
  };

  const filteredProducts = products.filter(product => {
    const nameMatch = product.name.toLowerCase().includes(nameFilter.toLowerCase());
    const colorMatch = !colorFilter || (product.data && product.data.color && product.data.color.toLowerCase().includes(colorFilter.toLowerCase()));
    return nameMatch && colorMatch;
  });

  return (
    <div className="App">
      <h1>Product Listing</h1>
      <input 
        type="text" 
        placeholder="Filter by name" 
        value={nameFilter} 
        onChange={handleNameFilterChange}
        className="input"
      />
      <input 
        type="text" 
        placeholder="Filter by color" 
        value={colorFilter} 
        onChange={handleColorFilterChange}
        className="input"
      />
      <div className="form-container">
        <h2>Add New Product</h2>
        <input 
          type="text" 
          name="name" 
          placeholder="Product Name" 
          value={newProduct.name}
          onChange={handleInputChange}
          className="input"
        />
        <input 
          type="text" 
          name="color" 
          placeholder="Color" 
          value={newProduct.color}
          onChange={handleInputChange}
          className="input"
        />
        <input 
          type="text" 
          name="capacity" 
          placeholder="Capacity" 
          value={newProduct.capacity}
          onChange={handleInputChange}
          className="input"
        />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>
      <div className="charts-container">
        <div className="chart-container">
          <Chart data={filteredProducts} />
        </div>
        <div className="chart-container">
          <CapacityPieChart products={filteredProducts} />
        </div>
      </div>
      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.id} className="product-card">
            <h2>{product.name}</h2>
            {product.data && (
              <ul>
                {Object.entries(product.data).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
