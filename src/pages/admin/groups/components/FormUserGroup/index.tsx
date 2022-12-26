import ButtonAdd from '@/components/ButtonAdd/ButtonAdd';
import ButtonLong from '@/components/ButtonLong/ButtonLong';
import CustomDivider from '@/components/CustomDivider';
import CustomForm from '@/components/CustomForm/CustomForm';
import CustomFormField from '@/components/CustomFormField/CustomFormField';
import CustomSpace from '@/components/CustomSpace/CustomSpace';
import { DISPATCH_TYPE } from '@/utils/constant';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Col, Row } from 'antd';
import Title from 'antd/es/typography/Title';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useDispatch, useHistory, useSelector } from 'umi';
import * as yup from 'yup';
import UserTable from '../UserTable';
import './style.less';

const memberSchema = yup.object().shape({
  name: yup.string(),
  email: yup.string(),
});

const schema = yup.object().shape({
  name: yup.string().required('Group Name is a required field'),
  description: yup.string(),
  memberName: yup.string(),
  email: yup.string(),
  members: yup.array(memberSchema).min(1, 'Memember is required field'),
});

const defaultData = {
  name: '',
  description: '',
  email: '',
  memberName: '',
  members: [],
};

interface FormUserGroupProps {
  group?: API.Group;
}

const FormUserGroup: FC<FormUserGroupProps> = ({ group }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const loading = useSelector(
    (state: any) => state.loading?.effects[DISPATCH_TYPE.GROUPS_CREATE],
  );

  const editing = useSelector((state: any) => state.loading?.effects[DISPATCH_TYPE.GROUPS_UPDATE]);

  const [members, setMembers] = useState<any>(group?.members ?? []);
  const [isEdit, setIsEdit] = useState(false);

  const {
    handleSubmit,
    control,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
  });

  const watchGroupName = watch('name', '');
  const watchDescription = watch('description', '');
  const watchMemberName = watch('memberName', '');
  const watchEmail = watch('email', '');

  useEffect(() => {
    reset({
      name: group?.name,
      description: group?.description,
      members: group?.members,
    });
    setMembers(group?.members ?? []);
    setIsEdit(group !== undefined);
  }, [group, reset]);

  useEffect(() => {
    setValue('members', members);
  }, [members, setValue]);

  const onAddUser = () => {
    const newUser = {
      name: getValues('memberName'),
      email: getValues('email'),
    };
    setMembers([...members, newUser]);
    reset({ ...defaultData, name: watchGroupName, description: watchDescription });
  };

  const onHandleGroup = () => {
    if (loading) return;
    const body = { name: watchGroupName, description: watchDescription, members };


    if (isEdit) {
      dispatch({
        type: DISPATCH_TYPE.GROUPS_UPDATE,
        payload: {
          group: body,
          groupId: group?.id,
          callback: () => history.push('/groups/list'),
        }
      });
    } else {
      dispatch({
        type: DISPATCH_TYPE.GROUPS_CREATE,
        payload: {
          group: body,
          callback: () => history.push('/groups/list'),
        }
      })

    }
  };

  const onRemoveTarget = (email: string) => {
    const newmembers = members.filter((target: { email: string; }) => target.email !== email);
    setMembers(newmembers);
  };

  const onImport = async (data: any) => {
    if (Array.isArray(data)) {
      setMembers([...members, ...data]);
    }
  };

  return (
    <div className="form-user-group">
      <CustomForm className="form-user-group--form">
        <Row gutter={40}>
          <Col sm={24} lg={12}>
            <CustomFormField
              controllerProps={{
                control,
                errors,
                initialValues: '',
              }}
              formItemProps={{
                name: 'name',
                label: 'Name',
                rules: [{ required: true }],
              }}
              inputProps={{
                placeholder: 'Enter Group Name',
              }}
            />
          </Col>
          <Col sm={24} lg={12}>
            <CustomFormField
              controllerProps={{
                control,
                errors,
                initialValues: '',
              }}
              formItemProps={{
                name: 'description',
                label: 'Description',
                rules: [{ required: false }],
              }}
              inputProps={{
                placeholder: 'Enter Group Description',
              }}
            />
          </Col>
        </Row>

        <Title level={3} style={{ margin: 0 }}>
          Add Member
        </Title>
        <CustomDivider size="sm" />

        <Row gutter={40}>
          <Col sm={24} lg={12}>
            <CustomFormField
              controllerProps={{
                control,
                errors,
                initialValues: '',
              }}
              formItemProps={{
                name: 'memberName',
                label: 'Full Name',
                rules: [{ required: true }],
              }}
              inputProps={{
                placeholder: 'Enter User Full Name',
              }}
            />
          </Col>
          <Col sm={24} lg={12}>
            <CustomFormField
              controllerProps={{
                control,
                errors,
                initialValues: '',
              }}
              formItemProps={{
                name: 'email',
                label: 'Email',
                rules: [{ required: true }],
              }}
              inputProps={{
                placeholder: 'Enter User Email',
              }}
            />
          </Col>

          <Col sm={24} lg={12}>
            <ButtonAdd ghost disabled={!watchMemberName || !watchEmail} onClick={onAddUser}>
              Add
            </ButtonAdd>
          </Col>
        </Row>
        <CustomFormField
          controllerProps={{
            control,
            errors,
            initialValues: members,
          }}
          formItemProps={{
            name: 'members',
            label: '',
            rules: [{ required: true }],
          }}
        >
          <UserTable data={members} onRemove={onRemoveTarget} onImport={onImport} />
        </CustomFormField>
        <CustomSpace fullWidth align="end" justify="center">
          <Link to={`/groups/list`}>
            <ButtonLong ghost disabled={loading || editing}>
              Cancel
            </ButtonLong>
          </Link>
          <ButtonLong
            type="primary"
            disabled={!watchGroupName || (!members.length && !isEdit)}
            onClick={handleSubmit(onHandleGroup)}
            loading={loading || editing}
          >
            Save
          </ButtonLong>
        </CustomSpace>
      </CustomForm>
    </div>
  );
};

export default FormUserGroup;
