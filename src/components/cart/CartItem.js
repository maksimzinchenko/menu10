import React from 'react';

import commonClasses from '../../common.module.css';
import classes from './CartItem.module.css';

export default function CartItem({ item, onRemove }) {
    return (
      <div className={`${commonClasses.container} ${classes.cartItem}`}>
        <h3>{item.name}</h3>
        <p>Цена: {item.price} $.</p>
        <p>Количество: {item.quantity}</p>
        <button onClick={() => onRemove(item)}>Удалить</button>
      </div>
    );
  }