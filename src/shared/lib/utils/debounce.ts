import { useState, useEffect, useRef } from 'react';
import debounce from 'lodash/debounce';

interface DebounceOptions {
  leading?: boolean;
  maxWait?: number;
  trailing?: boolean;
}

export function useDebounced<T>(func: (value: T) => void, initialValue: T, delay: number = 500, options: DebounceOptions = { leading: false, trailing: false }) {
  const [value, setValue] = useState<T>(initialValue);

  const debouncedSetter = useRef(
    debounce((val: T) => {
      func(val)
    }, delay, options)
  ).current;

  const setValueDebounced = (val: T) => {
    setValue(val);
    debouncedSetter(val);
  };

  useEffect(() => {
    return () => {
      debouncedSetter.cancel();
    };
  }, [debouncedSetter]);

  return [value, setValueDebounced] as const;
}
