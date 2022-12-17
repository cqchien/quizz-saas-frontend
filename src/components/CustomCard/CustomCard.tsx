import CustomSpace from '@/components/CustomSpace/CustomSpace';
import CustomTitle from '@/components/CustomTitle/CustomTitle';
import { Card } from 'antd';
import Text from 'antd/es/typography/Text';
import type { CardProps } from 'antd/lib/card';
import classNames from 'classnames';
import type { FC } from 'react';
import React from 'react';
import './CustomCard.less';

export interface CustomCardProps extends CardProps {
  radius?: 'base' | 'sm' | 'md' | 'lg';
  noPadding?: boolean;
  active?: boolean;
  fixedHeight?: boolean;
  fullWidth?: boolean;
  fullHeight?: boolean;
  borderHeading?: boolean;
  shadow?: TypeShadow;
  icon?: React.ReactNode;
  subTitle?: string;
  titleEditable?: any;
}

const CustomCard: FC<CustomCardProps> = (props) => {

  const {
    children,
    style,
    className,
    noPadding = false,
    active = false,
    fullWidth = false,
    fullHeight = false,
    fixedHeight = false,
    borderHeading = true,
    shadow = 'default',
    title = '',
    subTitle = '',
    radius = 'base',
    extra,
    icon,
    titleEditable = false,
    ...cardProps
  } = props;
  const classes = classNames(
    [className, 'custom-card'],
    { 'custom-card-no-padding': noPadding },
    { 'custom-card--no-title-border': !borderHeading },
    { 'custom-card--active': active },
    { 'custom-card--fixed-height': fixedHeight },
    { 'custom-card--full-width': fullWidth },
    { 'custom-card--full-height': fullHeight },
    { [`custom-card--shadow-${shadow}`]: shadow },
  );

  return (
    <Card
      className={classes}
      style={{ ...style }}
      title={
        title && (
          <div className={classNames({ 'title-bordered': borderHeading })}>
            <CustomSpace fullWidth size={32} justify="between">
              <CustomSpace fullWidth>
                {icon && icon}
                <CustomSpace fullWidth direction="vertical" size={4}>
                  <CustomTitle ellipsis level={6} editable={titleEditable}>
                    {title}
                  </CustomTitle>
                  {subTitle && (
                    <Text type="secondary" style={{ fontSize: 'var(--font-size-sm)' }}>
                      {subTitle}
                    </Text>
                  )}
                </CustomSpace>
              </CustomSpace>
              {extra && extra}
            </CustomSpace>
          </div>
        )
      }
      {...cardProps}
    >
      {children}
    </Card>
  );
};

export default CustomCard;
