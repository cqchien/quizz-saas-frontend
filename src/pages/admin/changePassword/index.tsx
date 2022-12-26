import CustomForm from '@/components/CustomForm/CustomForm';
import CustomSpace from '@/components/CustomSpace/CustomSpace';
import CustomTitle from '@/components/CustomTitle/CustomTitle';
import { changePassword } from '@/services/auth';
import { LockOutlined } from '@ant-design/icons';
import { ProFormText } from '@ant-design/pro-form';
import { Button, notification, Typography } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';

import { Layout } from 'antd';
import { Content } from 'antd/es/layout/layout';
import styles from './style.less';

import './index.less';
import PageLayout from '@/layout/PageLayout';

const { Text } = Typography;

const ChangePassword: React.FC = () => {
  const { query = {} } = history.location;
  const { token: queryToken } = query;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    if (loading) return;

    try {
      setLoading(true);

      const response = await changePassword({
        ...values,
      }, queryToken as string);

      if (response.success) {
        setLoading(false);

        window.location.href = '/login';
        return;
      }

      setLoading(false);
      notification.success({ message: 'Change password fail!' });
    } catch (error) {
      setLoading(false);
      notification.success({ message: 'Change password fail!' });
    }
  };

  return (

    <Layout>
      <Content>
        <PageLayout
          pageHeaderRender={false}
          className={styles.useLayouts}
        >
          <div className="layouts">
            <div className="left-col">
              <CustomForm
                onFinish={async (values) => {
                  await handleSubmit(values);
                }}
              >
                <CustomSpace size={24} direction="vertical">
                  <CustomSpace className="form-header" direction="vertical">
                    <CustomTitle level={1} style={{ margin: 0 }}>Setup password</CustomTitle>
                    <Text type="secondary">
                      Please setup your password
                    </Text>
                  </CustomSpace>

                  <CustomSpace size={12} direction="vertical">
                    <CustomSpace direction="vertical" size={20}>
                      <ProFormText.Password
                        name="password"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className="prefixIcon" />,
                        }}
                        placeholder="Input password"
                        rules={[
                          {
                            required: true,
                            message: "Please input your password!"
                          },
                        ]}
                      />
                      <ProFormText.Password
                        name="confirmedPassword"
                        fieldProps={{
                          size: 'large',
                          prefix: <LockOutlined className="prefixIcon" />,
                        }}
                        placeholder='Confirm password'
                        rules={[
                          {
                            required: true,
                            message: "Please confirm your new password!"
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                              }
                              const notMatchMsg = 'The two passwords that you entered do not match!'
                              return Promise.reject(new Error(notMatchMsg));
                            },
                          }),
                        ]}
                      />
                    </CustomSpace>
                  </CustomSpace>

                  <Button block size="middle" type="primary" htmlType="submit" loading={loading}>
                    Change password
                  </Button>
                </CustomSpace>
              </CustomForm>
            </div>
          </div>
        </PageLayout>
      </Content>
    </Layout>
  );
};

export default ChangePassword;
