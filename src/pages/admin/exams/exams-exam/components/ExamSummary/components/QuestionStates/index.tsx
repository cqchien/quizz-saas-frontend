import { Typography, Space } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';

interface Props {
  data: { background: string; formattedMessageId: string; quantity?: number }[];
}
const { Text, Title } = Typography;

const QuestionStates: React.FC<Props> = ({ data }) => {
  console.log(data);
  return (
    <>
      {data.map((x) => {
        return (
          <Space
            key={x.formattedMessageId}
            align="center"
            direction="vertical"
            style={{ display: 'flex' }}
          >
            <Space>
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  marginRight: '8px',
                  display: 'inline-block',
                  borderColor: '#343a40',
                  border: '1px solid #dee2e6',
                  background: x.background,
                }}
              />
              <Text strong>
                <FormattedMessage id={x.formattedMessageId} />
              </Text>
            </Space>
            {x.quantity !== undefined && (
              <>
                <Title style={{ margin: 0, color: x.background }}>{x.quantity}</Title>
                <Text>
                  <FormattedMessage id={x.formattedMessageId} />
                  (s)
                </Text>
              </>
            )}
          </Space>
        );
      })}
    </>
  );
};

export default QuestionStates;
