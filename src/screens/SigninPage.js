import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaRegUser } from 'react-icons/fa'
import { GoLock } from 'react-icons/go'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import IconInput from '../components/IconInput'

const SigninPage = () => {
    const { state, clearErrorMessage, signin } = useContext(AuthContext)
    const { state: color, checkIfLoggedIn } = useContext(PrepContext)

    const [ account, setAccount ] = useState('')
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
                        borderTop: color.isSimple 
                            ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                            : '2px solid ' + color.tertiary, 
                        borderBottom: color.isSimple 
                            ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                            : '2px solid ' + color.tertiary 
                    }}
                >
                    {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                    <form 
                        autoComplete="off" 
                        onSubmit={(e) => {
                            e.preventDefault()
                            signin({ account, password })
                        }}
                    >
                        <div className='u-center'>
                            <IconInput
                                Icon={FaRegUser}
                                autoFocus={true} 
                                type='text' 
                                value={account} 
                                name='Email or username' 
                                onChange={(e) => setAccount(e.target.value)} 
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