import { FundViewOutlined } from '@ant-design/icons';
import { Modal, List, Avatar, Button, Tooltip } from 'antd';
import React from 'react';
import { useHistory } from 'react-router-dom';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  userExams: API.UserExam[];
}

const ModalListUser: React.FC<IProps> = ({ isModalOpen, setIsModalOpen, userExams }) => {
  const history = useHistory();
  return (
    <Modal
      title="List of users who have done this exam"
      open={isModalOpen}
      onCancel={() => setIsModalOpen(false)}
      okButtonProps={{ hidden: true }}
      cancelButtonProps={{ hidden: true }}
    >
      <div
        id="scrollableDiv"
        style={{
          maxHeight: 400,
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
              <Tooltip title="View exam result of this person">
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
