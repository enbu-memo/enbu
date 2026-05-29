import React from 'react';
import historyData from '../data/history.json';

interface Props {
  route: string | null; // nullのとき全体の最新を表示
}

const LastUpdated: React.FC<Props> = ({ route }) => {
  const latest = route === null
    ? historyData[0]
    : historyData.find(row => row.route === route);

  if (!latest) return null;

  const formatted = new Date(latest.date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <div className="last-update">最終更新日: {formatted}</div>;
};

export default LastUpdated;