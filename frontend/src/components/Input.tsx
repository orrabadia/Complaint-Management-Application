import { useState } from 'react';

type Props = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  pattern?: string;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tooltip?: string;
  value?: string,
  constraints?: string
};

export default function Input({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  pattern,
  value='',
  onChange,
  tooltip,
  constraints,
}: Props) {
  const [touched, setTouched] = useState(false);

  const isValid =
    !required || (value.trim() !== '' && (!pattern || new RegExp(pattern).test(value)));


  return (
    <div className="mb-4 w-full">
      <label htmlFor={name} className="block mb-1 text-2xl font-medium text-gray-700">
        {label}
      </label>
      <p className='block mb-1.5 text-sm font-medium text-gray-700'>{constraints}</p>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={() => setTouched(true)}
        required={required}
        pattern={pattern}
        title={tooltip}
        className={`w-full px-4 py-2 border text-xl rounded-md shadow-sm outline-none transition
          ${touched && !isValid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}
          focus:ring-2`}
      />

    </div>
  );
}
