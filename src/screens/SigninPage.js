import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { GoLock } from 'react-icons/go'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import IconInput from '../components/IconInput'

const SigninPage = () => {
    const { state, clearErrorMessage, signin } = useContext(AuthContext)
    const { state: color, checkIfLoggedIn } = useContext(PrepContext)

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    useEffect(() => {
        if(color.isLoggedIn !== false) {
            checkIfLoggedIn()
        }
        clearErrorMessage()
    }, [])

    return (
        <div>
            <title>Signin - Workout Sharer</title>
        
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <div 
                    className='form form--skinny' 
                    style={{ 
                        backgroundColor: color.secondary, 
                        border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                    }}
                >
                    {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                    <form 
                        autoComplete="off" 
                        onSubmit={(e) => {
                            e.preventDefault()
                            signin({ email, password })
                        }}
                    >
                        <div className='u-center'>
                            <IconInput
                                Icon={AiOutlineMail}
                                autoFocus={true} 
                                type='email' 
                                value={email} 
                                name='Email' 
                                onChange={(e) => setEmail(e.target.value)} 
                            />
                        </div>

                        <div className='u-center'>
                            <IconInput
                                Icon={GoLock}
                                type='password' 
                                value={password} 
                                name='Password' 
                                onChange={(e) => setPassword(e.target.value)} 
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
                                Signin
                            </button>
                        </div>
                    </form>

                    <div className='u-center'>
                        <Link 
                            className='link' 
                            to='/signup' 
                            style={{ 
                                color: color.tertiary, 
                                borderBottom: '1px solid ' + color.tertiary 
                            }}
                        >
                            Signup
                        </Link>
                    </div>

                    <div className='u-center'>
                        <Link 
                            className='link' 
                            to='/change-password' 
                            style={{ 
                                color: color.tertiary, 
                                borderBottom: '1px solid ' + color.tertiary 
                            }}
                        >
                            Forgot password
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

export default SigninPage