import React, { useCallback, useState } from "react";
import { debounce } from "../utils";

export const useDebounce = (obj = null, wait = 500) => {
  const [state, setState] = useState(obj);

  const setDebouncedState = (_val) => {
    debounceFunc(_val);
  };

  const debounceFunc = useCallback(
    debounce((_prop) => {
      setState(_prop);
    }, wait),
    []
  );

  return [state, setDebouncedState];
};
