import React from 'react'

const Input = ({ name, type, value, onChange, autoFocus = false, list = null }) => (
    <div className='input--group'>
        {
            list
                ? <input 
                    list='exercises'
                    autoFocus={autoFocus} 
                    type={type} 
                    name={name.toLowerCase()}
                    className='input'
                    placeholder={name} 
                    required 
                    onChange={onChange} 
                    value={value} 
                />
                : <input 
                    autoFocus={autoFocus} 
                    type={type} 
                    name={name.toLowerCase()}
                    className='input'
                    placeholder={name} 
                    required 
                    onChange={onChange} 
                    value={value} 
                />
        }
        <label 
            htmlFor={name.toLowerCase()} 
            className='input--label'
        >
            {name}
        </label>
    </div>
)

export default Input