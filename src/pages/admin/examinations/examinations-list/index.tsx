import { PlusOutlined } from '@ant-design/icons';
import { PageContainer } from '@ant-design/pro-components';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'umi';

const ExaminationList: React.FC = () => {
  return (
    <PageContainer>
      <Link to={'/examinations/create'} key="createButton">
        <Button type="primary" icon={<PlusOutlined />}>
          <span>
            <FormattedMessage id="pages.examinationsTable.column.action.createLabel" />
          </span>
        </Button>
      </Link>
    </PageContainer>
  );
};

export default ExaminationList;
