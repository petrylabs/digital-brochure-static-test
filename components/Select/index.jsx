import React, { useState } from "react";
import MuiSelect from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useRef, useEffect } from "react";
import { Controller } from "react-hook-form";

import useWindowWidth from "../../hooks/useWindowWidth";
import { breakpoints } from "../../config";
import SelectModal from "../SelectModal";
import styles from "./Select.module.scss";
import { MenuList } from "@mui/material";

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

  const MenuItemList = (optionsList, selectedValue, handleClick) => {
    return optionsList.map((option, i) => (
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
    ));
  };

  return (
    <>
      <label htmlFor="interest">{label}</label>
      <Controller
        name="interestedIn"
        control={methods.control}
        render={({ field: { onChange, value } }) => (
          <>
            <MuiSelect
              id="select"
              name="interest"
              ref={select}
              value={value}
              onChange={onChange}
              onOpen={handleOpen}
              open={open}
              className={`${styles.root} ${open ? styles.activeInput : ""} `}
              classes={{
                select: styles.select,
                icon: styles.icon,
              }}
              native={false}
              variant={"outlined"}
              MenuProps={{
                onKeyDown: (e) => e.key === "Tab" && setOpen(false),
                classes: {
                  paper: styles.paper,
                  list: styles.menuList,
                },
              }}
            >
              {MenuItemList(options, value, handleMenuItemClick)}
            </MuiSelect>

            {/* On mobile, select options are shown in a full-screen modal: */}
            {isMobile && (
              <SelectModal
                open={isMenuModalOpen}
                onOpen={() => setMenuModalOpen(true)}
                onClose={() => setMenuModalOpen(false)}
              >
                <MenuList
                  autoFocusItem
                  classes={{ root: styles.mobileMenuList }}
                >
                  {MenuItemList(options, value, (e) => {
                    onChange(e.target.textContent);
                    handleMenuItemClick(e);
                  })}
                </MenuList>
              </SelectModal>
            )}
          </>
        )}
      />
    </>
  );
}

export default Select;
