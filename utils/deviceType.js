export const getDeviceType = () => {
  const ua = navigator.userAgent;
  const tabletRegex = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i;
  const mobRegex =
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/;

  if (tabletRegex.test(ua)) return "Tablet";
  if (mobRegex.test(ua)) return "Mobile";
  return "Desktop";
};
