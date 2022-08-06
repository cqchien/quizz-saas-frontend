import Footer from '@/components/Footer';
import { login } from '@/services/auth';
import { setToken } from '@/utils/authority';
import { GoogleCircleFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { notification, Tabs } from 'antd';
import React from 'react';
import { FormattedMessage, history, useIntl, useModel } from 'umi';
import styles from './index.less';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const intl = useIntl();

  const fetchUserInfo = async () => {
    const userInfo = await initialState?.fetchUserInfo?.();
    if (userInfo) {
      await setInitialState((state) => ({
        ...state,
        currentUser: userInfo,
      }));
    }
  };

  const handleSubmit = async (values: API.LoginParams) => {
    const defaultLoginFailureMessage = intl.formatMessage({
      id: 'pages.login.failure',
    });

    try {
      const response = await login({ ...values });
      if (response.success) {
        const { token } = response.data;

        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
        });
        notification.success({
          message: defaultLoginSuccessMessage,
        });

        setToken(token?.accessToken);

        await fetchUserInfo();

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };
        history.push(redirect || '/');
        return;
      }

      notification.error({
        description: response.message,
        message: defaultLoginFailureMessage,
      });
    } catch (error) {
      notification.error({
        message: defaultLoginFailureMessage,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <LoginForm
          logo={<img alt="logo" src="/logo.svg" />}
          title="Knowled"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <FormattedMessage key="loginWith" id="pages.login.loginWith" />,
            <GoogleCircleFilled key="GoogleCircleFilled" className={styles.icon} />,
          ]}
          onFinish={async (values) => {
            await handleSubmit(values as API.LoginParams);
          }}
        >
          <Tabs>
            <Tabs.TabPane
              key="account"
              tab={intl.formatMessage({
                id: 'pages.login.accountLogin.tab',
              })}
            />
          </Tabs>
          <ProFormText
            name="email"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.email.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.email.required" />,
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className={styles.prefixIcon} />,
            }}
            placeholder={intl.formatMessage({
              id: 'pages.login.password.placeholder',
            })}
            rules={[
              {
                required: true,
                message: <FormattedMessage id="pages.login.password.required" />,
              },
            ]}
          />

          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
            <a
              style={{
                float: 'right',
              }}
            >
              <FormattedMessage id="pages.login.forgotPassword" defaultMessage="忘记密码" />
            </a>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
