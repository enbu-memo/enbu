import React from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';

const DataOther: React.FC = () => {
  return (
    <div className="container">
      <LastUpdated route="/DataOther.tsx" />
      <PageMeta title="公開データ【その他】" />
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="公開データ【その他】" />
          <meta name="twitter:image" content="https://enbu-kouryaku.com/img/data/DC001.png" />
        </Helmet>
      <main>
        <h2>公開データ【その他】</h2>
        <nav className="toc">
          <h3>目次</h3>
          <ul>
            <li><a href="#combo">コンボ連舞数によるダメージ倍率</a></li>
          </ul>
        </nav>
        <section>
          <hr className="section-divider" />
          <h3 id="combo" className="section-title">コンボ連舞数によるダメージ倍率</h3>
          <img
            src="/img/data/DC001.png"
            alt="コンボ連舞数によるダメージ倍率"
            className="center-image"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>
      </main>
    </div>
  );
};

export default DataOther;
