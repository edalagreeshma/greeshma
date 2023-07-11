import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Typography } from '@mui/material';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    origin: '',
    strength: '',
    price: '',
    discount: '',
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/coffee');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/tea ', newProduct);
      
      setProducts((prevProducts) => [response.data, ...prevProducts]);
      alert("product added successfully")
      setNewProduct({
        name: '',
        description: '',
        origin: '',
        strength: '',
        price: '',
        discount: '',
      });
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="form-container">
      <div className="create-product-form">
        <Typography variant="h5">Add Product</Typography>
        <form onSubmit={handleSubmit} className="product-form">
          <div>
            <TextField
              label="Name"
              name="name"
              value={newProduct.name}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              className="product-field"
              style={{ marginBottom: '10px' }}
            />
          </div>
          <div>
            <TextField
              label="Description"
              name="description"
              value={newProduct.description}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              className="product-field"
            />
          </div>
          <div>
            <TextField
              label="Origin"
              name="origin"
              value={newProduct.origin}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              className="product-field"
            />
          </div>
          <div>
            <TextField
              label="Strength"
              name="strength"
              value={newProduct.strength}
              onChange={handleInputChange}
              margin="normal"
              variant="outlined"
              className="product-field"
            />
          </div>
          <div>
            <TextField
              label="Price"
              name="price"
              value={newProduct.price}
              onChange={handleInputChange}
              type="number"
              margin="normal"
              variant="outlined"
              className="product-field"
            />
          </div>
          <div>
            <TextField
              label="Discount"
              name="discount"
              value={newProduct.discount}
              onChange={handleInputChange}
              type="number"
              margin="normal"
              variant="outlined"
              className="product-field"
            />
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="product-button"
              style={{ marginRight: '10px' }}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
      <div className="usertable-content">
        {products.length === 0 ? (
          <Typography variant="body1" className="no-products-message">
            No products available
          </Typography>
        ) : (
          <table className="products-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Origin</th>
                <th>Strength</th>
                <th>Price</th>
                <th>Discount</th>
              </tr>
            </thead>
            <tbody>
              {[...products].reverse().map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.origin}</td>
                  <td>{product.strength}</td>
                  <td>{product.price}</td>
                  <td>{product.discount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
