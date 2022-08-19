import React from "react";
import styles from "./CartButton.module.scss";
import CartIcon from "../../icons/CartIcon";
import PropTypes from "prop-types";

function CartButton(props) {
  const { count } = props;
  return (
    <a
      href={"/shopping_cart"}
      className={styles.cartButton}
      ariaLabel={`Shopping cart button`}
    >
      <CartIcon />
      <span className={styles.itemCounter}>{count}</span>
    </a>
  );
}

CartButton.propTypes = {
  count: PropTypes.number,
};

export default CartButton;
