const resizeEvent = (fn: () => void): (() => void) => {
  const handleResize = () => {
    fn();
  };

  window.addEventListener('resize', handleResize);

  return () => {
    window.removeEventListener('resize', handleResize);
  };
};

export default resizeEvent;
