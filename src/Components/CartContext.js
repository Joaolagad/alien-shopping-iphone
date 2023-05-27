import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (itemId) => {
    const itemIndex = cartItems.findIndex((item) => item.id === itemId);
    if (itemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems.splice(itemIndex, 1);
      setCartItems(updatedCartItems);
    }
  };
  

  const clearCart = () => {
    setCartItems([]);
  };

  const cartIsEmpty = cartItems.length === 0;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartIsEmpty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
