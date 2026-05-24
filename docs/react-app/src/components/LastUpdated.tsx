// src/components/LastUpdated.tsx
import React from 'react';

declare const __GIT_UPDATED_AT__: string | null;

interface Props {
  filePath: string;
}

const LastUpdated: React.FC<Props> = ({ filePath }) => {
  const allDates: Record<string, string> | null = (() => {
    try {
      const raw = typeof __GIT_UPDATED_AT__ !== 'undefined' ? __GIT_UPDATED_AT__ : null;
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const dateStr = allDates?.[filePath];
  if (!dateStr) return null;

  const formatted = new Date(dateStr).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return <div className="last-update">最終更新日: {formatted}</div>;
};

export default LastUpdated;