import { useState } from 'react';

type TextAreaProps = {
    label: string;
    name: string;
    placeholder?: string;
    rows?: number;
    required?: boolean;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  };
  
  export default function TextArea({
    label,
    name,
    value,
    placeholder = '',
    rows = 4,
    required = true,
    onChange,
  }: TextAreaProps) {
    // const [value, setValue] = useState('');

    // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   setValue(e.target.value);
    //   onChange?.(e);
    // };

    return (
      <div className="mb-4 w-full">
        <label htmlFor={name} className="block mb-1 text-2xl font-medium text-gray-700">
          {label}
        </label>
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
      </div>
    );
  }
  