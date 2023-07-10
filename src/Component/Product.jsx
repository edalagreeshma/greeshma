import React, { useContext } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import cdata from '../Data/CoffeeData.json';
import { Acontext } from '../App';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';

const  Product = () => {
  const navigate = useNavigate();
  const { setdata } = useContext(Acontext);
  

  const handleCoffee = () => {
    setdata(cdata.varieties);
    navigate('/data');
    console.log(cdata.varieties)
  };

  const handleTea = () => {
    setdata(cdata.Teadata);
    navigate('/data');
    console.log(cdata.Teadata)
  };

  return (
    <>
    <div className='product-div'>
      <div className="card-container">
        <Card className="card" onClick={handleCoffee}>
          <CardMedia
            component="img"
            height="140"
            image="https://images.unsplash.com/photo-1517376210082-32e866151b28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0Njc1NzN8MHwxfHNlYXJjaHwxfHxjb2ZmZSUyQ2xhdHRlfGVufDB8fHx8MTY4ODA2NDkzNnww&ixlib=rb-4.0.3&q=80&w=400"
            alt="coffee"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Coffee
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a description of the coffee variety.
            </Typography>
          </CardContent>
        </Card>
        <Card className="card" onClick={handleTea}>
          <CardMedia
            component="img"
            height="140"
            image="https://source.unsplash.com/960x520/?Tea"
            alt="tea"
          />
          <CardContent>
            <Typography variant="h5" component="div">
              Tea
            </Typography>
            <Typography variant="body2" color="text.secondary">
              This is a description of the tea variety.
            </Typography>
          </CardContent>
        </Card>
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default  Product;
