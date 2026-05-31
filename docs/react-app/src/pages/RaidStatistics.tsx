import React, { useState, useEffect } from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import * as XLSX from 'xlsx';
import { Helmet } from 'react-helmet-async';

const EXCEL_PATH = '/db/raid-statistics.xlsx';

type SheetDateMap = Record<string, string>;

type ColTable = {
  headerName: string;
  headerCount: number;
  items: { imgName: string; percent: number }[];
};

// historyシートからシート名・日付マップ・最新シート名を取得
function getSheetInfo(json: any[][]): {
  sheetNames: string[];
  dateMap: SheetDateMap;
  latestSheet: string;
} {
  const sheetNames = json.map(row => row[0]).filter(Boolean) as string[];
  const dateMap: SheetDateMap = {};
  sheetNames.forEach(name => {
    const row = json.find(r => r[0] === name);
    dateMap[name] = row?.[1] ?? '';
  });
  let latestSheet = sheetNames[0] ?? '';
  let latestDate = dateMap[latestSheet] ?? '';
  sheetNames.forEach(name => {
    const dateStr = dateMap[name];
    if (dateStr && (!latestDate || new Date(dateStr) > new Date(latestDate))) {
      latestSheet = name;
      latestDate = dateStr;
    }
  });
  return { sheetNames, dateMap, latestSheet };
}

// Excelシートから3カラム分のテーブルデータを生成
function parseSheetData(json: any[][]): ColTable[] {
  const colPairs: [number, number][] = [[0, 1], [2, 3], [4, 5]];
  return colPairs.map(([colA, colB]) => {
    const headerName = json[0]?.[colA] ?? '';
    const headerCount = Number(json[0]?.[colB]) || 0;
    const items: { imgName: string; percent: number }[] = [];
    for (let i = 1; i < json.length; i++) {
      const row = json[i];
      const cell = row?.[colA] ?? '';
      if (!cell) continue;
      const value = Number(row?.[colB]) || 0;
      const percent = headerCount ? Math.round((value / headerCount) * 100) : 0;
      items.push({ imgName: String(cell), percent });
    }
    return { headerName, headerCount, items };
  });
}

// 6列グリッドテーブル
const ColTable: React.FC<{ table: ColTable }> = ({ table }) => {
  const { headerName, headerCount, items } = table;
  const rows: { imgName: string; percent: number }[][] = [];
  for (let i = 0; i < items.length; i += 6) {
    rows.push(items.slice(i, i + 6));
  }
  if (rows.length === 0) rows.push([]);

  return (
    <table className="excel-table" style={{ width: 'auto', marginBottom: '1em' }}>
      <tbody>
        <tr>
          <th colSpan={6} style={{ textAlign: 'center', fontWeight: 'bold' }}>
            {headerName}{' '}
            {headerCount > 0
              ? <span>({headerCount}/100人)</span>
              : <span style={{ color: 'red' }}>データなし</span>
            }
          </th>
        </tr>
        {rows.map((row, ri) => (
          <tr key={ri}>
            {Array.from({ length: 6 }).map((_, ci) => {
              const item = row[ci];
              return item ? (
                <td key={ci} data-imgname={item.imgName}>
                  <img src={`/img/taisho/${item.imgName}.png`} alt={item.imgName} />
                  <br />
                  <span style={{ fontWeight: 'bold' }}>{item.percent}%</span>
                </td>
              ) : (
                <td key={ci} />
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

const raidstatistics: React.FC = () => {
  const [sheetNames, setSheetNames] = useState<string[]>([]);
  const [dateMap, setDateMap] = useState<SheetDateMap>({});
  const [selectedSheet, setSelectedSheet] = useState<string>('');
  const [tables, setTables] = useState<ColTable[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 初期化：historyシート読み込み
  useEffect(() => {
    fetch(EXCEL_PATH)
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheet = workbook.Sheets['history'];
        if (!sheet) { setError('指定シートが見つかりません。'); return; }
        const json: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const { sheetNames, dateMap, latestSheet } = getSheetInfo(json);
        setSheetNames(sheetNames);
        setDateMap(dateMap);
        setSelectedSheet(latestSheet);
      })
      .catch(() => setError('Excelファイルの読み込みに失敗しました。'));
  }, []);

  // シート選択時：データシート読み込み
  useEffect(() => {
    if (!selectedSheet) return;
    setLoading(true);
    fetch(EXCEL_PATH)
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheet = workbook.Sheets[selectedSheet];
        if (!sheet) { setError(`シート『${selectedSheet}』が見つかりません。`); return; }
        const json: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setTables(parseSheetData(json));
        setLoading(false);
      })
      .catch(() => setError(`シート『${selectedSheet}』の読み込みに失敗しました。`));
  }, [selectedSheet]);

  return (
    <div className="container">
      <PageMeta title="討伐デッキ統計" />
      <LastUpdated route="/raidstatistics.tsx" />
        <Helmet>
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="公開データ【討伐デッキ】" />
          <meta name="twitter:image" content="https://enbu-kouryaku.com/img/raid/RA003.png" />
        </Helmet>
      <main>
        <section>
          <h2>討伐デッキ統計</h2>
          <div className="search-skill">
            <table
              className="priority-table"
              style={{ marginBottom: '0.5em', width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}
            >
              <thead>
                <tr style={{ background: '#eee', fontWeight: 'bold' }}>
                  <th>集計方法</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ textAlign: 'left' }}>個人ランキングTOP100から集計</td></tr>
                <tr><td style={{ textAlign: 'left' }}>サブ部隊は集計対象外</td></tr>
                <tr><td style={{ textAlign: 'left' }}>採用率順で表示</td></tr>
              </tbody>
            </table>

            <hr className="section-divider" />

            {error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <>
                {/* シート選択ドロップダウン */}
                {sheetNames.length > 0 && (
                  <div style={{ marginBottom: '0.8em', display: 'flex', alignItems: 'center', gap: '0.8em' }}>
                    <select
                      id="sheet-select"
                      style={{ fontSize: '1.1em' }}
                      value={selectedSheet}
                      onChange={e => setSelectedSheet(e.target.value)}
                    >
                      {sheetNames.map(name => (
                        <option key={name} value={name}>{name}</option>
                      ))}
                    </select>
                    <span style={{ fontSize: '0.7em', color: '#222' }}>
                      集計日: {dateMap[selectedSheet] ?? ''}
                    </span>
                  </div>
                )}

                {/* テーブル */}
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  tables.map((table, i) => <ColTable key={i} table={table} />)
                )}
              </>
            )}
          </div>
          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>
      </main>
    </div>
  );
};

export default raidstatistics;
