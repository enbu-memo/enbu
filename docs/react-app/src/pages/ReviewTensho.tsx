import React, { useState, useEffect } from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import * as XLSX from 'xlsx';
import { Helmet } from 'react-helmet-async';

// ランクに応じたclassNameを返す
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

const ReviewTensho: React.FC = () => {
  const [headers, setHeaders] = useState<string[]>([]);
  const [tableData, setTableData] = useState<any[][]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/db/cardreview.xlsx')
      .then(res => res.arrayBuffer())
      .then(data => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheet = workbook.Sheets['tensholist'];
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
      <PageMeta title="武将評価【天将】" />
      <LastUpdated filePath="src/pages/ReviewTensho.tsx" />
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="武将評価【天将】" />
        <meta name="twitter:image" content="https://enbu-kouryaku.com/img/item/IA010.png" />
      </Helmet>
      <main>
        <section>
          <h2>武将評価【天将】</h2>

          <h4>総評</h4>
          <div className="sohyo">
            ・必要数までは新カードに浮気せず交換推奨<br />
            ・攻/計/応 温故は既に持っていれば後回しで良い<br />
            ・24カードは上位互換登場の可能性あり
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
              <tr>
                <td className="col1">補助</td>
                <td className="col2">代替の効かない補助持ち</td>
              </tr>
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
              <tr><td className="col1 rank-b">B</td><td className="col2">代替候補あり</td></tr>
              <tr><td className="col1 rank-c">C</td><td className="col2">新カードまで様子見</td></tr>
              <tr><td className="col1 rank-d">D</td><td className="col2">不要</td></tr>
            </tbody>
          </table>

          <hr className="section-divider" />

          {/* Excelから読み込んだテーブル */}
          {error ? (
            <p style={{ color: 'red' }}>{error}</p>
          ) : !headers.length ? (
            <p>Loading...</p>
          ) : (
            <table className="excel-table">
              <thead>
                <tr>
                  {headers.map((h, idx) => {
                    if (idx === 1) return null; // 2列目(画像名)は非表示
                    return <th key={idx}>{h}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell: any, idx: number) => {
                      if (idx === 0) return null; // 1列目は非表示
                      if (idx === 1 && cell) {
                        // 画像列
                        return (
                          <td key={idx} data-imgname={cell}>
                            <img src={`/img/busho_icon/${cell}.png`} alt={cell} />
                          </td>
                        );
                      }
                      if (idx === 5) {
                        // 備考列はランク色なし
                        return <td key={idx}>{cell ?? ''}</td>;
                      }
                      // ランク列
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

export default ReviewTensho;
