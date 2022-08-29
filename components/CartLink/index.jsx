import React from "react";
import styles from "./CartLink.module.scss";
import CartIcon from "../../icons/CartIcon";
import { getCookie } from "../../utils";

function CartLink() {
  const cartCount = getCookie("cart_number_of_quotes");
  return (
    cartCount && (
      <a
        href={"/shopping_cart"}
        className={styles.cartButton}
        ariaLabel={`Shopping cart button`}
      >
        <CartIcon />
        <span className={styles.itemCounter}>{cartCount}</span>
      </a>
    )
  );
}

export default CartLink;
