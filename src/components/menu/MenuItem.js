import React from 'react';

// import commonClasses from '../../common.module.css';
import classes from './MenuItem.module.css';

export default function MenuItem({ item, onClick }) {
  return (
    <div className={`${classes.menuItem}`}>
      <img className={classes.itemImage} src={item.image} alt={item.name} />
      <h3 className={classes.itemTitle}>{item.name}</h3>
      <p className={classes.itemDescription}>{item.description}</p>
      <p className={classes.itemPrice}>{item.price} $.</p>
      <button className={classes.addToCartButton} onClick={() => onClick(item)}>Add to cart</button>
    </div>
  );
}