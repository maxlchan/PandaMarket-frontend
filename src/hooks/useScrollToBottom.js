import { useEffect, useRef } from 'react';

const scrollConfig = { behavior: 'smooth' };

const useScrollToBottom = (dependency) => {
  const ref = useRef();

  const scrollToBottom = () => {
    ref.current.scrollIntoView(scrollConfig);
  };

  useEffect(() => {
    scrollToBottom();
  }, [dependency]);

  return ref;
};

export default useScrollToBottom;
