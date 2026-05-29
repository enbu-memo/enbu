import { useState, useMemo, lazy, Suspense } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './global.css';
import Header from './components/Header';
import CopyrightFooter from './components/CopyrightFooter';
import BackToTopButton from './components/BackToTopButton';
import LastUpdated from './components/LastUpdated';
import { Helmet } from 'react-helmet-async';
import historyData from './data/history.json';

type HistoryRow = {
  date: string;
  page: string;
  route: string;
  content: string;
};

const VISIBLE_COUNT = 10;

const SkillRoot      = lazy(() => import('./pages/SkillRoot'));
const SgFree         = lazy(() => import('./pages/SgFree'));
const SerialCode     = lazy(() => import('./pages/SerialCode'));
const ReviewTensho   = lazy(() => import('./pages/ReviewTensho'));
const ReviewShinsho  = lazy(() => import('./pages/ReviewShinsho'));
const ReviewHaou     = lazy(() => import('./pages/ReviewHaou'));
const ReviewRaid     = lazy(() => import('./pages/ReviewRaid'));
const ReviewKassen   = lazy(() => import('./pages/ReviewKassen'));
const DataSkill      = lazy(() => import('./pages/DataSkill'));
const DataOugi       = lazy(() => import('./pages/DataOugi'));
const DataOther      = lazy(() => import('./pages/DataOther'));
const RaidStatistics = lazy(() => import('./pages/RaidStatistics'));
const DeckRaid       = lazy(() => import('./pages/DeckRaid'));

function TopPage() {
  const [showAll, setShowAll] = useState(false);

  const grouped = useMemo(() => {
    const sorted = [...(historyData as HistoryRow[])].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    const map = new Map<string, HistoryRow[]>();
    for (const row of sorted) {
      if (!map.has(row.date)) map.set(row.date, []);
      map.get(row.date)!.push(row);
    }
    return [...map.entries()];
  }, []);

  const visible = showAll ? grouped : grouped.slice(0, VISIBLE_COUNT);
  const hasMore = grouped.length > VISIBLE_COUNT;

  return (
    <div className="container">
      <LastUpdated route={null} />
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="戦国炎舞の備忘録" />
        <meta name="twitter:image" content="https://enbu-kouryaku.com/img/item/AA000.png" />
      </Helmet>
      <main>
        <section>
          <h2>更新履歴</h2>
          <div className="history-list">
            {visible.map(([date, rows]) => (
              <div key={date} className="history-group">
                <div className="history-date">
                  {new Date(date).toLocaleDateString('ja-JP', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                  })}
                </div>
                <ul className="history-items">
                  {rows.map((row, i) => (
                    <li key={i} className="history-item">
                      {row.route && row.route !== '/' ? (
                        <Link to={row.route} className="history-page-link">
                          {row.page}
                        </Link>
                      ) : (
                        <span className="history-page">{row.page}</span>
                      )}
                      <span className="history-content">{row.content}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {hasMore && (
            <button
              className="history-toggle"
              onClick={() => setShowAll(s => !s)}
            >
              {showAll ? '▲ 折りたたむ' : `▼ もっと見る（全${grouped.length}件）`}
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<div>読み込み中...</div>}>
        <Routes>
          <Route path="/"              element={<TopPage />} />
          <Route path="/SkillRoot.tsx"     element={<SkillRoot />} />
          <Route path="/SgFree.tsx"        element={<SgFree />} />
          <Route path="/SerialCode.tsx"    element={<SerialCode />} />
          <Route path="/ReviewTensho.tsx"  element={<ReviewTensho />} />
          <Route path="/ReviewShinsho.tsx" element={<ReviewShinsho />} />
          <Route path="/ReviewHaou.tsx"    element={<ReviewHaou />} />
          <Route path="/ReviewRaid.tsx"    element={<ReviewRaid />} />
          <Route path="/ReviewKassen.tsx"  element={<ReviewKassen />} />
          <Route path="/DataSkill.tsx"     element={<DataSkill />} />
          <Route path="/DataOugi.tsx"      element={<DataOugi />} />
          <Route path="/DataOther.tsx"     element={<DataOther />} />
          <Route path="/RaidStatistics.tsx" element={<RaidStatistics />} />
          <Route path="/DeckRaid.tsx"      element={<DeckRaid />} />
        </Routes>
      </Suspense>
      <CopyrightFooter />
      <BackToTopButton />
    </>
  );
}

export default App;