import React from 'react';
import LastUpdated from '../components/LastUpdated';
import PageMeta from '../components/PageMeta';
import { Helmet } from 'react-helmet-async';

const sgfree: React.FC = () => {
  return (
    <div className="container">
      <PageMeta title="SGの使い道【無償】" />
      <Helmet>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="SGの使い道【無償】" />
        <meta name="twitter:image" content="https://enbu-kouryaku.com/img/item/IA013.png" />
      </Helmet>
      <LastUpdated route="/sgfree" />
      <main>
        <section>
          <h2>SGの使い道【無償】</h2>

          <div className="sohyo">
            <div className="point">
              ☞<span className="text-red">軍令状(並)</span>が圧倒的におすすめ<br />
              ☞貯金できた場合は(フェス)大将ガチャに全投入<br />
            </div>
          </div>

          <hr className="section-divider" />

          {/* おすすめ度一覧テーブル */}
          <table>
            <thead>
              <tr>
                <th className="col1" style={{ width: '40%' }}>使い道</th>
                <th className="col2">おすすめ度</th>
                <th className="col3">消費SG</th>
              </tr>
            </thead>
            <tbody className="table-common">
              <tr>
                <td className="col1" style={{ textAlign: 'left' }}>軍令状(並)</td>
                <td className="col2" style={{ textAlign: 'left' }}>★★★★★</td>
                <td className="col3" style={{ textAlign: 'right' }}>2000SG</td>
              </tr>
              <tr>
                <td className="col1" style={{ textAlign: 'left' }}>大将ガチャ</td>
                <td className="col2" style={{ textAlign: 'left' }}>★★★★</td>
                <td className="col3" style={{ textAlign: 'right' }}>72300SG</td>
              </tr>
              <tr>
                <td className="col1" style={{ textAlign: 'left' }}>シリーズガチャ</td>
                <td className="col2" style={{ textAlign: 'left' }}>★★★</td>
                <td className="col3" style={{ textAlign: 'right' }}>11300SG</td>
              </tr>
              <tr>
                <td className="col1" style={{ textAlign: 'left' }}>天将ガチャ</td>
                <td className="col2" style={{ textAlign: 'left' }}>★★</td>
                <td className="col3" style={{ textAlign: 'right' }}>25800SG</td>
              </tr>
              <tr>
                <td className="col1" style={{ textAlign: 'left' }}>神将ガチャ</td>
                <td className="col2" style={{ textAlign: 'left' }}>★</td>
                <td className="col3" style={{ textAlign: 'right' }}>25800SG</td>
              </tr>
            </tbody>
          </table>

          <hr className="section-divider" />

          {/* 軍令状 */}
          <h4>軍令状(並)×60枚【★★★★★】</h4>
          <div className="sohyo">
            <div className="point">
              ☞<span className="text-red">レイドを沢山やる人</span>は最優先な使い道<br />
              ☞毎日24:00でリセットされて60枚買える<br />
              ☞毎日買うと約月1800枚(60000SG)になる<br />
            </div>
            ・購入方法<br />
             [商店]→[通常商品]→[フィールド系]<br />
            <img src="img/tips/TP001.jpg" style={{ display: 'block', margin: '10px', maxWidth: '240px' }} alt="購入方法1" />
            <img src="img/tips/TP002.jpg" style={{ display: 'block', margin: '10px', maxWidth: '240px' }} alt="購入方法2" />
            <img src="img/tips/TP003.jpg" style={{ display: 'block', margin: '10px', maxWidth: '240px' }} alt="購入方法3" />
            <div className="point">
              -金将星、武将カードが獲得できるガチャポイント<br />
              -スキル玉作成、武将カード交換に必要な金将星<br />
              -スキル玉作成の素材になる合成の心得<br />
              <span className="text-red">すべてレイドで揃えることができる</span>
            </div>
          </div>

          <hr className="section-divider" />

          {/* 大将ガチャ */}
          <h4>大将ガチャ×250連【★★★★】</h4>
          <div className="sohyo">
            <div className="point">
              ☞<span className="text-red">無償SGが沢山ある人</span>は優先度が高い使い道<br />
              ☞ガチャ券と合算で250連まではSG温存推奨<br />
              (例)200連は無償SG、50連は大将ガチャなど<br />
              ☞交換券250枚で新規大将1枚と交換できる<br />
              <span className="text-red">※交換券は大将ガチャごとで持ち越せない</span><br />
              ☞<span className="text-red">フェス大将</span>はレイドの特攻が多いのでおすすめ
            </div>

            <h4>大将カードのレイド特攻頻度(2026年3月時点)</h4>

            {/* フェステーブル */}
            <table>
              <thead>
                <tr>
                  <th className="col1" style={{ width: '15%' }}><span className="text-red">フェス</span></th>
                  <th className="col2"><img src="img/taisho/TB008.png" alt="TB008" /></th>
                  <th className="col3"><img src="img/taisho/TC007.png" alt="TC007" /></th>
                  <th className="col4"><img src="img/taisho/TA008.png" alt="TA008" /></th>
                  <th className="col5"><img src="img/taisho/TB011.png" alt="TB011" /></th>
                  <th className="col6"><img src="img/taisho/TC010.png" alt="TC010" /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>特攻</td>
                  <td>10/10回</td>
                  <td>9/10回</td>
                  <td>9/10回</td>
                  <td>6/6回</td>
                  <td>4/4回</td>
                </tr>
              </tbody>
            </table>

            {/* 通常テーブル */}
            <table>
              <thead>
                <tr>
                  <th className="col1" style={{ width: '15%' }}>通常</th>
                  <th className="col2"><img src="img/taisho/TA007.png" alt="TA007" /></th>
                  <th className="col3"><img src="img/taisho/TB007.png" alt="TB007" /></th>
                  <th className="col4"><img src="img/taisho/TB010.png" alt="TB010" /></th>
                  <th className="col5"><img src="img/taisho/TC008.png" alt="TC008" /></th>
                  <th className="col6"><img src="img/taisho/TA010.png" alt="TA010" /></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>特攻</td>
                  <td>5/11回</td>
                  <td>4/11回</td>
                  <td>4/8回</td>
                  <td>3/7回</td>
                  <td>4/5回</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="section-divider" />

          {/* シリーズガチャ */}
          <h4>シリーズガチャ×50連【★★★】</h4>
          <div className="sohyo">
            <MeritDemeritTable
              merits={[
                'シリーズ交換券とスキル玉交換券が手に入る',
                '50連で25が確定で手に入る',
              ]}
              demerits={[
                '有償と異なり欲しい25を選べないので完全にランダム',
                'カードはレイドで貯めたガチャポイントから入手できる',
              ]}
            />
          </div>

          <hr className="section-divider" />

          {/* 天将ガチャ */}
          <h4>天将ガチャ×100連【★★】</h4>
          <div className="sohyo">
            <MeritDemeritTable
              merits={[
                '100連で天将カード(24以上)が確定で手に入る',
                '天将カードは24でも必須カードがある',
                '温故を交換券200枚で交換できる',
              ]}
              demerits={[
                '25が確定で手に入るわけではない',
                '24が揃っている場合は交換券以外価値なし',
                '25がでない場合は消費SGに見合わない',
                '温故も25が揃えば不要になるため勿体ない',
              ]}
            />
          </div>

          <hr className="section-divider" />

          {/* 神将ガチャ */}
          <h4>神将ガチャ×100連【★】</h4>
          <div className="sohyo">
            引かなくてOK
          </div>

          <div className="copyright">©Sumzap, Inc. All Rights Reserved.</div>
        </section>
      </main>
    </div>
  );
};

// メリット・デメリットテーブル共通コンポーネント
const MeritDemeritTable: React.FC<{
  merits: string[];
  demerits: string[];
}> = ({ merits, demerits }) => (
  <>
    <table
      className="priority-table"
      style={{ marginBottom: '0.5em', width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}
    >
      <thead>
        <tr style={{ background: '#eee', fontWeight: 'bold' }}>
          <th>メリット</th>
        </tr>
      </thead>
      <tbody>
        {merits.map((text, i) => (
          <tr key={i}>
            <td style={{ textAlign: 'left' }}>{text}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <table
      className="priority-table"
      style={{ marginBottom: '0.5em', width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}
    >
      <thead>
        <tr style={{ background: '#eee', fontWeight: 'bold' }}>
          <th>デメリット</th>
        </tr>
      </thead>
      <tbody>
        {demerits.map((text, i) => (
          <tr key={i}>
            <td style={{ textAlign: 'left' }}>{text}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
);

export default sgfree;
