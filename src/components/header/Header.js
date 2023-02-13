import React from "react";

import commonClasses from '../../common.module.css';
import classes from './Header.module.css';

export default function Header() {
  return (
    <header>
      <div className={`${classes.header} ${commonClasses.container}`}>Header</div>
    </header>
  );
}
