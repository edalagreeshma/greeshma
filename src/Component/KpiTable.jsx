import React, { useContext, useEffect, useState } from 'react';
import { Acontext } from '../App';
import { Box, Paper } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import PeopleIcon from '@mui/icons-material/People';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import CardTravelIcon from '@mui/icons-material/CardTravel';

const KpiTable = () => {
  const { data, user, cartItems, setuser } = useContext(Acontext);

  const [graphData, setGraphData] = useState([]);

  const totalProducts = data ? data.length : 0;
  const totalUsers = user ? user.length : 0;
  const totalOrders = cartItems ? cartItems.length : 0;

  useEffect(() => {
    axios.get('http://localhost:4000/Userdata').then((res) => {
      setuser(res.data);
    }).catch((error) => {
      console.error('Error fetching user data:', error);
    });
  }, [setuser]);

  useEffect(() => {
    if (Array.isArray(user)) {
      const newData = user.map((value) => ({
        Name: value.name,
        ProductsPurchased: value.id,
      
      }));
      console.log(newData)
      
      setGraphData(newData);
    }
  }, [user]);

  return (
    <>
      <Box display="flex" justifyContent="space-around" maxWidth={800} margin="20px auto">
        <Paper elevation={3} sx={{ p: 2 }}>
          <div>
          <h3>Total Products</h3>
          <p>{totalProducts}</p>
          </div>
          <div>
            <CardTravelIcon/>
          </div>
        </Paper>
        <Paper elevation={3} sx={{ p: 2 }}>
          <div>
          <h3>Total Users</h3>
          <p>{totalUsers}</p>
          </div>
          <div>
          <PeopleIcon/>
          </div>
        </Paper>
        <Paper elevation={3} sx={{ p: 2 }}>
          <div>
          <h3>Total Orders Received</h3>
          <p>{totalOrders}</p>
          </div>
          <div>
          <AddShoppingCartIcon/>
          </div>
        </Paper>
      </Box>
      <div style={{ margin: '20px auto', maxWidth: 800 }}>
        {graphData.length > 0 ? (
          <LineChart width={800} height={400} data={graphData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ProductsPurchased" stroke="#8884d8" />
          </LineChart>
        ) : (
          <p>No graph data available</p>
        )}
      </div>
    </>
  );
};

export default KpiTable;
