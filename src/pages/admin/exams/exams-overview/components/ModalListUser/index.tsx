import { FundViewOutlined } from '@ant-design/icons';
import { Modal, List, Avatar, Button, Tooltip } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { FormattedMessage } from 'umi';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  userExams: API.UserExam[];
}

const ModalListUser: React.FC<IProps> = ({ isModalOpen, setIsModalOpen, userExams }) => {
  const history = useHistory();
  return (
    <Modal
      title={<FormattedMessage id="component.modalListUser.title" />}
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      <div
        id="scrollableDiv"
        style={{
          maxHeight: 'auto',
          overflow: 'auto',
        }}
      >
        <List
          dataSource={userExams}
          renderItem={(item) => (
            <List.Item key={item.user.id}>
              <List.Item.Meta
                avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                title={item.user.name}
                description={item.user.email}
              />
              <Tooltip
                title={
                  <FormattedMessage id="component.modalListUser.action.viewExamResult.viewExamResultTooltip.title" />
                }
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<FundViewOutlined />}
                  onClick={() => {
                    history.push(`/user-exams/${item.id}/overview`);
                  }}
                />
              </Tooltip>
            </List.Item>
          )}
        />
      </div>
    </Modal>
  );
};

export default ModalListUser;
