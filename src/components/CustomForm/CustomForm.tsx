import type { FormProps } from 'antd';
import { Form } from 'antd';
import classNames from 'classnames';
import type { FC, ReactNode } from 'react';
import './CustomForm.less';

interface CustomFormProps extends FormProps {
  children: ReactNode
}

const CustomForm: FC<CustomFormProps> = (props) => {
  const { layout, children, size, className } = props;

  return (
    <Form
      {...props}
      colon={false}
      layout={layout ?? 'vertical'}
      size={size ?? 'large'}
      className={classNames('custom-form', className)}
    >
      {children}
    </Form>
  );
};

export default CustomForm;
