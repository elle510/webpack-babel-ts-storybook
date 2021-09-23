import React, { useCallback, useMemo, useState } from 'react';

import { cx, css } from '@emotion/css';

const navCss = css``;

const olCss = css`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  align-items: center;
`;

const liCss = css``;

const separatorCss = css`
  margin-left: 8px;
  margin-right: 8px;
`;

const collapseCss = css`
  cursor: pointer;
  background-color: #f5f5f5;
`;

export type BreadcrumbProps = {
  /** css class 이름 */
  className?: string;
  /** 버튼 컴포넌트의 컨텐츠 */
  children?: React.ReactNode;
  /** style */
  style?: React.CSSProperties;
  /**
   * separator node
   * @default '/'
   */
  separator?: React.ReactNode;
  /**
   * 보여지는 항목의 최대 개수 설정
   * 최대 개수가 초과되면 처음항목과 마지막 항목, 그 사이는 ... 으로 표시된다.
   * @default 5
   */
  maxItems?: number;
  /** maxItems 설정에 의해 표시된 ... click 시 발생 */
  onExpand?: (event: React.MouseEvent) => void;
} & React.HTMLAttributes<HTMLElement>;

const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>(
  ({ className, separator = '/', maxItems = 5, children, onExpand, ...rest }, ref) => {
    const [expanded, setExpanded] = useState(false);

    const handleClickExpand = useCallback(
      (event: React.MouseEvent) => {
        setExpanded(true);
        onExpand?.(event);
      },
      [onExpand],
    );

    const allItems = useMemo(() => {
      const items: React.ReactNode[] = [];
      const count = React.Children.count(children);
      React.Children.forEach(children, (child, index) => {
        if (React.isValidElement(child)) {
          const { breadcrumbRole }: any = child.type;
          if (breadcrumbRole === 'BreadcrumbItem') {
            items.push(
              <li key={`item-${index + 0}`} className={cx(liCss, 'es-breadcrumb__item')}>
                {child}
              </li>,
            );
          }
        }
        if (index < count - 1) {
          items.push(
            <li
              key={`separator-${index + 0}`}
              className={cx(separatorCss, 'es-breadcrumb__separator')}
            >
              {separator}
            </li>,
          );
        }
      });

      return items;
    }, [children, separator]);

    const renderCollapseItems = useCallback(
      (items) => {
        return [
          ...items.slice(0, 2),
          <li
            key={`collapsed-${items.length}`}
            className={cx(collapseCss, 'es-breadcrumb__collapse')}
          >
            <span onClick={handleClickExpand}>...</span>
          </li>,
          ...items.slice(items.length - 2, items.length),
        ];
      },
      [handleClickExpand],
    );

    return (
      <nav ref={ref} className={cx(navCss, 'es-breadcrumb', className)} {...rest}>
        <ol className={cx(olCss, 'es-breadcrumb__list')}>
          {expanded || (maxItems && allItems.length <= maxItems)
            ? allItems
            : renderCollapseItems(allItems)}
        </ol>
      </nav>
    );
  },
);

export default Breadcrumb;
