import React from "react";

import commonClasses from "../../common.module.css";
import classes from "./Footer.module.css";

export default function Footer() {
  return (
    <footer>
      <div className={`${commonClasses.container} ${classes.footer}`}>
        Footer
      </div>
    </footer>
  );
}
