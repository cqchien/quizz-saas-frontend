import { UploadOutlined, InboxOutlined } from '@ant-design/icons';
import { ModalForm, ProCard } from '@ant-design/pro-components';
import { Button, message, Space, Upload } from 'antd';
import Dragger from 'antd/lib/upload/Dragger';
import React from 'react';
import { FormattedMessage } from 'umi';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ImportQuestionModal: React.FC = () => {
  const sheetDatas: API.SheetData[] = [
    {
      category: 'Question',
      data: [
        {
          id: '0',
          question: 'Quốc gia nào có dân số lớn thứ hai trên thế giới?',
          type: 'FIB',
          heuristicLevel: 'KNOWLEDGE',
          status: 'PENDING',
          level: 6,
          topic: 'Quốc Gia',
          tags: "'Địa Lý', 'Quốc Gia', 'Dân Số'",
          language: 'vi-VN',
          isPrivate: false,
          updatedAt: new Date(),
          createdAt: new Date(),
        },
      ],
    },
    {
      category: 'Options',
      data: [{ order: 0, option: 'Việt Nam', value: false, questionId: '0' }],
    },
  ];

  const waitTime = (time: number = 100) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };

  const props = {
    name: 'file',
    beforeUpload: (file: any) => {
      const isExcel =
        file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
      if (!isExcel) {
        message.error(`${file.name} is not a excel file`);
      }
      return isExcel ? true : Upload.LIST_IGNORE;
    },

    onChange(info: any) {
      console.log(info.fileList);
    },

    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  const handleDownLoadTemplate = () => {
    const workBook: XLSX.WorkBook = {
      Sheets: {},
      SheetNames: [],
    };

    sheetDatas.map((item) => {
      item.json = XLSX.utils.json_to_sheet(item.data);
    });

    sheetDatas.map((item) => {
      return (workBook.Sheets[item.category] = item.json), workBook.SheetNames.push(item.category);
    });

    const excelBuffer = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'xlsx' });

    FileSaver.saveAs(data, 'ImportQuestionTemplate' + '.xlsx');
  };

  return (
    <ModalForm<{
      name: string;
      company: string;
    }>
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
        onCancel: () => console.log('run'),
        okText: 'Submit',
        cancelText: 'Cancel',
      }}
      submitTimeout={2000}
      onFinish={async (values) => {
        await waitTime(2000);
        console.log(values.name);
        message.success(
          <FormattedMessage id="pages.importQuestion.information.importQuestionSuccess" />,
        );
        return true;
      }}
    >
      <ProCard>
        <Space direction="vertical" style={{ width: '100%', justifyContent: 'center' }}>
          <Dragger {...props} maxCount={1} multiple={false}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              <FormattedMessage id="pages.importQuestion.dragger.draggerText" />
            </p>
            <p className="ant-upload-hint">
              <FormattedMessage id="pages.importQuestion.dragger.draggerHint" />
            </p>
          </Dragger>
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'center' }}>
            <a type="primary" onClick={handleDownLoadTemplate}>
              <FormattedMessage id="pages.importQuestion.dragger.downloadTemplate.downloadTemplateText" />
            </a>
          </Space>
        </Space>
      </ProCard>
    </ModalForm>
  );
};

export default ImportQuestionModal;
