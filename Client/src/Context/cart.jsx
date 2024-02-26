import axios from "axios";
import { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext(); // Create the context

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
useEffect(()=>{
 const existingCartItem=localStorage.getItem("cart")
 if(existingCartItem) setCart(JSON.parse(existingCartItem))
},[])
  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
const useCart = () => {
  const context = useContext(CartContext); // Use useContext to get the context value

  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { useCart, CartProvider };
















