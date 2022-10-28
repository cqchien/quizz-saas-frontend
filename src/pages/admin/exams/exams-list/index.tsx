import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'umi';

const ExamList: React.FC = () => {
  return (
    <PageContainer>
      <Link to={'/exams/create'} key="createButton">
        <Button type="primary" icon={<PlusOutlined />}>
          <span>
            <FormattedMessage id="pages.examsTable.column.action.createLabel" />
          </span>
        </Button>
      </Link>
    </PageContainer>
  );
};

export default ExamList;
