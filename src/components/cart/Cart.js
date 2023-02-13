import React from 'react';

import CartItem from './CartItem';

import commonClasses from '../../common.module.css';
import classes from './Cart.module.css';

export default function Cart({ items, removeFromCart, clearCart }) {
  const total = items.reduce((sum, item) => sum + item.price, 0);
  
  return (
    <div className={`${commonClasses.container} ${classes.cart}`}>
      <h2>Корзина</h2>
      {items.length === 0 ? <p>Ваша корзина пуста</p> :
        <div>
          {items.map(item => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))}
          <p>Итого: {total} $.</p>
          <button onClick={clearCart}>Очистить корзину</button>
        </div>
      }
    </div>
  );
}

