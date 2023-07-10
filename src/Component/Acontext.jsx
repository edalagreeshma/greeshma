import React, { createContext, useState } from 'react';

export const Acontext = createContext();

// const AcontextProvider = ({ children }) => {
//   const sampleProducts = [
//     { id: 1, name: 'Product 1', price: 10 },
//     { id: 2, name: 'Product 2', price: 20 },
//     { id: 3, name: 'Product 3', price: 30 },
    
//   ];

//   const sampleUsers = [
//     { id: 1, name: 'User 1', email: 'user1@example.com' },
//     { id: 2, name: 'User 2', email: 'user2@example.com' },
//     { id: 3, name: 'User 3', email: 'user3@example.com' },
    
//   ];

  const [data, setData] = useState(sampleProducts);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState('');
  const [isadminloggedin, setisadminloggedin] = useState(false);

  return (
    <Acontext.Provider
      value={{
        data,
        setData,
        cartItems,
        setCartItems,
        search,
        setSearch,
        users: sampleUsers,
        isadminloggedin,
        setisadminloggedin,
      }}
    >
      {children}
    </Acontext.Provider>
  );
// };

export default AcontextProvider;
