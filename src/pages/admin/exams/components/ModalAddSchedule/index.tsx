import {
  ModalForm,
  ProFormRadio,
  ProFormDependency,
  ProFormGroup,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormDateTimeRangePicker,
  ProFormSelect,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import React from 'react';
import { connect } from 'umi';
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

  const handleVisibleChange = (value: boolean) => {
    if (value) {
      dispatch({
        type: 'groups/fetch',
        payload: { params: {} },
      });
    }
  };

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

  const disabledDate = (current: any) => {
    return current < new Date();
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
      title="New schedule"
      trigger={trigger}
      autoFocusFirstInput
      submitTimeout={2000}
      onFinish={handleScheduleSubmit}
      modalProps={{ okText: 'Add', cancelText: 'Cancel' }}
      width={'500px'}
      onVisibleChange={handleVisibleChange}
    >
      <ProFormRadio.Group
        label={formField.scheduleType.label}
        name={formField.scheduleType.name}
        initialValue="Fixed"
        options={formField.scheduleType.options}
      />

      <ProFormDependency name={[formField.scheduleType.name]}>
        {({ scheduleType }) => {
          if (scheduleType === 'Fixed') {
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
        name={formField.assignedGroup.name}
        label={formField.assignedGroup.label}
        placeholder={formField.assignedGroup.placeholder}
        rules={[
          {
            required: formField.assignedGroup.required,
            message: formField.assignedGroup.errMsg,
          },
        ]}
      />
    </ModalForm>
  );
};

export default connect(mapStateToProps)(ModalAddSchedule);
