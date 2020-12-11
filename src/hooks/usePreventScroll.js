import { useEffect } from 'react';

const usePreventScroll = () => {
  useEffect(() => {
    document.body.style.cssText = 'height: 100vh; overflow: hidden;';

    return () => {
      document.body.style.cssText = '';
    };
  }, []);
};

export default usePreventScroll;
