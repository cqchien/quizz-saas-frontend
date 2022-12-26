import type { DatePickerProps, FormItemProps, InputNumberProps, InputProps } from 'antd';
import { Form, Input, InputNumber, Select } from 'antd';
import type { TextAreaProps } from 'antd/es/input';
import type { FC, ReactNode } from 'react';
import { Controller } from 'react-hook-form';

const { TextArea } = Input;

interface FItemProps extends FormItemProps {
  name: string;
}

export type TypeSelection =
  | 'input'
  | 'select'
  | 'selectOriginal'
  | 'textarea'
  | 'number';

export interface CustomFormFieldProps {
  controllerProps?: any;
  formItemProps: FItemProps;
  inputProps?: InputProps | InputNumberProps  | DatePickerProps | TextAreaProps;
  type?: TypeSelection;
  children?: ReactNode;
  showError?: boolean;
}

// @TODO: Implement for Select and other inputs type
const CustomFormField: FC<CustomFormFieldProps> = ({
  controllerProps,
  formItemProps,
  inputProps,
  type = 'input',
  showError = true,
  children,
}) => {
  const { register, errors, ...restControllerProps } = controllerProps;
  const { name, ...restFormItemProps } = formItemProps;
  const { ...restInputProps } = inputProps;

  const renderInput = (field: any) => {
    if (children) return children;
    const defaultSize = 'middle';

    switch (type) {
      case 'selectOriginal':
        return (
          <Select
            {...(register ? register(name) : {})}
            {...field}
            {...restInputProps}
            size={defaultSize}
          />
        );
      case 'textarea':
        return <TextArea {...(register ? register(name) : {})} {...field} {...restInputProps} size={defaultSize} />;
      case 'number':
        return <InputNumber {...(register ? register(name) : {})} {...field} {...restInputProps} size={defaultSize} />;
      default:
        return (
          <Input
            {...(register ? register(name) : {})}
            {...field}
            {...restInputProps}
            autoComplete="new-password"
            size={defaultSize}
          />
        );
    }
  };

  return (
    <Form.Item
      {...restFormItemProps}
      name={name}
      validateStatus={errors?.[name] ? 'error' : 'success'}
      help={showError && (errors?.[name]?.message ?? '')}
    >
      <Controller {...restControllerProps} name={name} render={({ field }) => renderInput(field)} />
    </Form.Item>
  );
};

export default CustomFormField;
