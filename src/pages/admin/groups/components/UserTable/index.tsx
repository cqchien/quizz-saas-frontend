import ButtonAdd from '@/components/ButtonAdd/ButtonAdd';
import ButtonDownload from '@/components/ButtonDownload/ButtonDownload';
import CustomSpace from '@/components/CustomSpace/CustomSpace';
import CustomTable from '@/components/CutomTable/CustomTable';
import { uploadMember } from '@/services/group';
import { sortString } from '@/utils/utils';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Upload } from 'antd';
import Title from 'antd/es/typography/Title';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import './style.less';

interface UserTableProps {
  loading?: boolean;
  data: any;
  onRemove: (email: string) => void;
  onImport: (data: any) => void;
}

const UserTable: FC<UserTableProps> = ({ loading, data, onRemove, onImport }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState(data);
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const filtered = data?.filter((item: any) =>
        item.name?.toLowerCase().includes(searchTerm.toLowerCase()) || item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ,
      );

      setUsers(filtered);
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, data]);

  const onSearch = (event: any) => {
    const keyword = event?.target?.value ?? '';
    setSearchTerm(keyword);
  };

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) =>
        sortString(a.name, b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a: any, b: any) =>
        sortString(a.email, b.email),
    },
    {
      title: '',
      dataIndex: 'operation',
      width: 120,
      render: (_: any, record: any) => {
        return (
          <Button size="small" type="link" onClick={() => onRemove(record.email)}>
            Remove
          </Button>
        );
      },
    },
  ];

  const resetData = () => {
    setFileList([]);
  };

  const onUploadChange = (files: any) => {
    resetData();
    if (files) {
      setFileList(files);
    }
  };

  const handleUpload = async () => {
    if (!fileList.length) return;

    const formData = new FormData();

    fileList.forEach((file: any) => {
      formData.append('file', file.originFileObj);
    });

    setUploading(true);
    const res: any = await uploadMember(formData);
    setUploading(false);
    onImport(res);

    if (fileList?.length) {
      setFileList([]);
    }
  };

  return (
    <CustomSpace size={16} direction="vertical" className="user-list">
      <div className="user-list--header">
        <Title className="user-list--title" level={3}>
          Members
        </Title>
        <Space>
          <Input
            allowClear
            placeholder="Search"
            size="middle"
            prefix={<SearchOutlined />}
            onChange={onSearch}
          />
          <Upload
            showUploadList={false}
            multiple={false}
            accept=".xlsx"
            onChange={(files: any) => onUploadChange(files.fileList)}
            customRequest={handleUpload}
            fileList={fileList}
          >
            <ButtonAdd ghost size="middle" onClick={onImport} loading={uploading}>
              Bulk Import
            </ButtonAdd>
          </Upload>
          <ButtonDownload
            download
            target="_blank"
            href={'/group-template.xlsx'}
            size="middle"
            type="link"
            title="Download template"
          />
        </Space>
      </div>

      <CustomTable
        rowKey="email"
        loading={loading || uploading}
        scroll={{ x: 'max-content' }}
        pagination={false}
        dataSource={users}
        columns={columns}
      />
    </CustomSpace>
  );
};

export default UserTable;
