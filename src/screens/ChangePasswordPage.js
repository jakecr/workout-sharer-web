import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import IconInput from '../components/IconInput'

const ChangePasswordPage = () => {
    const { state, clearErrorMessage, changePassword } = useContext(AuthContext)
    const { state: color, checkIfLoggedIn } = useContext(PrepContext)

    const [ email, setEmail ] = useState('')

    useEffect(() => {
        if(color.isLoggedIn !== false) {
            checkIfLoggedIn()
        }
        clearErrorMessage()
    }, [])

    return (
        <div>
            <title>Change Password - Workout Sharer</title>
        
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <div 
                    className='form form--skinny' 
                    style={{ 
                        backgroundColor: color.secondary, 
                        border: color.theme == 'dark' ? '2px solid rgb(52,53,54)' : '2px solid rgb(244,244,244)' 
                    }}
                >
                    {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                    <form autoComplete="off" onSubmit={(e) => {
                        e.preventDefault()
                        changePassword({ email })
                    }}>
                        <div className='u-center'>
                            <IconInput 
                                Icon={AiOutlineMail}
                                autoFocus={true} 
                                name='Email' 
                                type='email' 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>
                        
                        <div className='u-center'>
                            <button 
                                className='button button--tertiary' 
                                style={{ 
                                    backgroundColor: color.tertiary, 
                                    borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                }}
                            >
                            Change your password
                            </button>
                        </div>
                    </form>

                    <div className='u-center'>
                        <Link 
                            className='link' 
                            to='/signin' 
                            style={{ 
                                color: color.tertiary, 
                                borderBottom: '1px solid ' + color.tertiary 
                            }}
                        >
                            Signin
                        </Link>
                    </div>
                </div>
            </div>

            <Footer 
                colorPrimary={color.primary}
                colorTertiary={color.tertiary}
                colorContrast={color.contrast}
                theme={color.theme}
            />
        </div>
    )
}

export default ChangePasswordPage