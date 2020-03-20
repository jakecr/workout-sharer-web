import React from 'react'
import { Link } from 'react-router-dom'

const Header = ({ theme, currentRoute, contrastColor }) => (
    <div className='u-center'>
        <div className='header'>
            <div className='header__box--logo'>
                <label className='header__label--logo' style={{ color: contrastColor }}>APP</label>
                <Link 
                    className='header__anker'  
                    to='/app' 
                >
                    <img 
                        className='header__logo' 
                        src='/assets/light-logo.png'
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/app'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/app'
                                ? 'brightness(35%)'
                                : 'brightness(65%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/app'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/app'
                                ? 'brightness(35%)'
                                : 'brightness(65%)'
                        }}
                    />
                </Link>
            </div>

            <div className='header__box--img'>
                <label className='header__label' style={{ color: contrastColor }}>ABOUT</label>
                <Link 
                    className='header__anker' 
                    to='/'
                >
                    <img 
                        className='header__img' 
                        src='/assets/about.png' 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/'
                                ? 'brightness(10%)'
                                : 'brightness(35%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/'
                                ? 'brightness(10%)'
                                : 'brightness(35%)'
                        }}
                    />
                </Link>
            </div>

            <div className='header__box--img'>
                <label className='header__label' style={{ color: contrastColor }}>CONTACT</label>
                <Link 
                    className='header__anker' 
                    to='/contact'
                >
                    <img 
                        className='header__img' 
                        src='/assets/contact.png' 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/contact'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/contact'
                                ? 'brightness(10%)'
                                : 'brightness(35%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/contact'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/contact'
                                ? 'brightness(10%)'
                                : 'brightness(35%)'
                        }}
                    />
                </Link>
            </div>

            <div className='header__box--img'>
                <label className='header__label' style={{ color: contrastColor }}>PLANS SEARCH</label>
                <Link 
                    className='header__anker'  
                    to='/search'
                >
                    <img 
                        className='header__img' 
                        src='/assets/search.png' 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/search'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/search'
                                ? 'brightness(10%)'
                                : 'brightness(35%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/search'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/search'
                                ? 'brightness(10%)'
                                : 'brightness(35%)'
                        }}
                    />
                </Link>
            </div>

            <div className='header__box--img'>
                <label className='header__label' style={{ color: contrastColor }}>SUBBED PLAN</label>
                <Link 
                    className='header__anker' 
                    to='/subbed-plan'
                >
                    <img 
                        className='header__img' 
                        src='/assets/workouts.png' 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/subbed-plan'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/subbed-plan'
                                ? 'brightness(10%)'
                                : 'brightness(35%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/subbed-plan'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/subbed-plan'
                                ? 'brightness(10%)'
                                : 'brightness(35%)'
                        }}
                    />
                </Link>
            </div>

            <div className='header__box--img'>
                <label className='header__label' style={{ color: contrastColor }}>ACCOUNT</label>
                <Link 
                    className='header__anker' 
                    to='/account'
                >
                    <img 
                        className='header__img' 
                        src='/assets/account.png' 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/account'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/account'
                                ? 'brightness(10%)'
                                : 'brightness(35%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/account'
                                ? 'brightness(110%)'
                                : 'brightness(65%)'
                            : currentRoute == '/account'
                                ? 'brightness(10%)'
                                : 'brightness(35%)'
                        }}
                    />
                </Link>
            </div>
        </div>
    </div>
)

export default Header