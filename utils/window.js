export const hasWindow = typeof window !== "undefined";

export const getWindow = hasWindow
  ? () => window
  : () => {
      throw new Error("Cannot get window on server side");
    };
