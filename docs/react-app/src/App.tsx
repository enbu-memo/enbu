import { useState, useMemo, lazy, Suspense } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import './global.css';
import Header from './components/Header';
import CopyrightFooter from './components/CopyrightFooter';
import BackToTopButton from './components/BackToTopButton';
import LastUpdated from './components/LastUpdated';

declare const __GIT_HISTORY__: string | null;

type HistoryRow = {
  page: string;
  date: string;
  content: string;
  route: string;
};

const historyData: HistoryRow[] = (() => {
  try {
    const raw = typeof __GIT_HISTORY__ !== 'undefined' ? __GIT_HISTORY__ : null;
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
})();

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
  const [filter, setFilter] = useState('');
  const [sortAsc, setSortAsc] = useState(false);

  const filtered = useMemo(() => {
    let rows = historyData.filter(row =>
      row.page.toLowerCase().includes(filter.toLowerCase())
    );
    rows = rows.sort((a, b) => {
      const dA = new Date(a.date).getTime();
      const dB = new Date(b.date).getTime();
      return sortAsc ? dA - dB : dB - dA;
    });
    return rows;
  }, [filter, sortAsc]);

  return (
    <div className="container">
      <LastUpdated filePath="src/App.tsx" />
      <main>
        <section>
          <h2>更新履歴</h2>
          <input
            type="text"
            id="filterInput"
            placeholder="ページで絞り込み"
            value={filter}
            onChange={e => setFilter(e.target.value)}
          />
          <div className="table-scroll">
            <table id="historyTable">
              <thead>
                <tr>
                  <th>ページ</th>
                  <th>
                    更新日
                    <button id="sortToggle" title="ソート" onClick={() => setSortAsc(s => !s)}>
                      {sortAsc ? '▲' : '▼'}
                    </button>
                  </th>
                  <th>更新内容</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', color: '#aaa' }}>
                      デプロイ後に履歴が表示されます
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr key={i}>
                      <td>
                        {row.route && row.route !== '/' ? (
                          <Link to={row.route} style={{ textDecoration: 'underline', color: '#1976d2' }}>
                            {row.page}
                          </Link>
                        ) : (
                          row.page
                        )}
                      </td>
                      <td>{new Date(row.date).toLocaleDateString('ja-JP', {
                        year: 'numeric', month: 'numeric', day: 'numeric'
                      })}</td>
                      <td>{row.content}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
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
          <Route path="/SkillRoot"     element={<SkillRoot />} />
          <Route path="/SgFree"        element={<SgFree />} />
          <Route path="/SerialCode"    element={<SerialCode />} />
          <Route path="/ReviewTensho"  element={<ReviewTensho />} />
          <Route path="/ReviewShinsho" element={<ReviewShinsho />} />
          <Route path="/ReviewHaou"    element={<ReviewHaou />} />
          <Route path="/ReviewRaid"    element={<ReviewRaid />} />
          <Route path="/ReviewKassen"  element={<ReviewKassen />} />
          <Route path="/DataSkill"     element={<DataSkill />} />
          <Route path="/DataOugi"      element={<DataOugi />} />
          <Route path="/DataOther"     element={<DataOther />} />
          <Route path="/RaidStatistics" element={<RaidStatistics />} />
          <Route path="/DeckRaid"      element={<DeckRaid />} />
        </Routes>
      </Suspense>
      <CopyrightFooter />
      <BackToTopButton />
    </>
  );
}

export default App;