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
  // サブメニューが1つだけの場合はそのままLinkとして振る舞う（サブメニュー非表示）
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

// すべてのメニューを統一構造で定義
const menus = [
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
  // シンプルリンクもサブメニュー1件のドロップダウンとして統一
  {
    title: 'スキル玉合成ルート',
    items: [
      { label: 'スキル玉合成ルート', to: '/skillroot.tsx' },
    ],
  },
  {
    title: 'シリアルコード',
    items: [
      { label: 'シリアルコード', to: '/serialcode.tsx' },
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

      if (typeof window !== 'undefined' && window.innerWidth <= 768) {
        const idx = menus.findIndex(m => m.items.some(item => item.to === pathname));
        setOpenIndex(idx !== -1 ? idx : null);
      } else {
        setOpenIndex(null);
      }
    }
    setIsManual(false);
  }, [pathname]);

  // メニュー選択・トグル
  const handleToggle = (idx: number) => {
    setActivePath(menus[idx].items[0].to);
    setOpenIndex(prev => (prev === idx ? null : idx));
    setIsManual(true);
  };

  const handleClose = () => {
    setOpenIndex(null);
    setActivePath(null);
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