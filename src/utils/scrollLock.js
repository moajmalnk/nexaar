let lockCount = 0;
let savedScrollY = 0;
let savedBodyStyles = null;

export const lockPageScroll = () => {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return () => {};
  }

  lockCount += 1;

  if (lockCount === 1) {
    const { body, documentElement } = document;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    savedScrollY = window.scrollY || documentElement.scrollTop || 0;
    savedBodyStyles = {
      overflow: body.style.overflow,
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      paddingRight: body.style.paddingRight,
    };

    window.lenis?.stop?.();

    body.style.overflow = 'hidden';
    body.style.position = 'fixed';
    body.style.top = `-${savedScrollY}px`;
    body.style.width = '100%';
    body.classList.add('body-lock');

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  let released = false;

  return () => {
    if (released) return;
    released = true;

    lockCount = Math.max(0, lockCount - 1);
    if (lockCount > 0 || !savedBodyStyles) return;

    const { body } = document;
    const lenis = window.lenis;

    body.style.overflow = savedBodyStyles.overflow;
    body.style.position = savedBodyStyles.position;
    body.style.top = savedBodyStyles.top;
    body.style.width = savedBodyStyles.width;
    body.style.paddingRight = savedBodyStyles.paddingRight;

    window.scrollTo(0, savedScrollY);
    lenis?.resize?.();
    lenis?.scrollTo?.(savedScrollY, { immediate: true, force: true });

    body.classList.remove('body-lock');
    requestAnimationFrame(() => {
      lenis?.start?.();
    });

    savedBodyStyles = null;
  };
};
