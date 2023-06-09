import React from "react";
import styles from "./CartLink.module.scss";
import CartIcon from "../../icons/CartIcon";
import { getCookie } from "../../utils";
import useWindowWidth from "../../hooks/useWindowWidth";
import { breakpoints } from "../../config";

function CartLink({ id }) {
  const cartCount = getCookie("cart_number_of_quotes") || 0;
  /* Handle screen sizes: */
  const screenWidth = useWindowWidth();
  const isDesktop = screenWidth >= breakpoints.lg;
  return (
    !!cartCount &&
    isDesktop && (
      <a
        href={"https://secure.sonnet.ca/#/shopping_cart"}
        className={styles.cartButton}
        ariaLabel={`Shopping cart button`}
        id={id}
      >
        <CartIcon />
        <span className={styles.itemCounter}>{cartCount}</span>
      </a>
    )
  );
}

export default CartLink;
