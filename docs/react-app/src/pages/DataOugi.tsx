import React from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';

const imgStyle: React.CSSProperties = { maxWidth: '100%', height: 'auto' };

const DataOugi: React.FC = () => {
  return (
    <div className="container">
      <LastUpdated route="/DataOugi.tsx" />
      <PageMeta title="公開データ【奥義】" />
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="公開データ【奥義】" />
          <meta name="twitter:image" content="https://enbu-kouryaku.com/img/data/DA001.png" />
        </Helmet>
      <main>
        <h2>公開データ【奥義】</h2>
        <nav className="toc">
          <h3>目次</h3>
          <ul>
            <li><a href="#da001-004">絆奥義 倍率</a></li>
            <li><a href="#da005-008-010">通常奥義 ダメージ倍率</a></li>
            <li><a href="#da006-007">通常奥義 能力増減効果倍率</a></li>
            <li><a href="#da011">奥義の補助発動率上昇効果</a></li>
          </ul>
        </nav>

        <section>
          <hr className="section-divider" />
          <h3 id="da001-004" className="section-title">絆奥義 倍率</h3>
          {['DA001', 'DA002', 'DA003', 'DA004', 'DA012'].map(id => (
            <img key={id} src={`/img/data/${id}.png`} alt={`奥義画像 ${id}`} className="center-image" style={imgStyle} />
          ))}
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>

        <section>
          <hr className="section-divider" />
          <h3 id="da005-008-010" className="section-title">通常奥義 ダメージ倍率</h3>
          {['DA005', 'DA008', 'DA009', 'DA010'].map(id => (
            <img key={id} src={`/img/data/${id}.png`} alt={`奥義画像 ${id}`} className="center-image" style={imgStyle} />
          ))}
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>

        <section>
          <hr className="section-divider" />
          <h3 id="da006-007" className="section-title">通常奥義 能力増減効果倍率</h3>
          {['DA006', 'DA007'].map(id => (
            <img key={id} src={`/img/data/${id}.png`} alt={`奥義画像 ${id}`} className="center-image" style={imgStyle} />
          ))}
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>

        <section>
          <hr className="section-divider" />
          <h3 id="da011" className="section-title">奥義の補助発動率上昇効果</h3>
          <img src="/img/data/DA011.png" alt="奥義画像 DA011" className="center-image" style={imgStyle} />
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>
      </main>
    </div>
  );
};

export default DataOugi;
