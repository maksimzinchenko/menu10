import React from 'react';

import commonClasses from '../../common.module.css';
import classes from './MenuItem.module.css';

export default function MenuItem({ item, onClick }) {
  return (
    <div className={`${commonClasses.container} ${classes.menuItem}`}>
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>{item.price} $.</p>
      <button onClick={() => onClick(item)}>Add to cart</button>
    </div>
  );
}