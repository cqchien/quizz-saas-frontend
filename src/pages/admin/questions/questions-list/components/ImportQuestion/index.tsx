import ButtonDownload from '@/components/ButtonDownload/ButtonDownload';
import { ACCEPT_EXCEL_FILE } from '@/utils/constant';
import { download } from '@/utils/utils';
import { UploadOutlined } from '@ant-design/icons';
import { ModalForm, ProFormUploadDragger } from '@ant-design/pro-components';
import type { UploadProps } from 'antd';
import { Button, message, Space, Upload } from 'antd';
import React from 'react';
import { FormattedMessage } from 'umi';

interface IImportQuestionsModal {
  handleImport: any;
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

  const onDownLoadTemplate = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    download('/template-import-questions.xlsx');
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
        <ButtonDownload
          download
          style={{ padding: 0 }}
          size="small"
          type="link"
          onClick={onDownLoadTemplate}
        >
          <FormattedMessage id="pages.importQuestion.dragger.downloadTemplate.downloadTemplateText" />
        </ButtonDownload>
      </Space>
      <ProFormUploadDragger
        {...props}
        max={1}
        accept={ACCEPT_EXCEL_FILE}
        title={<FormattedMessage id="component.modal.importQuestionModal.title" />}
        description={<FormattedMessage id="component.modal.importQuestionModal.description" />}
      />
    </ModalForm>
  );
};

export default ImportQuestionModal;
