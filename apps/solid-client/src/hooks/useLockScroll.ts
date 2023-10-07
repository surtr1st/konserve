export function useLockScroll() {
  const lock = () => {
    document.documentElement.style.overflow = 'hidden';
  };

  const release = () => {
    document.documentElement.style.overflow = '';
  };

  return { lock, release };
}
