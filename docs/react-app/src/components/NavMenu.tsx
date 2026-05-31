import React, { useState } from 'react';
import styles from './Header.module.css';
import { Link, useLocation } from 'react-router-dom';

type NavMenuProps = {
  menuOpen: boolean;
  onClose: () => void;
};

type DropdownItem = {
  label: string;
  to: string;
};

type DropdownMenuProps = {
  title: string;
  items: DropdownItem[];
  isMobile: boolean;
  isOpen: boolean;
  isActive: boolean;
  onToggle: () => void;
  onClose: () => void;
};

const DropdownMenu: React.FC<DropdownMenuProps> = ({ title, items, isMobile, isOpen, isActive, onToggle, onClose }) => {
  const isSingle = items.length === 1;

  const handleToggle = (e: React.MouseEvent) => {
    if (isMobile && !isSingle) {
      e.preventDefault();
      onToggle();
    }
  };

  if (isSingle) {
    return (
      <Link
        to={items[0].to}
        className={isActive ? styles.active : ''}
        onClick={onClose}
      >
        {title}
      </Link>
    );
  }

  return (
    <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
      <span
        className={`${styles.dropbtn} ${isActive || isOpen ? styles.active : ''}`}
        onClick={handleToggle}
      >
        {title}
      </span>
      <div className={styles.dropdownContent}>
        {items.map(item => (
          <Link key={item.to} to={item.to} onClick={onClose}>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

const menus = [
  {
    title: '武将評価',
    items: [
      { label: '天将カード', to: '/reviewtensho' },
      { label: '神将カード', to: '/reviewshinsho' },
      { label: '覇王カード', to: '/reviewhaou' },
    ],
  },
  {
    title: '大将評価',
    items: [
      { label: 'レイド', to: '/reviewraid' },
      { label: '合戦',  to: '/reviewkassen' },
    ],
  },
  {
    title: 'SGの使い道',
    items: [
      { label: '無償SG', to: '/sgfree' },
    ],
  },
  {
    title: '公開データ',
    items: [
      { label: '奥義',   to: '/dataougi' },
      { label: 'スキル', to: '/dataskill' },
      { label: 'その他', to: '/dataother' },
    ],
  },
  {
    title: 'レイド',
    items: [
      { label: 'レイドのすゝめ', to: '/tipsraid' },
      { label: '討伐デッキ統計', to: '/raidstatistics' },
    ],
  },
  {
    title: 'スキル玉合成ルート',
    items: [
      { label: 'スキル玉合成ルート', to: '/skillroot' },
    ],
  },
  {
    title: 'シリアルコード',
    items: [
      { label: 'シリアルコード', to: '/serialcode' },
    ],
  },
];

const NavMenu: React.FC<NavMenuProps> = ({ menuOpen, onClose }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { pathname } = useLocation();

  const [activePath, setActivePath] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [isManual, setIsManual] = useState(false);

  React.useEffect(() => {
    if (!isManual) {
      setActivePath(pathname === '/' ? null : pathname);

      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        const idx = menus.findIndex(m => m.items.some(item => item.to === pathname));
        setOpenIndex(idx !== -1 ? idx : null);
      } else {
        setOpenIndex(null);
      }
    }
    setIsManual(false);
  }, [pathname]);

  const handleToggle = (idx: number) => {
    // openIndexのトグルのみ行い、activePathは現在のpathnameを常に維持する
    setActivePath(pathname === '/' ? null : pathname);
    setOpenIndex(prev => (prev === idx ? null : idx));
    setIsManual(true);
  };

  const handleClose = () => {
    setOpenIndex(null);
    // activePathはリセットしない（pathnameベースのuseEffectに任せる）
    setIsManual(false);
    onClose();
  };

  return (
    <ul className={menuOpen ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
      {menus.map((m, idx) => {
        const isActive = m.items.some(item => item.to === activePath);
        return (
          <li key={m.title}>
            <DropdownMenu
              title={m.title}
              items={m.items}
              isMobile={isMobile}
              isOpen={openIndex === idx}
              isActive={isActive}
              onToggle={() => handleToggle(idx)}
              onClose={handleClose}
            />
          </li>
        );
      })}
    </ul>
  );
};

export default NavMenu;