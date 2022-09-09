/* eslint-disable @next/next/no-img-element */
import React from "react";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";

import styles from "./SignUpModalContent.module.scss";
import signUpModalData from "../../site-data/signUpModal.preval";
import recaptchaSiteKeyData from "../../site-data/recaptchaSiteKey.preval";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import NavItem from "../NavItem";
import { useReducer } from "react";
import { useState } from "react";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
};

const sx = {
  fontFamily: "Averta-Regular, Arial, Helvetica, sans-serif",
  height: "calc(1.5em + 0.75rem + 4px)",
  legend: { display: "none" },
  "& :focus ": {
    borderRadius: 0,
    padding: "10px 14px",
    color: "#495057",
    borderColor: "#80bdff",
    outline: 0,
    boxShadow: "none",
    border: "3px solid #147582",
  },

  // "&:focus .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
  //   color: "#495057",
  //   borderColor: "#80bdff",
  //   outline: 0,
  //   boxShadow: "none",
  //   border: "3px solid #147582",
  // },
  // "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //   color: "purple",
  // },
  // "& .MuiSelect-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
  //   borderColor: "purple",
  //   backgroundColor: "red",
  // },

  // "& .MuiSelect-select": {
  //   color: "#495057",
  //   borderColor: "#80bdff",
  //   outline: 0,
  //   boxShadow: "none",
  //   border: "3px solid #147582",
  // },
  // "& fieldset.MuiOutlinedInput-notchedOutline": {
  //   color: "#495057",
  //   borderColor: "#80bdff",
  //   outline: 0,
  //   boxShadow: "none",
  //   border: "3px solid #147582",
  // },
  // "& .MuiMenu-paper.MuiPopover-paper": {
  //   backgroundColor: "black",
  // },
};

/**
 * SignUpModalContent
 * The body of the "Sign up" modal (displayed inside a `Modal`)
 */
function SignUpModalContent() {
  const fieldsData = signUpModalData.data.newsletterForm.fields;
  const googleRecaptchaKey = recaptchaSiteKeyData.data.googleRecaptchaKey;
  const [formData, setFormData] = useReducer(formReducer, {});
  const [submitting, setSubmitting] = useState(false);

  const data = fieldsData.reduce((acc, obj) => {
    const key = obj["key"];
    const value = obj["value"];
    acc[key] = value;
    return acc;
  }, {});

  const interestedList = data.interestedList.split("\n");
  console.log(interestedList);
  const interestedOptions = interestedList.map((x) => {
    const data = x.split("|");
    return {
      key: data[0],
      value: data[1],
    };
  });
  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      setSubmitting(false);
    }, 3000);
  };

  return (
    <div>
      {console.log({ formData, submitting })}
      <h2 className={styles.title}>{data.title}</h2>
      <FormControl sx={{ m: 1, minWidth: 120 }}></FormControl>
      <form action="" className={styles.signUpForm} onSubmit={handleSubmit}>
        <div className={styles.row}>
          <label htmlFor="first-name">{data.firstName}</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            className={styles.formControl}
            required="required"
            aria-required="true"
            minLength={2}
            maxLength={30}
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.row}>
          <label htmlFor="last-name">{data.lastName}</label>
          <input
            required="required"
            name="lastName"
            aria-required="true"
            minLength={1}
            maxLength={30}
            type="text"
            className={styles.formControl}
            id="last-name"
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.row}>
          <label htmlFor="email-address">{data.email}</label>
          <input
            required="required"
            name="email"
            aria-required="true"
            type="email"
            className={styles.formControl}
            id="email-address"
            onChange={handleChange}
          ></input>
        </div>
        <div className={styles.row}>
          <label htmlFor="interest">{data.interested}</label>
          {/* {console.log(styles.row)} */}
          <Select
            id="select"
            name="interest"
            value={formData.interest}
            onChange={handleChange}
            // classes={{
            //   root: styles.input,
            //   // select: styles.select,
            //   legend: styles.legend,
            //   focused: styles.select,
            // }}
            variant={"outlined"}
            sx={sx}
          >
            {interestedOptions.map((x, i) => {
              return (
                <MenuItem
                  key={i}
                  value={x.key}
                  sx={{
                    fontFamily: "Averta-Regular, Arial, Helvetica, sans-serif",
                    "& :hover": {
                      background: "#f2f2f2",
                    },
                  }}
                >
                  {x.value}
                </MenuItem>
              );
            })}
          </Select>
        </div>
        <div className={styles.row}>
          <span>{data.recaptchaText}</span>
        </div>
        {/* Key needs to be replaced with Sonnet */}
        {/** use following key for testing "6Lc1r7YhAAAAAMQ7ZHkzMyTK6yW9qz4ULKZviH9S" */}
        <div className={styles.row}>
          <ReCAPTCHA sitekey={googleRecaptchaKey} />
        </div>
        <div className={styles.row}>
          <span>
            {parse(data.privacy, {
              replace: (domNode) => {
                console.log({ domNode });
                const { name, attribs } = domNode;
                if (name === "snt-link") {
                  return (
                    <NavItem
                      href={attribs.href}
                      title={" Privacy Notice"}
                      style={{ color: "#147582" }}
                    ></NavItem>
                  );
                }
              },
            })}
          </span>
        </div>
        <button className={styles.submitButton}>Submit</button>
      </form>
    </div>
  );
}

export default SignUpModalContent;
