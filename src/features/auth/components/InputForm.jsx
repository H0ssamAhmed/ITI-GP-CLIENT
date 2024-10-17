import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const InputForm = ({ label, type, placeholder, error, register, options }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4 ">
      <label className="block text-gray-700 text-2xl font-bold mb-2 text-right">
        {label}
      </label>
      <div className="relative w-full ">
        {type === 'select' ? (
          <select
            {...register}
            className={`shadow text-right appearance-none border rounded-xl w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              error ? 'border-red-500' : ''
            }`}
          >
            <option value="">{placeholder}</option>
            {options &&
              options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        ) : (
          <>
            <input
              type={type === 'password' && showPassword ? 'text' : type}
              placeholder={placeholder}
              {...register}
              className={`shadow text-right appearance-none border rounded-xl w-[100%] p-4   text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                error ? 'border-red-500' : ''
              }`}
            />
            {type === 'password' && (
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 left-3 flex items-center cursor-pointer"
              >
                {showPassword ? (
                  <FaEyeSlash className="h-18 w-8 text-gray-500" />
                ) : (
                  <FaEye className="h-8 w-8 text-gray-500" />
                )}
              </span>
            )}
          </>
        )}
      </div>
      {error && (
        <p className="text-red-500 text-xl mt-2 text-right">{error.message}</p>
      )}
    </div>
  );
};

export default InputForm;
