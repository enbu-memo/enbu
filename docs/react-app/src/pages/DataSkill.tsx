import React, { useState } from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';

const imgStyle: React.CSSProperties = { maxWidth: '100%', height: 'auto' };

// 画像セクション共通コンポーネント
const ImgSection: React.FC<{ id: string; title: string; images: string[] }> = ({ id, title, images }) => (
  <section>
    <h4 id={id}>{title}</h4>
    {images.map(img => (
      <img key={img} src={`/img/data/${img}.png`} alt={`スキル画像 ${img}`} className="center-image" style={imgStyle} />
    ))}
  </section>
);

// アコーディオン目次
const TocGroup: React.FC<{ label: string; href: string; items: { href: string; label: string }[] }> = ({ label, href, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <li className="has-sub">
      <a
        href={href}
        className="main-toc"
        onClick={e => { e.preventDefault(); setOpen(o => !o); }}
      >
        {label}&nbsp;{open ? '▲' : '▼'}
      </a>
      {open && (
        <ul className="sub-toc">
          {items.map(item => (
            <li key={item.href}><a href={item.href}>{item.label}</a></li>
          ))}
        </ul>
      )}
    </li>
  );
};

const DataSkill: React.FC = () => {
  return (
    <div className="container">
      <LastUpdated route="/DataSkill.tsx" />
      <PageMeta title="公開データ【スキル】" />
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="公開データ【スキル】" />
          <meta name="twitter:image" content="https://enbu-kouryaku.com/img/data/DB009.png" />
        </Helmet>
      <main>
        <h2>公開データ【スキル】</h2>

        <nav className="toc">
          <h3>目次</h3>
          <ul>
            <TocGroup
              label="補助スキル"
              href="#skill-group1"
              items={[
                { href: '#hatudoushu',  label: '発動種類数補助の効果倍率' },
                { href: '#bokutotsu',   label: '木訥利刀の効果' },
                { href: '#gesshoku',    label: '月蝕陽餐の効果' },
                { href: '#yumouhojo',   label: '勇猛系補助の効果倍率' },
                { href: '#kaisuhojo',   label: '回数系補助の効果倍率' },
                { href: '#tekichuhojo', label: '敵中系補助の効果倍率' },
                { href: '#jutaihojo',   label: '受退系補助の効果倍率' },
                { href: '#damekeigen',  label: 'ダメージ軽減補助の効果倍率' },
                { href: '#dameup',      label: 'ダメージ応援効果上昇補助の効果倍率' },
                { href: '#tamamo',      label: '玉藻前の効果倍率' },
                { href: '#ouenkaifuku',label: '応援回復効果上昇補助の効果倍率' },
                { href: '#kienhei',     label: '騎焔兵の効果倍率' },
                { href: '#statusup',    label: 'ステータスアップ系補助の効果' },
                { href: '#tekichu',     label: '敵中勇猛系補助の効果倍率' },
                { href: '#hikin',       label: '飛禽系補助の効果倍率' },
                { href: '#omihata',     label: '大御旗の効果倍率' },
                { href: '#kinme',       label: '狼の金眼の発動確率' },
                { href: '#onko',        label: '温故系補助の対象と恩恵' },
                { href: '#genkaikei',   label: '能力減少軽減補助の効果倍率' },
                { href: '#jouji',       label: '常時発動する補助の効果倍率' },
                { href: '#hoshu',       label: '宝珠の効果倍率' },
              ]}
            />
            <TocGroup
              label="その他"
              href="#skill-group2"
              items={[
                { href: '#ouen',      label: '応援回数に応じたスキルの効果倍率' },
                { href: '#jutai',     label: '受退回数に応じたスキルの効果倍率' },
                { href: '#yotai',     label: '与退回数に応じたスキルの効果倍率' },
                { href: '#command',   label: 'コマンド回数に応じたスキルの効果倍率' },
                { href: '#tenha',     label: '天破嵐華回数に応じたスキルの効果倍率' },
                { href: '#kaifuku',   label: '回復スキルの効果倍率' },
                { href: '#genkaskill',label: '能力減少スキルの効果倍率' },
                { href: '#senpyo',    label: '千瓢光の効果倍率' },
                { href: '#shingi',    label: '真技レベル上昇による効果倍率' },
              ]}
            />
          </ul>
        </nav>

        {/* 補助スキル */}
        <section>
          <hr className="section-divider" />
          <h3 id="skill-group1">補助スキル</h3>
          <ImgSection id="hatudoushu"  title="発動種類数補助の効果倍率"         images={['DB045']} />
          <ImgSection id="bokutotsu"   title="木訥利刀の効果"                   images={['DB038']} />
          <ImgSection id="gesshoku"    title="月蝕陽餐の効果"                   images={['DB037']} />
          <ImgSection id="yumouhojo"   title="勇猛系補助の効果倍率"             images={['DB034']} />
          <ImgSection id="kaisuhojo"   title="回数系補助の効果倍率"             images={['DB033']} />
          <ImgSection id="tekichuhojo" title="敵中系補助の効果倍率"             images={['DB031']} />
          <ImgSection id="jutaihojo"   title="受退系補助の効果倍率"             images={['DB029']} />
          <ImgSection id="damekeigen"  title="ダメージ軽減補助の効果倍率"       images={['DB028']} />
          <ImgSection id="dameup"      title="ダメージ応援効果上昇補助の効果倍率" images={['DB027']} />
          <ImgSection id="tamamo"      title="玉藻前の効果倍率"                 images={['DB025']} />
          <ImgSection id="ouenkaifuku" title="応援回復効果上昇補助の効果倍率"   images={['DB024']} />
          <ImgSection id="kienhei"     title="騎焔兵の効果倍率"                 images={['DB016']} />
          <ImgSection id="statusup"    title="ステータスアップ系補助の効果"     images={['DB041']} />
          <ImgSection id="tekichu"     title="敵中勇猛系補助の効果倍率"         images={['DB013', 'DB014']} />
          <ImgSection id="hikin"       title="飛禽系補助の効果倍率"             images={['DB010', 'DB011', 'DB012', 'DB032']} />
          <ImgSection id="omihata"     title="大御旗の効果倍率"                 images={['DB001']} />
          <ImgSection id="kinme"       title="狼の金眼の発動確率"               images={['DB002']} />
          <ImgSection id="onko"        title="温故系補助の対象と恩恵"           images={['DB003', 'DB004', 'DB035']} />
          <ImgSection id="genkaikei"   title="能力減少軽減補助の効果倍率"       images={['DB005']} />
          <ImgSection id="jouji"       title="常時発動する補助の効果倍率"       images={['DB006', 'DB007', 'DB008', 'DB030']} />
          <ImgSection id="hoshu"       title="宝珠の効果倍率"                   images={['DB009']} />
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>

        {/* その他 */}
        <section>
          <hr className="section-divider" />
          <h3 id="skill-group2">その他</h3>
          <ImgSection id="ouen"       title="応援回数に応じたスキルの効果倍率"     images={['DB017', 'DB018']} />
          <ImgSection id="jutai"      title="受退回数に応じたスキルの効果倍率"     images={['DB022', 'DB040']} />
          <ImgSection id="yotai"      title="与退回数に応じたスキルの効果倍率"     images={['DB026', 'DB039']} />
          <ImgSection id="command"    title="コマンド回数に応じたスキルの効果倍率" images={['DB021']} />
          <ImgSection id="tenha"      title="天破嵐華回数に応じたスキルの効果倍率" images={['DB019', 'DB020']} />
          <ImgSection id="kaifuku"    title="回復スキルの効果倍率"               images={['DB023', 'DB042']} />
          <ImgSection id="genkaskill" title="能力減少スキルの効果倍率"           images={['DB043']} />
          <ImgSection id="senpyo"     title="千瓢光の効果倍率"                   images={['DB036']} />
          <ImgSection id="shingi"     title="真技レベル上昇による効果倍率"       images={['DB044']} />
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>
      </main>
    </div>
  );
};

export default DataSkill;
