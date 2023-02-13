import React from 'react'

export default function CartItem({ item, onRemove }) {
    return (
      <div className="CartItem">
        <h3>{item.name}</h3>
        <p>Цена: {item.price} руб.</p>
        <p>Количество: {item.quantity}</p>
        <button onClick={() => onRemove(item)}>Удалить</button>
      </div>
    );
  }
  