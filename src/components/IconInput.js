import React from 'react'

const IconInput = ({ name, type, value, onChange, autoFocus = false, list = null, Icon, required = true }) => (
    <div className='input--group'>
        <Icon className='icon' />
        {
            list
                ? <input 
                    list={list}
                    autoFocus={autoFocus} 
                    type={type} 
                    name={name.toLowerCase()}
                    className='icon__input'
                    placeholder={name} 
                    required={required} 
                    onChange={onChange} 
                    value={value} 
                />
                : <input 
                    autoFocus={autoFocus} 
                    type={type} 
                    name={name.toLowerCase()}
                    className='icon__input'
                    placeholder={name} 
                    required={required} 
                    onChange={onChange} 
                    value={value} 
                />
        }
        <label 
            htmlFor={name.toLowerCase()} 
            className='icon__input--label'
        >
            {name}
        </label>
    </div>
)

export default IconInput