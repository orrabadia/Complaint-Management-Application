import { useState } from 'react';

type TextAreaProps = {
    label: string;
    name: string;
    placeholder?: string;
    rows?: number;
    required?: boolean;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    constraints?: string;
    maxLength?: number;
  };
  
  export default function TextArea({
    label,
    name,
    value,
    placeholder = '',
    rows = 4,
    required = true,
    onChange,
    constraints,
    maxLength = 1000,
  }: TextAreaProps) {


    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block mb-1 text-2xl font-medium text-gray-700">
          {label}
        </label>
        <p className='block mb-1.5 text-sm font-medium text-gray-700'>{constraints}</p>
        <textarea
          id={name}
          name={name}
          rows={rows}
          value={value}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          className="w-full px-4 py-2 border text-xl rounded-md shadow-sm outline-none transition border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
        <div className="text-right text-sm text-gray-500 mt-1">
          {value.length} / {maxLength} characters
        </div>
      </div>
    );
  }
  