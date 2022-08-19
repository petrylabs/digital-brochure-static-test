export const getCookie = (name) => {
  if (typeof window !== "undefined") {
    const value = `; ${window.document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : "9";
  } else {
    return "";
  }
};
