import { DISPATCH_TYPE, SCHEDULE_TYPE } from '@/utils/constant';
import {
  ModalForm,
  ProFormRadio,
  ProFormDependency,
  ProFormGroup,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormDateTimeRangePicker,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import React from 'react';
import { connect, FormattedMessage } from 'umi';
import mapStateToProps from '../../../../admin/groups/mapStateToProps';
import formSchema from '../../schemas/scheduleSchema';

interface Props {
  trigger: any;
  groupList: API.Group[];
  handleScheduleSubmit: any;
  dispatch: any;
  loading: boolean;
}

const ModalAddSchedule: React.FC<Props> = ({
  groupList,
  handleScheduleSubmit,
  dispatch,
  trigger,
}) => {
  const { formField } = formSchema;


  const groupListMap = groupList?.map((x) => {
    return { label: x.name, value: x.id };
  });

  const [formSchedule] = Form.useForm<{
    period: number;
    code: string;
    scheduleType: string;
    startAt: Date;
    endsAt: Date;
    status: string;
    assignedGroup?: string[] | undefined;
    dateRange: string[];
  }>();

  const handleVisibleChange = (value: boolean) => {
    if (value) {
      dispatch({
        type: DISPATCH_TYPE.GROUPS_FETCH,
        payload: { params: {} },
      });
    } else {
      formSchedule.resetFields();
    }
  };

  const disabledDate = (current: any) => {
    const date = new Date();
    return current < date.setDate(date.getDate() - 1);
  };

  return (
    <ModalForm<{
      period: number;
      code: string;
      scheduleType: string;
      startAt: Date;
      endsAt: Date;
      status: string;
      assignedGroup?: string[] | undefined;
      dateRange: string[];
    }>
      key="key"
      form={formSchedule}
      title={<FormattedMessage id="component.form.addSchedule.title" />}
      trigger={trigger}
      autoFocusFirstInput
      onFinish={handleScheduleSubmit}
      modalProps={{ okText: 'Add', cancelText: 'Cancel' }}
      width={'500px'}
      onVisibleChange={handleVisibleChange}
    >
      <ProFormText
        width={'lg'}
        name={formField.code.name}
        label={formField.code.label}
        placeholder={formField.code.placeholder}
        rules={[
          {
            required: formField.code.required,
            message: formField.code.errMsg,
          },
        ]}
      />
      <ProFormRadio.Group
        label={formField.scheduleType.label}
        name={formField.scheduleType.name}
        initialValue={SCHEDULE_TYPE.FIXED}
        options={formField.scheduleType.options}
      />

      <ProFormDependency name={[formField.scheduleType.name]}>
        {({ scheduleType }) => {
          if (scheduleType === SCHEDULE_TYPE.FIXED) {
            return (
              <ProFormGroup>
                <ProFormDateTimePicker
                  name={formField.startAt.name}
                  label={formField.startAt.label}
                  placeholder={formField.startAt.placeholder}
                  rules={[
                    {
                      required: formField.startAt.required,
                      message: formField.startAt.errMsg,
                    },
                  ]}
                  fieldProps={{
                    disabledDate: disabledDate,
                    minuteStep: formField.startAt.minuteStep,
                    format: formField.startAt.format,
                  }}
                />
                <ProFormDigit
                  name={formField.period.name}
                  label={formField.period.label}
                  placeholder={formField.startAt.placeholder}
                  initialValue={formField.period.initialValue}
                  rules={[
                    {
                      required: formField.period.required,
                      message: formField.period.errMsg,
                    },
                  ]}
                />
              </ProFormGroup>
            );
          }
          return (
            <ProFormDateTimeRangePicker
              name={formField.dateRange.name}
              label={formField.dateRange.label}
              placeholder={formField.dateRange.placeholder}
              rules={[
                {
                  required: formField.dateRange.required,
                  message: formField.dateRange.errMsg,
                },
              ]}
              fieldProps={{
                minuteStep: formField.dateRange.minuteStep,
                format: formField.dateRange.format,
              }}
            />
          );
        }}
      </ProFormDependency>
      <ProFormSelect
        width={'lg'}
        options={groupListMap}
        allowClear
        name={formField.assignedGroup?.name}
        label={formField.assignedGroup?.label}
        placeholder={formField.assignedGroup?.placeholder}
      />
    </ModalForm>
  );
};

export default connect(mapStateToProps)(ModalAddSchedule);
