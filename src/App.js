import { useState, useEffect, useCallback } from "react"



import Header from "./components/header/Header"
import Menu from "./components/menu/Menu"
import Cart from "./components/cart/Cart"
import Footer from "./components/footer/Footer"

import { useTelegram } from "./hooks/useTelegram"

import "./App.css"


const MENUITEMS = [
  {
    id: "59a46597-e48d-4dc1-b014-fd3908649c6d",
    name: "Meal 1",
    price: 2.5,
    is_active: true,
    order: 1,
    image: "../media/bakery.jpg",
  },
  {
    id: "e81d9cdb-71e3-440d-9bfb-d9b97d89f957",
    name: "Meal 2",
    price: 3,
    is_active: true,
    order: 1,
    image: "../media/breakfast.jpg",
  },
  {
    id: "ed1c6231-ccb3-4527-b8a2-0bf6851676d7",
    name: "Meal 3",
    price: 26,
    is_active: true,
    order: 1,
    image: "../media/meat.jpg",
  },
  {
    id: "a2ac5f5b-3463-4c42-b0fc-020ecc3be819",
    name: "Meal 4",
    price: 21,
    is_active: true,
    order: 1,
    image: "../media/bakery.jpg",
  },
  {
    id: "5abc49cd-f1e3-470e-8d0f-670b09d16cac",
    name: "Meal 5",
    price: 5,
    is_active: true,
    order: 1,
    image: "../media/breakfast.jpg",
  },
  {
    id: "4472f08c-9c9a-4902-83aa-1247188c7eb8",
    name: "Meal 6",
    price: 15,
    is_active: true,
    order: 1,
    image: "../media/meat.jpg",
  },
  {
    id: "dc74415a-38b0-418e-bd0d-af95a4c02004",
    name: "Meal 7",
    price: 0.5,
    is_active: true,
    order: 1,
    image: "../media/bakery.jpg",
  },
]

const getTotalPrice = (items = []) => {
  return items.reduce((acc, item) => {
    return (acc += item.price * item.quantity)
  }, 0)
}

function App() {
  const [menuItems, setMenuItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [isStandalone, setStandalone] = useState(true)
  // eslint-disable-next-line
  const [showCart, setShowCart] = useState(false)
  const { tg, queryId } = useTelegram()

  const onSendData = useCallback(() => {
    // eslint-disable-next-line
    const data = {
      products: cartItems,
      queryId,
    }

    console.log('pressed send')
    // fetch('http://85.119.146.179:8000/web-data', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(data)
    // })
  }, [queryId, cartItems])

  useEffect(() => {
    tg.onEvent('mainButtonClicked', onSendData)
    return () => {
      tg.offEvent('mainButtonClicked', onSendData)
    }
  }, [tg, onSendData])

  useEffect(() => {
    tg.ready()

  }, [tg])

  const isTelegram = window.Telegram.WebApp.initData.length > 0

  useEffect(() => {
    if (isTelegram) {
      setStandalone(false)
    } else {
      setStandalone(true)
    }
    setMenuItems(MENUITEMS)
  }, [isTelegram])

  // useEffect(() => {
  //   fetch("/menu_items")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMenuItems(data);
  //       console.log(data);
  //     })
  //     .catch((error) => console.error(error));
  // }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      if (isTelegram) {
        tg.MainButton.hide()
      } else {
        setShowCart(false)
      }
    } else {
      if (isTelegram) {
        tg.MainButton.show()
        tg.MainButton.setParams({
          text: `Order (total: $${getTotalPrice(cartItems)})`,
        })
      } else {
        setShowCart(true)
      }
    }
  }, [cartItems, isTelegram, tg.MainButton]);

  const addToCart = (menuItem) => {
    const existingItem = cartItems.find((item) => item.id === menuItem.id)
    if (existingItem) {
      setCartItems(cartItems.map((item) =>
        item.id === menuItem.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCartItems([...cartItems, { ...menuItem, quantity: 1 }])
    }
  }

  const removeFromCart = (cartItem) => {
    const existingItem = cartItems.find((item) => item.id === cartItem.id)
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== cartItem.id))
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === cartItem.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      )
    }
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <div className="App">
      <Header isStandalone={isStandalone} />
      <main>
        {!showCart && <Menu items={menuItems} addToCart={addToCart} />}
        {showCart && <Cart
          items={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
        />}
      </main>
      <Footer />
    </div>
  )
}

export default App;

