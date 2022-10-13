/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useEffect } from "react";
import { Controller } from "react-hook-form";

import useWindowWidth from "../../hooks/useWindowWidth";
import { breakpoints } from "../../config";
import SelectModal from "../SelectModal";
import styles from "./Select.module.scss";

/**
 * Select
 * Select input field wrapper on MUI select
 */
function Select({ options, label, methods }) {
  const [isMenuModalOpen, setMenuModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

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

  const handleOpen = () => {
    isMobile ? setMenuModalOpen(true) : setOpen(true);
  };

  const handleMenuItemClick = (e) => {
    isMobile ? setMenuModalOpen(false) : setOpen(false);
    setValue(e.target.textContent);
  };

  return (
    <>
      <label htmlFor="interest">{label}</label>
      <Controller
        name="interestedIn"
        control={methods.control}
        render={({ field: { onChange } }) => (
          <>
            <MuiSelect
              id="select"
              name="interest"
              ref={select}
              value={value}
              onChange={onChange}
              onOpen={handleOpen}
              open={open}
              className={`${styles.input} ${open ? styles.activeInput : ""} `}
              classes={{
                select: styles.select,
                icon: styles.icon, 
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
        )}
      />
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
