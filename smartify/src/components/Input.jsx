import React from 'react';

const Input = ({ type = "text", placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value} 
      onChange={onChange}
      className='w-full rounded-[15px] h-[40px] p-6 font-semibold border-[2px] text-[16px] border-[#b3afaf]'
    />
  );
}

export default Input;
