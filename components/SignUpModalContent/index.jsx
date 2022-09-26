/* eslint-disable @next/next/no-img-element */
import React, { useReducer, useState } from "react";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";

import { breakpoints } from "../../config";
import styles from "./SignUpModalContent.module.scss";
import signUpModalData from "../../site-data/signUpModal.preval";
import recaptchaSiteKeyData from "../../site-data/recaptchaSiteKey.preval";
import FooterLink from "../FooterLink";
import useWindowWidth from "../../hooks/useWindowWidth";
import CTA from "../CTA";
import Select from "../Select";
import { getDelimitedOptions } from "../../utils/array";

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value,
  };
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

  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;

  const data = fieldsData.reduce((acc, obj) => {
    const key = obj["key"];
    const value = obj["value"];
    acc[key] = value;
    return acc;
  }, {});
  console.log(data);

  const interestedOptions = getDelimitedOptions(data.interestedList, "\n");

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  /* TODO: handle submission */
  const handleSubmit = (event) => {};

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data.title}</h2>
      <form className={styles.signUpForm} onSubmit={handleSubmit}>
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
          <Select options={interestedOptions} label={data.interested}></Select>
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
                const { name, attribs } = domNode;
                if (name === "snt-link") {
                  return (
                    <FooterLink
                      href={attribs.href}
                      title={" Privacy Notice"}
                    ></FooterLink>
                  );
                }
              },
            })}
          </span>
        </div>
        <CTA
          type="primary"
          fullWidth={isMobile}
          onClick={() => console.log("submit")}
        >
          {data.submitButton}
        </CTA>
      </form>
    </div>
  );
}

export default SignUpModalContent;
