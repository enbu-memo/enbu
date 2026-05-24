import React, { useState, useEffect } from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import * as XLSX from 'xlsx';

const getRankClass = (cell: string): string => {
  const rank = cell.split('(')[0];
  switch (rank) {
    case 'SS': return 'rank-ss';
    case 'S':  return 'rank-s';
    case 'A':  return 'rank-a';
    case 'B':  return 'rank-b';
    case 'C':  return 'rank-c';
    case 'D':  return 'rank-d';
    default:   return '';
  }
};

const ReviewHaou: React.FC = () => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/db/cardreview.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheet = workbook.Sheets['haoulist'];
        if (!sheet) {
          setError('指定シートが見つかりません。');
          return;
        }
        const json: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        setHeaders(json[0] as string[]);
        setTableData(json.slice(1));
      })
      .catch(() => setError('Excelファイルの読み込みに失敗しました。'));
  }, []);

  return (
    <div className="container">
      <PageMeta title="武将評価【覇王】" />
      <LastUpdated filePath="src/pages/ReviewHaou.tsx" />
      <main>
        <section>
          <h2>武将評価【覇王】</h2>

          <h4>総評</h4>
          <div className="sohyo">
            ・入手機会が少ないため交換は慎重に<br />
            ・8～12枚一気に交換できるまで温存<br />
            ・極意まで新カードに浮気せず交換推奨
          </div>

          <hr className="section-divider" />

          <h4>評価基準</h4>
          <table className="border">
            <thead>
              <tr>
                <th className="col1">項目</th>
                <th className="col2">基準</th>
              </tr>
            </thead>
            <tbody className="table-common">
              <tr><td className="col1">継承枠</td><td className="col2">前衛/後衛3枠持ち</td></tr>
              <tr><td className="col1">補助</td><td className="col2">代替の効かない補助持ち</td></tr>
              <tr><td className="col1">スキル</td><td className="col2">小隊を乗せたいスキル持ち</td></tr>
            </tbody>
          </table>

          <table className="details">
            <thead>
              <tr>
                <th className="col1">評価</th>
                <th className="col2">補足</th>
              </tr>
            </thead>
            <tbody className="table-common">
              <tr><td className="col1 rank-ss">SS</td><td className="col2">人権クラス</td></tr>
              <tr><td className="col1 rank-s">S</td><td className="col2">交換推奨</td></tr>
              <tr><td className="col1 rank-a">A</td><td className="col2">余裕があれば交換</td></tr>
              <tr><td className="col1 rank-b">B</td><td className="col2">新カードまで様子見</td></tr>
              <tr><td className="col1 rank-c">C</td><td className="col2">穴埋め以下</td></tr>
            </tbody>
          </table>

          <hr className="section-divider" />

          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : !headers.length ? (
            <p>Loading...</p>
          ) : (
            <table className="excel-table">
              <thead>
                <tr>
                  {headers.map((h, idx) => {
                    if (idx === 1) return null;
                    return <th key={idx}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell: any, idx: number) => {
                      if (idx === 0) return null;
                      if (idx === 1 && cell) {
                        return (
                          <td key={idx} data-imgname={cell}>
                            <img src={`/img/busho_icon/${cell}.png`} alt={cell} />
                          </td>
                        );
                      }
                      if (idx === 5) {
                        return <td key={idx}>{cell ?? ''}</td>;
                      }
                      const rankClass = getRankClass(String(cell ?? ''));
                      return (
                        <td key={idx} className={rankClass}>
                          {cell ?? ''}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>
      </main>
    </div>
  );
};

export default ReviewHaou;
