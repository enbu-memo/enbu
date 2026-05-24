import React, { useEffect } from 'react';

const BackToTopButton: React.FC = () => {
  useEffect(() => {
    const scrollHandler = () => {
      const btn = document.getElementById('backToTop');
      if (!btn) return;
      if (window.scrollY > 200) {
        btn.style.display = 'block';
      } else {
        btn.style.display = 'none';
      }
    };
    const clickHandler = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('scroll', scrollHandler);
    const btn = document.getElementById('backToTop');
    if (btn) btn.addEventListener('click', clickHandler);
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (btn) btn.removeEventListener('click', clickHandler);
    };
  }, []);

  return (
    <button id="backToTop" title="一番上に戻る" style={{display: 'none'}}>
      ↑
    </button>
  );
};

export default BackToTopButton;
