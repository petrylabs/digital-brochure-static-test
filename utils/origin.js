export const getOrigin = () => {
  if (
    !window ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    return process.env.DOTCMS_HOST;
  } else {
    return `${window.location.origin}/api`;
  }
};
