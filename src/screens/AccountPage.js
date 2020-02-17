import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Switch from 'react-switch'
import { Context as AuthContext } from '../context/AuthContext'
import { Context as PlanContext } from '../context/PlanContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AccountPage = () => {
    const { state, clearErrorMessage, getAccount, signout } = useContext(AuthContext)
    const { deletePlan } = useContext(PlanContext)
    const { state: color, changeAccentColor, changeTheme, checkIfNotLoggedIn } = useContext(PrepContext)

    const [ accentColor, setAccentColor ] = useState(localStorage.getItem('accentColor') || 'blue')
    const [ theme, setTheme ] = useState(color.theme)
    const [ showConfirm, setShowConfirm ] = useState(null)

    useEffect(() => {
        if(!color.isLoggedIn) {
            checkIfNotLoggedIn()
        }
        getAccount()
        clearErrorMessage()
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        setTheme(color.theme)
    }, [color.theme !== theme])

    return ( 
        <div>
            {state.username ? <title>{state.username}'s Account - Workout Dealer</title> : <title>Account - Workout Dealer</title>}
        
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
                        className='form u-width-large' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                        }}
                    >
                        {state.errorMessage && <p className='error-message'>{state.errorMessage}</p>}
                        
                        {state.account 
                        && <div className='plan__group'>
                            <h1 
                                className='form__header' 
                                style={{ color: color.contrast }}
                            >
                                Your account:
                            </h1>

                            <h3 
                                className='form__header' 
                                style={{ color: '#777' }}
                            >
                                Username: {state.account.username}
                            </h3>
                            <h3 
                                className='form__header u-margin-bottom-tiny' 
                                style={{ color: '#777' }}
                            >
                                Credit: {state.account.credit}
                            </h3>

                            <form autoComplete="off" onSubmit={(e) => {
                                e.preventDefault()
                                signout()
                            }}>
                                <div className='u-center'>
                                    <button 
                                        className='button button--tertiary' 
                                        style={{ 
                                            backgroundColor: color.tertiary, 
                                            borderBottom: '.4rem solid rgba(0, 0, 0, 0.3)' 
                                        }}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </form>

                            <div className='u-center'>
                                <Link 
                                    className='link' 
                                    to='/verify-delete-account' 
                                    style={{ 
                                        color: color.tertiary, 
                                        borderBottom: '1px solid ' + color.tertiary 
                                    }}
                                >
                                    Delete account
                                </Link>
                            </div>
                        </div>}
                    </div>
                </div>

                <div className='form__container'>
                    <div 
                        className='form u-width-large' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                        }}
                    >
                        <div className='u-center'>
                            <h1 
                                className='form__header' 
                                style={{ color: color.contrast }}
                            >
                                Color settings:
                            </h1>
                        </div>

                        <div className='u-center'>
                            <h3 
                                className='form__header u-margin-bottom-tiny' 
                                style={{ color: '#777' }}
                            >
                                Dark mode:
                            </h3>
                            <Switch 
                                onColor={color.tertiary}
                                offColor='#a01515'
                                onChange={(value) => {
                                    if(value) {
                                        setTheme('dark')
                                        changeTheme({ theme: 'dark' })
                                    }else {
                                        setTheme('light')
                                        changeTheme({ theme: 'light' })
                                    }
                                }} 
                                checked={theme == 'dark'} 
                            />
                        </div>

                        <div className='u-center'>
                            <h3 
                                className='form__header u-margin-bottom-tiny' 
                                style={{ color: '#777' }}
                            >
                                Accent color:
                            </h3>
                            <select 
                                className='select--small u-margin-bottom-small'
                                onChange={(e) => {
                                    setAccentColor(e.target.value)
                                    changeAccentColor({ color: e.target.value })
                                }} 
                                value={accentColor} 
                            >
                                <option value='blue'>Blue</option>
                                <option value='green'>Green</option>
                                <option value='pink'>Pink</option>
                                <option value='purple'>Purple</option>
                                <option value='red'>Red</option>
                                <option value='orange'>Orange</option>
                                <option value='teal'>Teal</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className='form__container'>
                    <div 
                        className='form u-width-large' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                        }}
                    >
                        {state.madePlans.length !== 0
                        && <div className='u-center plan__group'>
                            <h1 
                                className='form__header' 
                                style={{ color: color.contrast }}
                            >
                                Plans you made:
                            </h1>

                            {state.madePlans.map((planItem, planIndex) => {
                                return (
                                    <div key={planIndex} className='plan__container'>
                                        {
                                            showConfirm == planIndex
                                            ? <div 
                                                className='confirm' 
                                                style={{ backgroundColor: color.tertiary }}
                                            >
                                                <h3 className='confirm--question'>Are you sure you want to delete this plan?</h3>

                                                <div className='confirm__options'>
                                                    <form autoComplete="off" onSubmit={(e) => {
                                                        e.preventDefault()
                                                        deletePlan({ id: planItem._id })
                                                        getAccount()
                                                        setShowConfirm(null)
                                                    }}>
                                                        <button type="submit" className='clear-defaults'>
                                                            <div className='confirm__options--yes'>
                                                                Yes
                                                            </div>
                                                        </button>
                                                    </form>
                                                    
                                                    <button 
                                                        type='button' 
                                                        className='clear-defaults' 
                                                        onClick={() => setShowConfirm(null)}
                                                    >
                                                        <div className='confirm__options--no'>
                                                            No
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                            : <div>
                                                <div 
                                                    className='plan__box u-margin-top-small' 
                                                    style={{ backgroundColor: color.tertiary }}
                                                >
                                                    <Link to={'/plan?id=' + planItem._id}>
                                                        <h3 className='plan__info'>{planItem.name}</h3>
                                                        <h4 className='plan__info'>Subscribers: {planItem.subscribers}</h4>
                                                    </Link>
                                                </div>

                                                <button 
                                                    type='button' 
                                                    className='clear-defaults u-color-red' 
                                                    onClick={() => setShowConfirm(planIndex)}
                                                >
                                                    <strong>Delete plan</strong>
                                                </button>
                                            </div>
                                        }
                                    </div>
                                )
                            })}
                        </div>}

                        <div className='u-center u-margin-top-small'>
                            <Link 
                                className='link' 
                                to='/create-plan' 
                                style={{ 
                                    color: color.tertiary, 
                                    borderBottom: '1px solid ' + color.tertiary 
                                }}
                            >
                                Create a plan of your own
                            </Link>
                        </div>
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

export default AccountPage