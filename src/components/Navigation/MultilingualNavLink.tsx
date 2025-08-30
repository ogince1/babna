import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { useMultilingualRoute } from '../../hooks/useMultilingualRoute';

interface MultilingualNavLinkProps extends Omit<LinkProps, 'to'> {
  to: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
}

const MultilingualNavLink: React.FC<MultilingualNavLinkProps> = ({ 
  to, 
  children, 
  className = '', 
  activeClassName = '',
  ...props 
}) => {
  const { getPathWithLanguage, currentPathWithoutLanguage } = useMultilingualRoute();
  
  const localizedTo = getPathWithLanguage(to);
  const isActive = currentPathWithoutLanguage === to;
  
  const finalClassName = `${className} ${isActive ? activeClassName : ''}`.trim();
  
  return (
    <Link to={localizedTo} className={finalClassName} {...props}>
      {children}
    </Link>
  );
};

export default MultilingualNavLink;
