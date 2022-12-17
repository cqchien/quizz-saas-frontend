import ArrowLeftIcon from '@/components/Icons/ArrowLeft';
import type { PageContainerProps } from '@ant-design/pro-layout';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Skeleton } from 'antd';
import Text from 'antd/es/typography/Text';
import classNames from 'classnames';
import type { FC, ReactNode } from 'react';
import styles from './style.less';

interface PageLayoutProps extends PageContainerProps {
  showTalkToUs?: boolean;
  subTitle?: ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({
  title,
  subTitle,
  content,
  extra,
  children,
  showTalkToUs,
  ...props
}) => {
  const classes = classNames(styles.pageContainer, props.className, {
    'contact-btn': showTalkToUs,
  });

  const renderTitle = () => {
    return (
      <>
        {title !== false && (title || <Skeleton.Input active size="default" />)}
        {subTitle && (
          <Text type="secondary" className="sub-title">
            {subTitle}
          </Text>
        )}
      </>
    );
  };

  return (
    <PageContainer
      {...props}
      title={renderTitle()}
      content={content}
      className={classes}
      extra={extra}
      backIcon={
        <Button
          ghost
          className="btn-back"
          type="primary"
          size="small"
          icon={<ArrowLeftIcon style={{ color: 'var(--primary-color)' }} />}
        />
      }
    >
      {children}
    </PageContainer>
  );
};

export default PageLayout;
