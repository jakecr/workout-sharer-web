import React from 'react'

const InputSmall = ({ name, type, value, onChange, autoFocus = false }) => (
    <input 
        autoFocus={autoFocus} 
        type={type} 
        name={name.toLowerCase()}
        className='input input--small'
        placeholder={name} 
        required 
        onChange={onChange} 
        value={value} 
    />
)

export default InputSmall