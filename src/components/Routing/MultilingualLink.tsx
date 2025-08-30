import React from 'react';
import { Link as RouterLink, LinkProps } from 'react-router-dom';
import { useMultilingualRoute } from '../../hooks/useMultilingualRoute';

interface MultilingualLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: React.ReactNode;
}

const MultilingualLink: React.FC<MultilingualLinkProps> = ({ to, children, ...props }) => {
  const { getPathWithLanguage } = useMultilingualRoute();
  
  const localizedTo = getPathWithLanguage(to);
  
  return (
    <RouterLink to={localizedTo} {...props}>
      {children}
    </RouterLink>
  );
};

export default MultilingualLink;
