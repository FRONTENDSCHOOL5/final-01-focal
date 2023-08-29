import { useState, useEffect } from 'react';
import throttle from 'lodash/throttle';

export default function useScrollBottom(ref) {
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const element = ref.current;

    const handleScroll = throttle(() => {
      if (element) {
        const { scrollTop, clientHeight, scrollHeight } = element;
        setIsBottom(scrollTop + clientHeight >= scrollHeight);
      }
    }, 500);

    element.addEventListener('scroll', handleScroll);

    return () => {
      element.removeEventListener('scroll', handleScroll);
    };
  }, [ref]);

  return isBottom;
}
