import { useState, useEffect, useRef, useCallback } from 'react';
import debounce from 'lodash/debounce';

export function useDebounced<T>(func: (value: T) => void, initialValue: T, delay: number = 500) {
  const [value, setValue] = useState<T>(initialValue);

  const debouncedSetter = useRef(
    debounce((val: T) => {
      func(val)
    }, delay)
  ).current;

  const setValueDebounced = useCallback((val: T) => {
    setValue(val);
    debouncedSetter(val);
  }, [debouncedSetter, setValue]);

  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  return [value, setValueDebounced] as const;
}
