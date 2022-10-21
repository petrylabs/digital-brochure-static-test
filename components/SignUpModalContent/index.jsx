/* eslint-disable @next/next/no-img-element */
import React, { useContext, useRef } from "react";
import parse from "html-react-parser";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";

import { breakpoints } from "../../config";
import styles from "./SignUpModalContent.module.scss";
import signUpModalData from "../../site-data/signUpModal.preval";
import formErrorData from "../../site-data/formErrors.preval";
import recaptchaSiteKeyData from "../../site-data/recaptchaSiteKey.preval";
import useWindowWidth from "../../hooks/useWindowWidth";
import CTA from "../CTA";
import Select from "../Select";
import { getDelimitedOptions } from "../../utils/array";
import { getDeviceType, removeStorage, signUpSubmission } from "../../utils";
import AnimatedLink from "../AnimatedLink";
import ModalContext from "../../context/modal";
import { newsLetterFormKey } from "../../config";
import LanguageContext from "../../context/language";

/**
 * SignUpModalContent
 * The body of the "Sign up" modal (displayed inside a `Modal`)
 */
function SignUpModalContent() {
  const {
    setIsSignUpSuccessModalOpen,
    setIsSignUpErrorModalOpen,
    setIsSignUpModalOpen,
  } = useContext(ModalContext);
  const { lang } = useContext(LanguageContext);
  const fieldsData = signUpModalData[lang]?.data?.newsletterForm?.fields;
  const formErrors = formErrorData[lang]?.data?.contentlets;

  const { errorEmail, errorEmptyValue, errorRecaptchaVerification } =
    getErrorMessages(formErrors);

  const googleRecaptchaKey = recaptchaSiteKeyData?.data?.googleRecaptchaKey;
  const recaptchaRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
    setValue,
    reset,
    control,
  } = useForm({
    reValidateMode: "onSubmit",
  });

  const screenWidth = useWindowWidth();
  const isMobile = screenWidth < breakpoints.sm;

  const data = fieldsData.reduce((acc, obj) => {
    const key = obj["key"];
    const value = obj["value"];
    acc[key] = value;
    return acc;
  }, {});

  const interestedOptions = getDelimitedOptions(data.interestedList, "\n");

  /* TODO: handle submission */
  const onSubmit = async (data) => {
    const formData = {
      gRecaptchaResponse: recaptchaRef.current.getValue(),
      firstName: data.firstName,
      lastName: data.lastName,
      emailAddress: data.email,
      languageCode: window.navigator.language == "en-us" ? "en_CA" : "fr_CA",
      hasOptedOutOfEmail: "false",
      interestedIn: data.interestedIn,
      leadSource: "Marketing Sign-Up",
      deviceType: getDeviceType(),
      operatingSystem: window.navigator.platform,
    };
    const { data: response, error } = await signUpSubmission(formData);
    if (
      response.sfResponse &&
      response.sfResponse.response &&
      response.sfResponse.response.toLowerCase().includes("success")
    ) {
      removeStorage(newsLetterFormKey);
      setIsSignUpModalOpen(false);
      setIsSignUpSuccessModalOpen(true);
    } else {
      setIsSignUpModalOpen(false);
      setIsSignUpErrorModalOpen(true);
    }
  };

  useFormPersist(newsLetterFormKey, {
    watch,
    setValue,
    storage: window.localStorage,
  });

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{data?.title}</h2>
      <form className={styles.signUpForm}>
        <div className={styles.row}>
          <label htmlFor="first-name">{data?.firstName}</label>
          <input
            type="text"
            id="first-name"
            name="firstName"
            className={styles.formControl}
            aria-required="true"
            minLength={2}
            maxLength={30}
            {...register("firstName", { required: true, maxLength: 20 })}
          ></input>
          {errors.firstName && (
            <div>
              {
                <span className={styles.errorText}>
                  {errorEmptyValue.value}
                </span>
              }
            </div>
          )}
        </div>
        <div className={styles.row}>
          <label htmlFor="last-name">{data?.lastName}</label>
          <input
            name="lastName"
            aria-required="true"
            minLength={1}
            maxLength={30}
            type="text"
            className={styles.formControl}
            id="last-name"
            {...register("lastName", { required: true })}
          ></input>
          {errors?.lastName && (
            <div>
              {
                <span className={styles.errorText}>
                  {errorEmptyValue.value}
                </span>
              }
            </div>
          )}
        </div>
        <div className={styles.row}>
          <label htmlFor="email-address">{data?.email}</label>
          <input
            name="email"
            aria-required="true"
            type="email"
            className={styles.formControl}
            id="email-address"
            {...register("email", {
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
          ></input>
          {errors && (
            <div>
              {errors?.email?.type == "required" && (
                <span className={styles.errorText}>
                  {errorEmptyValue.value}
                </span>
              )}
              {errors?.email?.type == "pattern" && (
                <span className={styles.errorText}>{errorEmail.value}</span>
              )}
            </div>
          )}
        </div>
        <div className={styles.row}>
          <Select
            options={interestedOptions}
            label={data?.interested}
            methods={{ control }}
            {...register("interestedIn")}
          ></Select>
        </div>
        <div className={styles.row}>
          <span>{data?.recaptchaText}</span>
        </div>
        <div className={styles.row}>
          <ReCAPTCHA ref={recaptchaRef} sitekey={googleRecaptchaKey} />
          <div>
            {isSubmitted && !recaptchaRef?.current?.getValue() && (
              <span className={styles.errorText}>
                {errorRecaptchaVerification.value}
              </span>
            )}
          </div>
        </div>
        <div className={styles.row}>
          <span>
            {parse(data?.privacy || "", {
              replace: (domNode) => {
                const { name, attribs, children } = domNode;
                if (name === "snt-link") {
                  return (
                    <AnimatedLink
                      href={attribs.href}
                      title={children[0]?.data || ""}
                      linkText={children[0]?.data || ""}
                      target="_blank"
                    />
                  );
                }
              },
            })}
          </span>
        </div>
        <CTA
          type="primary"
          fullWidth={isMobile}
          onClick={handleSubmit(onSubmit)}
        >
          {data?.submitButton}
        </CTA>
      </form>
    </div>
  );
}

export default SignUpModalContent;

const getErrorMessages = (formErrorData) => {
  return formErrorData.reduce((acc, error) => {
    let { key } = error;
    return { ...acc, [key]: [...(acc[key] || []), error][0] };
  }, {});
};
