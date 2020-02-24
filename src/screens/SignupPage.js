import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { GoLock } from 'react-icons/go'
import { FaRegUser } from 'react-icons/fa'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import IconInput from '../components/IconInput'

const SignupPage = () => {
    const { state, clearErrorMessage, signup } = useContext(AuthContext)
    const { state: color, checkIfLoggedIn } = useContext(PrepContext)
    
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ verifyPassword, setVerifyPassword ] = useState('')

    useEffect(() => {
        if(color.isLoggedIn !== false) {
            checkIfLoggedIn()
        }
        clearErrorMessage()
    }, [])

    return (
        <div>
            <title>Signup - Workout Sharer</title>
        
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <div 
                    className='form form--skinny' 
                    style={{ 
                        backgroundColor: color.secondary, 
                        border: color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(244,244,244)' 
                    }}
                >
                    {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}
                    <form 
                        autoComplete="off" 
                        onSubmit={(e) => {
                            e.preventDefault()
                            signup({ username, email, password, verifyPassword })
                        }}
                    >
                        <div className='u-center'>
                            <IconInput 
                                Icon={FaRegUser}
                                type='text' 
                                value={username} 
                                name='Username' 
                                autoFocus={true} 
                                onChange={(e) => setUsername(e.target.value)} 
                            />
                        </div>

                        <div className='u-center'>
                            <IconInput 
                                Icon={AiOutlineMail}
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
                            <IconInput 
                                Icon={GoLock}
                                type='password' 
                                value={verifyPassword} 
                                name='Verify password' 
                                onChange={(e) => setVerifyPassword(e.target.value)} 
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
                                Signup
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

export default SignupPage