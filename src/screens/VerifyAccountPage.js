import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoMdKey } from 'react-icons/io'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import IconInput from '../components/Input'

const VerifyAccountPage = () => {
    const { state, clearErrorMessage, verifyCreateAccount } = useContext(AuthContext)
    const { state: color, checkIfLoggedIn } = useContext(PrepContext)

    const [ code, setCode ] = useState('')

    useEffect(() => {
        if(color.isLoggedIn !== false) {
            checkIfLoggedIn()
        }
        clearErrorMessage()
    }, [])

    return (
        <div>
            <title>Verify Create Account - Workout Sharer</title>

            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <div 
                    className='form form--skinny' 
                    style={{ 
                        backgroundColor: color.secondary, 
                        border: color.theme == 'dark' ? '2px solid rgb(52,53,54)' : '2px solid rgb(204,204,204)' 
                    }}
                >
                    {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                    <form 
                        autoComplete="off" 
                        onSubmit={(e) => {
                            e.preventDefault()
                            verifyCreateAccount({ code })
                        }}
                    >
                        <div className='u-center'>
                            <IconInput 
                                Icon={IoMdKey}
                                type='text' 
                                value={code} 
                                name='Code' 
                                autoFocus={true} 
                                onChange={(e) => e.target.value.match(/^([0-9]{0,4})$/) && setCode(e.target.value)}
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
                                Create account
                            </button>
                        </div>

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
                    </form>
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

export default VerifyAccountPage