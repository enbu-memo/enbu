import React, { useState, useEffect } from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import * as XLSX from 'xlsx'
import { Helmet } from 'react-helmet-async';

// 優先度テーブル
const PriorityTable: React.FC = () => (
  <>
    <h4>合成のルート選定優先度</h4>
    <table className="priority-table" style={{ marginBottom: '0.5em', width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
      <colgroup>
        <col style={{ width: '70px' }} />
        <col style={{ width: 'auto' }} />
      </colgroup>
      <thead>
        <tr style={{ background: '#eee', fontWeight: 'bold' }}>
          <th>優先度</th>
          <th>選定基準</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td style={{ textAlign: 'left' }}>使用緑玉の合計が少ない</td>
        </tr>
        <tr>
          <td>2</td>
          <td style={{ textAlign: 'left' }}>使用将星の合計が少ない(※例外あり)</td>
        </tr>
        <tr>
          <td>3</td>
          <td style={{ textAlign: 'left' }}>合成する回数が多い(大成功回数⤴)</td>
        </tr>
      </tbody>
    </table>
    <div className="sohyo" style={{ textAlign: 'right', marginLeft: '1em', marginBottom: '1.2em' }}>※完成直前の合成は大成功狙いで3を優先</div>
  </>
);

// 検索UI＋テーブル本体
const SkillSearch: React.FC<{
  headers: string[];
  tableData: any[];
  onSelectSkill: (imgName: string, skillName: string) => void;
}> = ({ headers, tableData, onSelectSkill }) => {
  const [search, setSearch] = useState('');
  const [types, setTypes] = useState<string[]>([]);

  const filtered = tableData.filter(row => {
    const type = row[0]?.toString() ?? '';
    const col2 = row[1]?.toString() ?? '';
    const col3 = row[2]?.toString() ?? '';
    if (types.length > 0 && !types.includes(type)) return false;
    if (search && !(col2.includes(search) || col3.includes(search))) return false;
    return true;
  });

  return (
    <div className="search-skill">
      <div className="search-row search-checkboxes">
        {['攻撃', '計略', '応援', 'その他'].map(label => (
          <label key={label}>
            <input
              type="checkbox"
              className="type-filter"
              value={label}
              checked={types.includes(label)}
              onChange={e => {
                setTypes(t =>
                  e.target.checked ? [...t, label] : t.filter(v => v !== label)
                );
              }}
            />
            {label}
          </label>
        ))}
      </div>
      <div className="search-row search-box">
        <label>
          検索: <input
            type="text"
            id="search-box"
            placeholder="スキル名で検索"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </label>
      </div>
      <div id="output">
        <table id="excel-table">
          <thead>
            <tr>
              <th>{headers[0] ?? ''}</th>
              <th colSpan={2}>{headers[1] ?? ''}</th>
              {headers.slice(4).map((h, i) => <th key={i + 4}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {filtered.map((row, idx) => (
              <tr className="skill-row" key={idx} style={{ cursor: 'pointer' }}   onClick={() => {
                  let imgName = '';
                  let skillName = '';
                  if (row[3]) imgName = row[3].toString();
                  if (row[1]) skillName = row[1].toString(); // ← 2列目がスキル名
                  if (imgName) onSelectSkill(imgName, skillName);
                }}>
                {row.map((cell: any, i: number) => {
                  if (i === 2) return null; // 3列目は非表示
                  if (i === 3 && cell) {
                    const filename = `${cell}.png`;
                    return <td key={i} data-imgname={cell}><img src={`/img/skill/${filename}`} alt={filename} /></td>;
                  }
                  return <td key={i}>{cell ?? ''}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 詳細表示
const SheetDetail: React.FC<{
  skillName: string;
  displayName: string; // ← 追加
  onBack: () => void;
}> = ({ skillName, displayName, onBack }) => {
  const [json, setJson] = useState<any[][]>([]);
  useEffect(() => {
    fetch('/db/skillroot.xlsm')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheet = workbook.Sheets[skillName];
        if (!sheet) {
          setJson([['', `シート『${skillName}』が見つかりません。`, '', '', '']]);
          return;
        }
        setJson(XLSX.utils.sheet_to_json(sheet, { header: 1 }));
      });
  }, [skillName]);

  if (!json.length) return <div>Loading...</div>;

  // 必要将星の合計
  let totalStar = 0;
  for (let i = 1; i < json.length; i++) {
    const val = Number(json[i][2]);
    if (!isNaN(val)) totalStar += val;
  }
  const secondRow = json[1];
  const know = secondRow ? secondRow[3] ?? '' : '';

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1em', marginBottom: '0.5em' }}>
          <h4 style={{ margin: 0 }}>【{displayName}】の合成ルート</h4>
        <button onClick={onBack} style={{ padding: '0.3em 0.9em', fontSize: '0.95em', background: '#222', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>戻る</button>
      </div>
      <div className="second-row-info" style={{ padding: '0.5em 1em', background: '#f9f9f9', borderRadius: '6px', border: '1px solid #eee' }}>
        <span style={{ marginRight: '1.5em' }}>将星の合計: {totalStar}</span><br />
        {know !== '' && <span style={{ marginRight: '1.5em' }}>緑玉の合計: {know}</span>}
      </div>
      <div className="sohyo" style={{ color: '#b77', padding: '0em 1em' }}>※大成功を考慮するため必要数は目安<br />※赤背景の箇所は大成功なしで計算</div>
      <table id="excel-table2">
        <thead>
          <tr>
            {[1, 2, 3].map(j => <th key={j}>{json[0]?.[j] ?? ''}</th>)}
            <th>スキル</th>
          </tr>
        </thead>
        <tbody>
          {json.slice(1).map((row, i) => (
            <tr key={i} style={row[0] === 1 ? { background: '#ffb6c1' } : {}}>
              {[1, 2, 3].map(j => <td key={j}>{row[j] ?? ''}</td>)}
              <td>{row[4] ? <img src={`/img/skill/${row[4]}.png`} alt={row[4]} style={{ maxWidth: 120, maxHeight: 120 }} /> : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const skillroot: React.FC = () => {
  const [tableData, setTableData] = useState<any[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<{ imgName: string; displayName: string } | null>(null);

  useEffect(() => {
    fetch('/db/skillroot.xlsm')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheet = workbook.Sheets['search-skill'];
        if (!sheet) return;
        const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setHeaders(json[0] as string[]);
        setTableData(json.slice(1));
      });
  }, []);

  return (
    <>
      <div className="container">
        <PageMeta title="スキル玉合成ルート" />
        <LastUpdated route="/SkillRoot.tsx" />
          <Helmet>
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="スキル玉合成ルート" />
            <meta name="twitter:image" content="https://enbu-kouryaku.com/img/data/SZ001.png" />
          </Helmet>
        <main>
          <section>
            <h2>スキル玉合成ルート</h2>
            <PriorityTable />
            {!selectedSkill ? (
              <SkillSearch headers={headers} tableData={tableData} onSelectSkill={(imgName, skillName) => setSelectedSkill({ imgName, displayName: skillName })} />
            ) : (
            <SheetDetail
              skillName={selectedSkill.imgName}
              displayName={selectedSkill.displayName}
              onBack={() => setSelectedSkill(null)}
            />
            )}
            <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
          </section>
        </main>
      </div>
    </>
  );
};

export default skillroot;
