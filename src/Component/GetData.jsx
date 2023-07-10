import React, { useState, useContext, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import { Acontext } from '../App';
import KpiTable from './KpiTable';
import Product from './Product';

const ITEMS_PER_PAGE = 6;

const GetData = () => {
  const { search, setCartItems } = useContext(Acontext);
  const { isadminloggedin } = useContext(Acontext);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredVarieties, setFilteredVarieties] = useState([]);
  const [sortType, setSortType] = useState(null);
  const { data } = useContext(Acontext);

  useEffect(() => {
    const searchQuery = search ? search.toString().toLowerCase() : '';

    let filteredData = data.filter(variety =>
      variety.name.toLowerCase().includes(searchQuery)
    );

    if (sortType) {
      filteredData = filteredData.filter(variety => variety.strength === sortType);
    }

    setFilteredVarieties(filteredData);
    setCurrentPage(1);
  }, [search, sortType, data]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const handleSort = type => {
    setSortType(prevSortType => (prevSortType === type ? null : type));
  };

  const handleAddToCart = variety => {
    setCartItems(prevCartItems => [...prevCartItems, variety]);
  };

  const handleAddProduct = variety => {
    if (isadminloggedin) {
      setCartItems(prevCartItems => [...prevCartItems, variety]);
    }
  };

  const handleDelete = idx => {
    const filteredData = filteredVarieties.filter((item, index) => index !== idx);
    setFilteredVarieties(filteredData);
  };

  const handleUpdate =(idx)=>{

  }
  const handleBuynow =(idx)=>{
    
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const displayedVarieties = filteredVarieties.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="Sbar">
      <div className="d-flex justify-content-center">
        <div className="button-container">
          <Button
            variant="contained"
            color="warning"
            className={sortType === 'Light' ? 'active-button' : ''}
            onClick={() => handleSort('Light')}
            style={{ margin: 10 }}
          >
            Light
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={sortType === 'Medium' ? 'active-button' : ''}
            onClick={() => handleSort('Medium')}
            style={{ margin: 10 }}
          >
            Medium
          </Button>
          <Button
            variant="contained"
            color="warning"
            className={sortType === 'Strong' ? 'active-button' : ''}
            onClick={() => handleSort('Strong')}
          >
            Strong
          </Button>
        </div>
      </div>

      <div className="card-container">
        {displayedVarieties.map((variety, index) => (
          <Card key={index} className="card">
            <CardMedia component="img" height="140" image={variety.image} alt={variety.name} />
            <CardContent>
              <Typography variant="h5" component="div">
                {variety.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {variety.description}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="my-2">
                Price: {variety.price}
              </Typography>
              {isadminloggedin ? (
                <Button
                  variant="contained"
                  color="primary"
                  className="add-to-cart-button my-2 mx-2"
                  onClick={() => handleDelete(index)}
                >
                  Update
                </Button>
              ) : ( 
               <Button
                variant="contained"
                color="primary"
                className="buy-now-button my-2 mx-2"
              >
                Buy Now
              </Button>
                
              )}
              {isadminloggedin ? (
                <Button
                  variant="outlined"
                  color="primary"
                  className="add-to-cart-button my-2 mx-2"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="primary"
                  className="add-to-cart-button my-2 mx-2"
                  onClick={() => handleAddToCart(variety)}
                >
                  
                  Add to Cart
                </Button>
                
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="pagination-container">
        {Array.from(
          { length: Math.ceil(filteredVarieties.length / ITEMS_PER_PAGE) },
          (_, index) => (
            <Button
              key={index}
              variant={index + 1 === currentPage ? 'contained' : 'outlined'}
              onClick={() => handlePageChange(index + 1)}
              className="pagination-button"
            >
              {index + 1}
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default GetData;
