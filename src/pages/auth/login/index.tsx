import Footer from '@/components/Footer';
import { login } from '@/services/auth';
import { setToken } from '@/utils/authority';
import { ROLES } from '@/utils/constant';
import { GoogleCircleFilled, LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginForm, PageLoading, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { Button, notification, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormattedMessage, history, Link, useIntl, useModel } from 'umi';
import styles from './index.less';

const Login: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>(false);

  const intl = useIntl();

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);

      const userInfo = await initialState?.fetchUserInfo?.();
      setLoading(false);

      if (userInfo) {
        await setInitialState((state) => ({
          ...state,
          currentUser: userInfo,
        }));
      }
    };
    fetchUserInfo();
    if (initialState?.currentUser) {
      if (!history) return;
      const { query } = history.location;
      const { redirect } = query as { redirect: string };

      history.push(
        redirect || (initialState?.currentUser?.role === ROLES.ADMIN ? '/admin' : '/user'),
      );
    }
  }, [initialState, setInitialState]);

  const handleSubmit = async (values: API.LoginParams) => {
    const defaultLoginFailureMessage = intl.formatMessage({
      id: 'pages.login.failure',
    });

    try {
      const response = await login({ ...values });
      if (response.success) {
        const { token, user } = response.data;

        const defaultLoginSuccessMessage = intl.formatMessage({
          id: 'pages.login.success',
        });
        notification.success({
          message: defaultLoginSuccessMessage,
        });

        setToken(token?.accessToken);

        await setInitialState((state) => ({
          ...state,
          currentUser: user,
        }));

        if (!history) return;
        const { query } = history.location;
        const { redirect } = query as { redirect: string };

        history.push(redirect || (user.role === ROLES.ADMIN ? '/admin' : '/user'));
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
    <>
      {loading ? (
        <PageLoading />
      ) : (
        <div className={styles.container}>
          <div className={styles.content}>
            <LoginForm
              logo={<img alt="logo" src="/logo.svg" />}
              title="Knowled"
              submitter={{
                render: (props) => {
                  return (
                    <Button type="primary" onClick={() => props.submit?.()} block>
                      Login
                    </Button>
                  );
                },
              }}
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
                  <FormattedMessage id="pages.login.rememberMe" />
                </ProFormCheckbox>
                <Link
                  to="/register"
                  style={{
                    float: 'right',
                  }}
                  className="font-bold text-dark"
                >
                  <FormattedMessage id="pages.login.registerAccount" />
                </Link>
              </div>
            </LoginForm>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Login;
