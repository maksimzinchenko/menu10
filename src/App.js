import { useState, useEffect } from "react";



import Header from "./components/header/Header";
import Menu from "./components/menu/Menu";
import Cart from "./components/cart/Cart";
import Footer from "./components/footer/Footer";

import "./App.css";

function App() {
  const [menuItems, setMenuItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);


    // useEffect(() => {
    //     tg.ready();
    // }, [tg])

  const isTelegram =
    typeof window.Telegram.WebApp !== "undefined";

  useEffect(()=>{
    if (isTelegram) {
      alert(window.Telegram.WebApp.initData);
    } else {
      alert('standlone');
    };
    setMenuItems([
      {'id': '59a46597-e48d-4dc1-b014-fd3908649c6d', 'name': 'Meal 1', 'price': 2.5, 'is_active': true, 'order': 1},
    {'id': 'e81d9cdb-71e3-440d-9bfb-d9b97d89f957', 'name': 'Meal 2', 'price': 3, 'is_active': true, 'order': 1},
    {'id': 'ed1c6231-ccb3-4527-b8a2-0bf6851676d7', 'name': 'Meal 3', 'price': 26, 'is_active': true, 'order': 1},
    {'id': 'a2ac5f5b-3463-4c42-b0fc-020ecc3be819', 'name': 'Meal 4', 'price': 21, 'is_active': true, 'order': 1},
    {'id': '5abc49cd-f1e3-470e-8d0f-670b09d16cac', 'name': 'Meal 5', 'price': 5, 'is_active': true, 'order': 1},
    {'id': '4472f08c-9c9a-4902-83aa-1247188c7eb8', 'name': 'Meal 6', 'price': 15, 'is_active': true, 'order': 1},
    {'id': 'dc74415a-38b0-418e-bd0d-af95a4c02004', 'name': 'Meal 7', 'price': 0.5, 'is_active': true, 'order': 1},
    ]);
  }, [isTelegram]);

  // useEffect(() => {
  //   fetch("/menu_items")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMenuItems(data);
  //       console.log(data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

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
