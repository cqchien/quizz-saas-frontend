import type { TitleProps } from 'antd/es/typography/Title';
import Title from 'antd/es/typography/Title';
import classNames from 'classnames';
import type { FC } from 'react';
import customTitleStyles from './style.less';

interface CustomTitleProps extends Omit<TitleProps, 'level'> {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  noMargin?: boolean;
}

const CustomTitle: FC<CustomTitleProps> = ({ noMargin = false, level, className, style, ...props }) => {
  let styles = style;
  if (level === 6) {
    styles = {
      fontSize: 'var(--heading-6-size)',
      fontWeight: 'var(--typography-title-font-weight-semi)',
      ...style,
    };
  }
  if (noMargin) {
    styles = {
      margin: 0,
      ...style,
    };
  }

  return (
    <Title
      className={classNames(customTitleStyles.customTitle, className)}
      // @ts-ignore
      level={level === 6 ? 5 : level}
      style={styles}
      {...props}
    >
      {props.children}
    </Title>
  );
};

export default CustomTitle;
