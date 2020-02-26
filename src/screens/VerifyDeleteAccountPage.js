import React, { useState, useContext, useEffect } from 'react'
import { IoMdKey } from 'react-icons/io'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IconInput from '../components/IconInput'

const VerifyDeleteAccountPage = () => {
    const { state, clearErrorMessage, deleteAccount, verifydeleteAccount } = useContext(AuthContext)
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    const [ code, setCode ] = useState('')

    useEffect(() => {
        if(color.isLoggedIn !== true) {
            checkIfNotLoggedIn()
        }
        clearErrorMessage()
        deleteAccount()
    }, [])

    return (
        <div>
            <title>Verify Delete Account - Workout Sharer</title>

            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />
                
                <div 
                    className='form form--skinny' 
                    style={{ 
                        backgroundColor: color.secondary, 
                        borderTop: color.isSimple 
                            ? color.theme == 'dark' 
                                ? '2px solid #28282a' 
                                : '2px solid rgb(229, 229, 229)' 
                            : '2px solid ' + color.tertiary, 
                        borderBottom: color.isSimple 
                            ? color.theme == 'dark' 
                                ? '2px solid #28282a' 
                                : '2px solid rgb(229, 229, 229)' 
                            : '2px solid ' + color.tertiary
                    }}
                >
                    {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                    <form 
                        autoComplete="off" 
                        onSubmit={(e) => {
                            e.preventDefault()
                            verifydeleteAccount({ code })
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
                                Delete account
                            </button>
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

export default VerifyDeleteAccountPage