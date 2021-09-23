import React from 'react';

import { cx, css } from '@emotion/css';

// import { UrlObject } from 'url';

const linkCss = (isLink: boolean) => css`
  display: flex;
  align-items: center;
  text-decoration: none;
  ${isLink &&
  css`
    &:hover {
      text-decoration: underline;
    }
  `}
`;

const iconCss = css`
  display: flex;
  margin-right: 4px;
`;

export type BreadcrumbItemProps = {
  /** css class 이름 */
  className?: string;
  /** 버튼 컴포넌트의 컨텐츠 */
  children?: React.ReactNode;
  /** style */
  style?: React.CSSProperties;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** custom element */
  as?: React.ElementType;
  /** link url */
  href?: string; // string | UrlObject;
  /** React/Reach Router Link to */
  to?: string;
  /** click 시 발생 */
  onClick?: (event: React.MouseEvent) => void;
};

type BreadcrumbItemFC = { breadcrumbRole: 'BreadcrumbItem' } & React.FC<BreadcrumbItemProps>;

const BreadcrumbItem: BreadcrumbItemFC = ({
  className,
  href,
  to,
  as: Component = href !== undefined ? 'a' : 'span',
  icon,
  children,
  ...rest
}) => {
  return (
    <Component
      className={cx(linkCss(!!href || !!to), 'es-breadcrumb__link', className)}
      href={href}
      to={to}
      {...rest}
    >
      {icon && <span className={cx(iconCss, 'es-breadcrumb__icon')}>{icon}</span>}
      {children}
    </Component>
  );
};

BreadcrumbItem.breadcrumbRole = 'BreadcrumbItem';

export default BreadcrumbItem;
