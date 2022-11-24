import React, { FC, useState } from 'react';
import './Form.scss';
import { Button } from '../UI/Button';

type FormProps = {
  children: React.ReactNode;
  submitText: string;
  onSubmit: () => void;
}

export const Form: FC<FormProps> = ({ children, onSubmit, submitText }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      onSubmit();
      setLoading(false);
    }, 2000);
  };

  return (
    <form className='form' onSubmit={handleSubmit}>
      {children}
      <div className='form__footer'>
        <Button type='submit' loading={loading}>{submitText}</Button>
      </div>
    </form>
  );
};