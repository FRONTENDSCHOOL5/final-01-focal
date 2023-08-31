import { useEffect, useRef } from 'react';

export default function useHandleResizeHeight(inputValue) {
  const ref = useRef();
  const handleResizeHeight = () => {
    ref.current.style.height = 'auto';
    ref.current.style.height = ref.current.scrollHeight + 'px';
  };

  useEffect(() => {
    if (inputValue.content) {
      handleResizeHeight();
    }
  }, [inputValue]);

  return { ref, handleResizeHeight };
}
