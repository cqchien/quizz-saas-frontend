import { login, register } from '@/services/auth';
import { setToken } from '@/utils/authority';
import { ROLES } from '@/utils/constant';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { LoginForm, PageLoading, ProFormText } from '@ant-design/pro-components';
import { Button, Tabs, notification } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage, useIntl, useModel, history } from 'umi';
import styles from '../login/index.less';

const Register: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingRegister, setLoadingRegister] = useState<boolean>(false);

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
        redirect || (initialState?.currentUser?.role === ROLES.ADMIN ? '/admin' : '/users'),
      );
    }
  }, [initialState, setInitialState]);

  const handleSubmit = async (values: API.RegisterParams) => {
    const defaultRegisterFailureMessage = intl.formatMessage({
      id: 'pages.register.failure',
    });

    try {
      setLoadingRegister(true);

      const response = await register({ ...values });
      setLoadingRegister(false);

      if (response.success) {
        const defaultRegisterSuccessMessage = intl.formatMessage({
          id: 'pages.register.success',
        });
        notification.success({
          message: defaultRegisterSuccessMessage,
        });

        const loginResponse = await login({ email: values.email, password: values.password });
        if (loginResponse.success) {
          const { token, user } = loginResponse.data;

          setToken(token?.accessToken);

          await setInitialState((state) => ({
            ...state,
            currentUser: user,
          }));

          if (!history) return;
          const { query } = history.location;
          const { redirect } = query as { redirect: string };

          history.push(redirect || (user.role === ROLES.ADMIN ? '/admin' : '/users'));
        }

        return;
      }

      notification.error({
        description: response.message,
        message: defaultRegisterFailureMessage,
      });
    } catch (error) {
      notification.error({
        message: defaultRegisterFailureMessage,
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
                    <Button type="primary" onClick={() => props.submit?.()} block loading={loadingRegister}>
                      Sign Up
                    </Button>
                  );
                },
              }}
              subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
              initialValues={{
                autoLogin: true,
              }}
              actions={[
                <p key="key" className="font-semibold text-muted text-center">
                  <FormattedMessage id="pages.register.alreadyHaveAccount.text" />
                  <Link to="/login" className="font-bold text-dark">
                    Sign In
                  </Link>
                </p>,
              ]}
              onFinish={async (values) => {
                await handleSubmit(values as API.LoginParams);
              }}
            >
              <Tabs>
                <Tabs.TabPane
                  key="account"
                  tab={intl.formatMessage({
                    id: 'pages.register.accountRegister.tab',
                  })}
                />
              </Tabs>
              <ProFormText
                name="name"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.name.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.register.name.required" />,
                  },
                ]}
              />
              <ProFormText
                name="email"
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
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
                  prefix: <LockOutlined />,
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
              <ProFormText.Password
                name="confirm"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.register.confirm.placeholder',
                })}
                dependencies={['password']}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.register.confirm.required" />,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error('The two passwords that you entered do not match!'),
                      );
                    },
                  }),
                ]}
              />
            </LoginForm>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
