
import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

type NavMenuProps = {
  menuOpen: boolean;
};

const NavMenu: React.FC<NavMenuProps> = ({ menuOpen }) => (
  <ul className={menuOpen ? `${styles.navMenu} ${styles.active}` : styles.navMenu}>
    <li>
      <div className={styles.dropdown}>
        <span className={styles.dropbtn}>武将評価</span>
        <div className={styles.dropdownContent}>
          <Link to="/ReviewTensho">天将カード</Link>
          <Link to="/ReviewShinsho">神将カード</Link>
          <Link to="/ReviewHaou">覇王カード</Link>
        </div>
      </div>
    </li>
    <li>
      <div className={styles.dropdown}>
        <span className={styles.dropbtn}>大将評価</span>
        <div className={styles.dropdownContent}>
          <Link to="/ReviewRaid">レイド</Link>
          <Link to="/ReviewKassen">合戦</Link>
        </div>
      </div>
    </li>
    <li>
      <div className={styles.dropdown}>
        <span className={styles.dropbtn}>SGの使い道</span>
        <div className={styles.dropdownContent}>
          <Link to="/SgFree">無償SG</Link>
        </div>
      </div>
    </li>
    <li>
      <div className={styles.dropdown}>
        <span className={styles.dropbtn}>公開データ</span>
        <div className={styles.dropdownContent}>
          <Link to="/DataOugi">奥義</Link>
          <Link to="/DataSkill">スキル</Link>
          <Link to="/DataOther">その他</Link>
        </div>
      </div>
    </li>
    <li>
      <div className={styles.dropdown}>
        <span className={styles.dropbtn}>レイド</span>
        <div className={styles.dropdownContent}>
          <Link to="/DeckRaid">レイドのすゝめ</Link>
          <Link to="/RaidStatistics">討伐デッキ統計</Link>
        </div>
      </div>
    </li>
    <li><Link to="/SkillRoot">スキル玉合成ルート</Link></li>
    <li><Link to="/SerialCode">シリアルコード</Link></li>
  </ul>
);

export default NavMenu;
