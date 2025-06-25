import React from 'react'

export default function Input({type="type", placeholder="placeholder" , onChange , value }) {
  return (
    <div>
      <input 
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className=' rounded p-2 md:w-[18vw] w-[100%] md:h-fit h-[5vh] border-black bg-gray-300 m-1' />
    </div>
  )
}
