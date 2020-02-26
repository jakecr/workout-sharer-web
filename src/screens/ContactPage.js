import React, { useEffect, useContext, useState } from 'react'
import { AiOutlineMail } from 'react-icons/ai'
import { FaEnvelopeOpenText } from 'react-icons/fa'
import { MdTextFormat } from 'react-icons/md'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'
import IconInput from '../components/IconInput'

const ContactPage = () => {
    const { state, clearErrorMessage, clearHasEmailed, sendMeEmail } = useContext(AuthContext)
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    const [ content, setContent ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ subject, setSubject ] = useState('')

    useEffect(() => {
        if(!color.isLoggedIn) {
            checkIfNotLoggedIn()
        }
        clearErrorMessage()
        clearHasEmailed()
    }, [])

    return (
        <div>
            <title>Contact - Workout Sharer</title>
        
            <datalist id='subject-options'>
                <option value='Site issue' />
                <option value='Recommendation' />
                <option value='Question' />
                <option value='Proposal' />
            </datalist>

            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />

                <div className='form__container'>
                    <div 
                        className='form u-width-tiny' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            border: color.isSimple 
                                ? color.theme == 'dark' 
                                    ? '2px solid #28282a' 
                                    : '2px solid rgb(244,244,244)'
                                : 'none',
                            borderTop: color.isSimple 
                                ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(244,244,244)' 
                                : '2px solid ' + color.tertiary, 
                            borderBottom: color.isSimple 
                                ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(244,244,244)' 
                                : '2px solid ' + color.tertiary 
                        }}
                    >
                        {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                        {
                            state.hasEmailed 
                            ? <p 
                                className='helpful-message' 
                                style={{ color: color.contrast }}
                            >
                                Thank you for the email! I will get back to you as soon as possible!!!
                            </p>
                            : <p 
                                className='helpful-message' 
                                style={{ color: color.contrast }}
                            >
                                Before you ask a question check the 'ABOUT' page, or if it's related to making plans check the 'HELP' section in the plan creation page.
                            </p>
                        }

                        <form 
                            autoComplete="off" 
                            onSubmit={(e) => {
                                e.preventDefault()
                                sendMeEmail({ email, subject, content })
                            }}
                        >
                            <div className='u-center'>
                                <IconInput
                                    Icon={AiOutlineMail}
                                    autoFocus={true} 
                                    type='email' 
                                    value={email} 
                                    name='Your email' 
                                    onChange={(e) => setEmail(e.target.value)} 
                                />
                            </div>

                            <div className='u-center'>
                                <IconInput
                                    list='subject-options'
                                    Icon={MdTextFormat}
                                    type='text' 
                                    value={subject} 
                                    name='Subject' 
                                    onChange={(e) => setSubject(e.target.value)} 
                                />
                            </div>

                            <div className='u-center'>
                                <IconInput
                                    Icon={FaEnvelopeOpenText}
                                    type='text' 
                                    value={content} 
                                    name='Content' 
                                    onChange={(e) => setContent(e.target.value)} 
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
                                    Send email &rarr;
                                </button>
                            </div>
                        </form>
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

export default ContactPage