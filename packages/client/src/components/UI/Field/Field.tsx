import React, { FC } from 'react';
import './Field.scss';

type FieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Field: FC<FieldProps> = ({ label, onChange, value, error, ...props }) => {
  return (
    <label className="field">
      <p className="field__label">{label}</p>
      <input className="field__input" {...props} onChange={onChange} value={value}/>
      <span className="field__error">{error}</span>
    </label>
  );
};