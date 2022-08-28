import { ACCEPT_EXCEL_FILE } from '@/utils/constant';
import { UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormUploadDragger } from '@ant-design/pro-components';
import type { UploadProps } from 'antd';
import { Button, message, Space, Upload } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';

interface IImportQuestionsModal {
  handleImport: any,
}

const ImportQuestionModal: React.FC<IImportQuestionsModal> = ({ handleImport }) => {
  const props: UploadProps = {
    name: 'file',
    beforeUpload: (file: any) => {
      const isExcel = ACCEPT_EXCEL_FILE.split(', ').includes(file.type);
      if (!isExcel) {
        message.error(`${file.name} is not a excel file`);
      }
      return isExcel || Upload.LIST_IGNORE;
    },
  };

  return (
    <ModalForm
      title={<FormattedMessage id="pages.questionsTable.column.action.importLabel" />}
      trigger={
        <Button key="importButton" type="primary" icon={<UploadOutlined />}>
          <span>
            <FormattedMessage id="pages.questionsTable.column.action.importLabel" />
          </span>
        </Button>
      }
      autoFocusFirstInput
      modalProps={{
        okText: 'Import',
        cancelText: 'Cancel',
      }}
      onFinish={async (value) => handleImport(value)}
    >
      <Space direction="horizontal">
        <a type="primary" href='/template-import-question.xlsx' target="_blank" download>
          <FormattedMessage id="pages.importQuestion.dragger.downloadTemplate.downloadTemplateText" />
        </a>
      </Space>
      <ProFormUploadDragger
        {...props}
        max={1}
        accept={ACCEPT_EXCEL_FILE}
        title={"Click or drag file to this area to upload"}
        description="Upload excel file"
      />
    </ModalForm>
  );
};

export default ImportQuestionModal;
