import { useState, useEffect } from "react";

import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";

import "./App.css";

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const isTelegram =
    typeof window.tg !== "undefined" ||
    typeof window.TelegramGameProxy !== "undefined" ||
    typeof window.TelegramLoginWidget !== "undefined";

  useEffect(()=>{
    if (isTelegram) {
      alert('in telegram');
    } else {
      alert('standlone');
    }
  }, []);

  useEffect(() => {
    fetch("/menu_items")
      .then((response) => response.json())
      .then((data) => {
        setMenuItems(data);
        console.log(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const addToCart = (menuItem) => {
    const existingItem = cartItems.find((item) => item.id === menuItem.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === menuItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...menuItem, quantity: 1 }]);
    }
  };

  const removeFromCart = (cartItem) => {
    const existingItem = cartItems.find((item) => item.id === cartItem.id);
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== cartItem.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Menu items={menuItems} addToCart={addToCart} />
        <Cart
          items={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />
      </main>
      <Footer />
    </div>
  );
}

export default App;
