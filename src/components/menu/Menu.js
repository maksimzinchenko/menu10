import React from 'react';
import MenuItem from './MenuItem';

import commonClasses from '../../common.module.css';
import classes from './Menu.module.css';

export default function Menu({ items, addToCart }) {
  return (
    <div className={`${commonClasses.container} ${classes.menu}`}>
      <h2>Меню</h2>
      {items.map(item => (
        <MenuItem key={item.id} item={item} onClick={addToCart} />
      ))}
    </div>
  );
}