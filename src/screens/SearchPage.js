import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { Context as PlanContext } from '../context/PlanContext'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const SearchPage = () => {
    const { state, clearErrorMessage, clearSearchedPlans, getSearchedPlans } = useContext(PlanContext)
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    const [ organization, setOrganization ] = useState('most')
    const [ searchTerms, setSearchTerms ] = useState('')

    useEffect(() => {
        checkIfNotLoggedIn()
        clearSearchedPlans()
        clearErrorMessage()
    }, [])

    return (
        <div>
            <title>Search Plans - Workout Dealer</title>
            
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
                        className='form u-width-small' 
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
                                getSearchedPlans({ searchTerms, organization })
                            }}
                        >
                            <div className='u-center'>
                                <div className='input--group'>
                                    <button className='clear-defaults'>
                                        <FaSearch className='icon' />
                                    </button>
                                    <input 
                                        autoFocus
                                        type='text'
                                        name='search'
                                        className='icon__input'
                                        placeholder={'Search'} 
                                        required={false} 
                                        onChange={(e) => setSearchTerms(e.target.value)} 
                                        value={searchTerms} 
                                    />
                                </div>
                            </div>
                    
                            <div className='u-center'>
                                <input 
                                    type='radio' 
                                    id='most' 
                                    value='most' 
                                    className='radio-input' 
                                    checked={organization == 'most'} 
                                    onChange={(e) => setOrganization(e.target.value)} 
                                />
                                <label 
                                    htmlFor='most' 
                                    className='radio-label' 
                                    style={{ color: color.contrast }}
                                >
                                    <span 
                                        className={color.theme == 'dark' ? 'radio-button radio-button--light' : 'radio-button radio-button--dark' } 
                                        style={{ border: '.5rem solid ' + color.contrast }}
                                    >
                                    </span>
                                    Most subscribed
                                </label>

                                <input 
                                    type='radio' 
                                    id='least' 
                                    value='least' 
                                    className='radio-input' 
                                    checked={organization == 'least'} 
                                    onChange={(e) => setOrganization(e.target.value)} 
                                />
                                <label 
                                    htmlFor='least' 
                                    className='radio-label u-margin-left' 
                                    style={{ color: color.contrast }}
                                >
                                    <span 
                                        className={color.theme == 'dark' ? 'radio-button radio-button--light' : 'radio-button radio-button--dark' } 
                                        style={{ border: '.5rem solid ' + color.contrast }}
                                    >
                                    </span>
                                    Least subscribed
                                </label>
                            </div>
                        </form>

                        {state.searchedPlans.length !== 0
                        && <div className='u-center u-margin-top-small'>
                            {state.searchedPlans.map((planItem, planIndex) => {
                                return (
                                    <div 
                                        key={planIndex} 
                                        className='u-margin-bottom-tiny'
                                    >
                                        <div 
                                            className='plan__box' 
                                            style={{ backgroundColor: color.tertiary }}
                                        >
                                            <Link to={'/plan?id=' + planItem._id}>
                                                <h3 className='plan__info'>Name: {planItem.name}</h3>
                                                <h4 className='plan__info'>Creator: {planItem.creator}</h4>
                                                <h4 className='plan__info'>Subscribers: {planItem.subscribers}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>}
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

export default SearchPage