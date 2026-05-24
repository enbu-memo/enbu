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
  const handleToggle = (e: React.MouseEvent) => {
    if (isMobile) {
      e.preventDefault();
      onToggle();
    }
  };

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

const dropdowns = [
  {
    title: '武将評価',
    items: [
      { label: '天将カード', to: '/ReviewTensho' },
      { label: '神将カード', to: '/ReviewShinsho' },
      { label: '覇王カード', to: '/ReviewHaou' },
    ],
  },
  {
    title: '大将評価',
    items: [
      { label: 'レイド', to: '/ReviewRaid' },
      { label: '合戦',  to: '/ReviewKassen' },
    ],
  },
  {
    title: 'SGの使い道',
    items: [
      { label: '無償SG', to: '/SgFree' },
    ],
  },
  {
    title: '公開データ',
    items: [
      { label: '奥義',   to: '/DataOugi' },
      { label: 'スキル', to: '/DataSkill' },
      { label: 'その他', to: '/DataOther' },
    ],
  },
  {
    title: 'レイド',
    items: [
      { label: 'レイドのすゝめ', to: '/DeckRaid' },
      { label: '討伐デッキ統計', to: '/RaidStatistics' },
    ],
  },
];

const NavMenu: React.FC<NavMenuProps> = ({ menuOpen, onClose }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { pathname } = useLocation();

  // 開いているドロップダウン
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // アクティブなメニュー
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  // 手動選択フラグ
  const [isManual, setIsManual] = useState(false);

  // ページ遷移時の自動セット
  React.useEffect(() => {
    if (!isManual) {
      if (pathname === "/") {
        setActiveIndex(null);
        setOpenIndex(null);
        return;
      }
      const idx = dropdowns.findIndex(d => d.items.some(item => item.to === pathname));
      setActiveIndex(idx !== -1 ? idx : null);
      // スマホ時はサブメニューも開く
      if (typeof window !== 'undefined' && window.innerWidth <= 768 && idx !== -1) {
        setOpenIndex(idx);
      } else {
        setOpenIndex(null);
      }
    }
    // ページ遷移時は手動選択解除
    setIsManual(false);
  }, [pathname]);

  // メニュークリック時は手動選択を優先
  const handleToggle = (idx: number) => {
    setActiveIndex(idx);
    setOpenIndex(prev => (prev === idx ? null : idx));
    setIsManual(true);
  };

  const handleClose = () => {
    setOpenIndex(null);
    setActiveIndex(null);
    setIsManual(false);
    onClose();
  };

  return (
    <ul className={menuOpen ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
      {dropdowns.map((d, idx) => {
        const isActive = activeIndex === idx;
        return (
          <li key={d.title}>
            <DropdownMenu
              title={d.title}
              items={d.items}
              isMobile={isMobile}
              isOpen={openIndex === idx}
              isActive={isActive}
              onToggle={() => handleToggle(idx)}
              onClose={handleClose}
            />
          </li>
        );
      })}
      <li>
        <Link
          to="/SkillRoot"
          className={pathname === '/SkillRoot' ? styles.active : ''}
          onClick={handleClose}
        >
          スキル玉合成ルート
        </Link>
      </li>
      <li>
        <Link
          to="/SerialCode"
          className={pathname === '/SerialCode' ? styles.active : ''}
          onClick={handleClose}
        >
          シリアルコード
        </Link>
      </li>
    </ul>
  );
};

export default NavMenu;
