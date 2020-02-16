import React from 'react'

const Select = ({ name, value, onChange, children }) => (
    <div className='input--group'>
        <select 
            name={name.toLowerCase()}
            className='select'
            placeholder={name} 
            required 
            onChange={onChange} 
            value={value} 
        >
            {children}
        </select>
        <label 
            htmlFor={name.toLowerCase()} 
            className='select--label'
        >
            {name}
        </label>
    </div>
)

export default Select