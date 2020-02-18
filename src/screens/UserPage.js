import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const UserPage = () => {
    const { state, clearErrorMessage, getUser } = useContext(AuthContext)
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    useEffect(() => { 
        if(!color.isLoggedIn) {
            checkIfNotLoggedIn()
        }
        clearErrorMessage()
        getUser()
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            {state.user ? <title>{state.user.username} - Workout Sharer</title> : <title>User Page - Workout Sharer</title>}
        
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />
                
                <div className='form__container u-margin-top-medium'>
                    <div 
                        className='form u-width-large' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                        }}
                    >
                        {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}

                        {
                            
                            <div className='u-center'>
                                {state.user
                                && <div className='plan__group plan__group--top'>
                                    <h1 
                                        className='form__header' 
                                        style={{ color: color.contrast }}
                                    >
                                        Plans they made:
                                    </h1>

                                    <h3 
                                        className='form__header' 
                                        style={{ color: '#777' }}
                                    >
                                        Their username: {state.user.username}
                                    </h3>
                                    <h3 
                                        className='form__header' 
                                        style={{ color: '#777' }}
                                    >
                                        Their credit: {state.user.credit}
                                    </h3>
                                </div>}

                                <div className='plan__group'>
                                    {
                                        state.usersMadePlans.length !== 0
                                        ? <div className='u-center'>
                                            <h1 
                                                className='form__header' 
                                                style={{ color: color.contrast }}
                                            >
                                                Plans they made:
                                            </h1>

                                            {state.usersMadePlans.map((planItem, planIndex) => {
                                                return (
                                                    <div 
                                                        key={planIndex} 
                                                        className='plan__container'
                                                    >
                                                        <div 
                                                            className='plan__box u-margin-top-small' 
                                                            style={{ backgroundColor: color.tertiary }}
                                                        >
                                                            <Link to={'/plan?id=' + planItem._id}>
                                                                <h3 className='plan__info'>{planItem.name}</h3>
                                                                <h4 className='plan__info'>Subscribers: {planItem.subscribers}</h4>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        : <h1 style={{ color: color.contrast }}>This user has not made any plans.</h1>
                                    }
                                </div>
                            </div>
                        }
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

export default UserPage