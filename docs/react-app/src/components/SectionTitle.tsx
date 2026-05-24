import React from 'react';

type SectionTitleProps = {
  level?: 2 | 3;
  children: React.ReactNode;
  className?: string;
};


const SectionTitle: React.FC<SectionTitleProps> = ({ level = 2, children, className }) => {
  const Tag = level === 2 ? 'h2' : 'h3';
  return React.createElement(
    Tag,
    { className: className ? `section-title ${className}` : 'section-title' },
    children
  );
};

export default SectionTitle;
