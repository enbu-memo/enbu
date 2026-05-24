import React, { useState } from 'react';
import NavMenu from './NavMenu';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleToggle = () => setMenuOpen(open => !open);
  const handleClose = () => setMenuOpen(false);

  return (
    <header>
      <h1><Link to="/" className={styles.nolink}>戦国炎舞の備忘録</Link></h1>
      <nav>
        <div
          className={styles.mobileMenuToggle}
          onClick={handleToggle}
          aria-label="メニューを開く"
          role="button"
          tabIndex={0}
          onKeyPress={e => { if (e.key === 'Enter' || e.key === ' ') handleToggle(); }}
        >
          ☰
        </div>
        <NavMenu menuOpen={menuOpen} onClose={handleClose} />
      </nav>
    </header>
  );
};

export default Header;
