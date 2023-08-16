import { useEffect, useRef, useState } from 'react';

export function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState('');
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [value, delay]);

  return debouncedValue;
}

// https://www.telerik.com/blogs/how-to-create-custom-debounce-hook-react
