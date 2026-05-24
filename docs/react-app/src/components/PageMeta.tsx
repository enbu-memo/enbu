import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_TITLE } from '../routes';

interface Props {
  title: string;
}

const PageMeta: React.FC<Props> = ({ title }) => (
  <Helmet>
    <title>{title} | {SITE_TITLE}</title>
    <meta property="og:title" content={`${title} | ${SITE_TITLE}`} />
    <meta property="og:type" content="article" />
    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content={`${title} | ${SITE_TITLE}`} />
  </Helmet>
);

export default PageMeta;