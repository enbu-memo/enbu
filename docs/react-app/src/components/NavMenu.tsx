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
      { label: '天将カード', to: '/reviewtensho.tsx' },
      { label: '神将カード', to: '/reviewshinsho.tsx' },
      { label: '覇王カード', to: '/reviewhaou.tsx' },
    ],
  },
  {
    title: '大将評価',
    items: [
      { label: 'レイド', to: '/reviewraid.tsx' },
      { label: '合戦',  to: '/reviewkassen.tsx' },
    ],
  },
  {
    title: 'SGの使い道',
    items: [
      { label: '無償SG', to: '/sgfree.tsx' },
    ],
  },
  {
    title: '公開データ',
    items: [
      { label: '奥義',   to: '/dataougi.tsx' },
      { label: 'スキル', to: '/dataskill.tsx' },
      { label: 'その他', to: '/dataother.tsx' },
    ],
  },
  {
    title: 'レイド',
    items: [
      { label: 'レイドのすゝめ', to: '/tipsraid.tsx' },
      { label: '討伐デッキ統計', to: '/raidstatistics.tsx' },
    ],
  },
];

const NavMenu: React.FC<NavMenuProps> = ({ menuOpen, onClose }) => {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { pathname } = useLocation();

  // アクティブなパスを一元管理
  const [activePath, setActivePath] = useState<string | null>(null);
  // 開いているドロップダウンのインデックス
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // 手動選択フラグ
  const [isManual, setIsManual] = useState(false);

  // ページ遷移時の自動セット
  React.useEffect(() => {
    if (!isManual) {
      setActivePath(pathname === '/' ? null : pathname);

      // スマホ時はドロップダウンも自動で開く
      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        const idx = dropdowns.findIndex(d => d.items.some(item => item.to === pathname));
        setOpenIndex(idx !== -1 ? idx : null);
      } else {
        setOpenIndex(null);
      }
    }
    setIsManual(false);
  }, [pathname]);

  // メニュー選択時（パスをセットし、他は自動でリセットされる）
  const handleSelect = (path: string) => {
    setActivePath(path);
    setIsManual(true);
  };

  // ドロップダウンのトグル
  const handleToggle = (idx: number, firstItemPath: string) => {
    handleSelect(firstItemPath);
    setOpenIndex(prev => (prev === idx ? null : idx));
  };

  const handleClose = () => {
    setOpenIndex(null);
    setActivePath(null);
    setIsManual(false);
    onClose();
  };

  return (
    <ul className={menuOpen ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
      {dropdowns.map((d, idx) => {
        // ドロップダウン内のいずれかのパスがactivePathと一致すればアクティブ
        const isActive = d.items.some(item => item.to === activePath);
        return (
          <li key={d.title}>
            <DropdownMenu
              title={d.title}
              items={d.items}
              isMobile={isMobile}
              isOpen={openIndex === idx}
              isActive={isActive}
              onToggle={() => handleToggle(idx, d.items[0].to)}
              onClose={handleClose}
            />
          </li>
        );
      })}
      <li>
        <Link
          to="/skillroot.tsx"
          className={activePath === '/skillroot.tsx' ? styles.active : ''}
          onClick={() => handleSelect('/skillroot.tsx')}
        >
          スキル玉合成ルート
        </Link>
      </li>
      <li>
        <Link
          to="/serialcode.tsx"
          className={activePath === '/serialcode.tsx' ? styles.active : ''}
          onClick={() => handleSelect('/serialcode.tsx')}
        >
          シリアルコード
        </Link>
      </li>
    </ul>
  );
};

export default NavMenu;