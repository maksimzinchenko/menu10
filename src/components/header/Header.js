import React from "react";

import commonClasses from '../../common.module.css';
import classes from './Header.module.css';

export default function Header({isStandalone}) {

  const headerTitle = isStandalone ? 'Simple App' : 'Telegram Web App';

  return (
    <header>
      <div className={`${commonClasses.container} ${classes.header}`}>{headerTitle}</div>
    </header>
  );
}
