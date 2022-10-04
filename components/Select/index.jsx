/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useEffect } from "react";

import useWindowWidth from "../../hooks/useWindowWidth";
import { breakpoints } from "../../config";
import SelectModal from "../SelectModal";
import styles from "./Select.module.scss";

/**
 * Select
 * Select input field wrapper on MUI select
 */
function Select({ options, label }) {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  const select = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [select]);

  const handleClickOutside = (event) => {
    if (select.current && !select.current.contains(event.target)) {
      setOpen(false);
    }
  };

  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.md;

  const handleSelect = (e) => {
    setOpen(false);
    setValue(e.target.value);
  };

  const handleOpen = () => {
    isMobile ? setMenuModalOpen(true) : setOpen(true);
  };

  const handleMenuItemClick = (e) => {
    setValue(e.target.textContent);
    isMobile ? setMenuModalOpen(false) : setOpen(false);
  };

  return (
    <>
      <label htmlFor="interest">{label}</label>
      <MuiSelect
        id="select"
        name="interest"
        ref={select}
        value={value}
        onChange={handleSelect}
        onOpen={handleOpen}
        open={open}
        className={`${styles.input} ${open ? styles.activeInput : ""} `}
        classes={{
          select: styles.select,
        }}
        native={false}
        variant={"outlined"}
        MenuProps={{
          onKeyDown: (e) => e.key === "Tab" && setOpen(false),
          classes: {
            paper: isMobile ? styles.none : styles.paper,
            list: styles.menuList,
          },
        }}
        inputProps={{
          classes: {
            root: styles.input,
          },
        }}
      >
        {MenuItemList(options, value, handleMenuItemClick)}
      </MuiSelect>
      {isMobile && (
        <SelectModal
          open={isMenuModalOpen}
          onOpen={() => setMenuModalOpen(true)}
          onClose={() => setMenuModalOpen(false)}
        >
          <div className={styles.modalContainer}>
            {MenuItemList(options, value, handleMenuItemClick)}
          </div>
        </SelectModal>
      )}
    </>
  );
}

export default Select;

const MenuItemList = (optionsList, selectedValue, handleClick) => {
  return optionsList.map((option, i) => {
    return (
      <MenuItem
        key={i}
        value={option.key}
        selected={selectedValue == option.value}
        divider={true}
        classes={{
          root: styles.menuItem,
          selected: styles.selectedMenuItem,
        }}
        onClick={handleClick}
      >
        {option.value}
      </MenuItem>
    );
  });
};
