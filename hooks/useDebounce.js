import React, { useCallback, useState } from "react";
import { debounce } from "../utils";

export const useDebounce = (obj = null, wait = 1000) => {
  const [state, setState] = useState(obj);

  const setDebouncedState = (_val) => {
    debounceFunc(_val);
  };

  const debounceFunc = useCallback(
    debounce((_prop) => {
      console.log("updating search");
      setState(_prop);
    }, wait),
    []
  );

  return [state, setDebouncedState];
};
