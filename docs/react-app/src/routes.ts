export const SITE_TITLE = '戦国炎舞の備忘録';  // ← サイト名だけここで管理

export const routes = [
  { path: '/',               title: 'TOP',           file: 'src/App.tsx' },
  { path: '/SkillRoot',      title: 'スキル玉合成',  file: 'src/pages/SkillRoot.tsx' },
  { path: '/SgFree',         title: 'SGの使い道',    file: 'src/pages/SgFree.tsx' },
  { path: '/SerialCode',     title: 'シリアルコード', file: 'src/pages/SerialCode.tsx' },
  { path: '/ReviewTensho',   title: '武将-天将',     file: 'src/pages/ReviewTensho.tsx' },
  { path: '/ReviewShinsho',  title: '武将-神将',     file: 'src/pages/ReviewShinsho.tsx' },
  { path: '/ReviewHaou',     title: '武将-覇王',     file: 'src/pages/ReviewHaou.tsx' },
  { path: '/ReviewRaid',     title: '大将-レイド',   file: 'src/pages/ReviewRaid.tsx' },
  { path: '/ReviewKassen',   title: '大将-合戦',     file: 'src/pages/ReviewKassen.tsx' },
  { path: '/DataSkill',      title: 'データ-スキル', file: 'src/pages/DataSkill.tsx' },
  { path: '/DataOugi',       title: 'データ-奥義',   file: 'src/pages/DataOugi.tsx' },
  { path: '/DataOther',      title: 'データ-その他', file: 'src/pages/DataOther.tsx' },
  { path: '/RaidStatistics', title: '討伐デッキ統計', file: 'src/pages/RaidStatistics.tsx' },
  { path: '/DeckRaid',       title: 'デッキ-レイド', file: 'src/pages/DeckRaid.tsx' },
];