import React from 'react'

const Input = ({ name, type, value, onChange, autoFocus = false, background }) => (
    <div className='input--group'>
        <input 
            autoFocus={autoFocus} 
            type={type} 
            name={name.toLowerCase()}
            className={background == 'transparent' ? 'input input--transparent' : 'input'}
            placeholder={name} 
            required 
            onChange={onChange} 
            value={value} 
        />
        <label 
            htmlFor={name.toLowerCase()} 
            className='input--label'
        >
            {name}
        </label>
    </div>
)

export default Input