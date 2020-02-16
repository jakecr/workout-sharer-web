import React from 'react'
import { Link } from 'react-router-dom'
import AppImg from '../../public/assets/light-logo.png'
import AboutImg from '../../public/assets/about.png'
import ContactImg from '../../public/assets/contact.png'
import SearchImg from '../../public/assets/search.png'
import WorkoutsImg from '../../public/assets/workouts.png'
import AccountImg from '../../public/assets/account.png'

const Header = ({ theme, currentRoute, contrastColor }) => (
    <div className='u-center'>
        <div className='header'>
            <div className='header__box--logo'>
                <label className='header__label--logo' style={{ color: contrastColor }}>APP</label>
                <Link 
                    className='header__anker'  
                    to='/' 
                >
                    <img 
                        className='header__logo' 
                        src={AppImg} 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/'
                                ? 'brightness(45%)'
                                : 'brightness(65%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/'
                                ? 'brightness(45%)'
                                : 'brightness(65%)'
                        }}
                    />
                </Link>
            </div>

            <div className='header__box--img'>
                <label className='header__label' style={{ color: contrastColor }}>ABOUT</label>
                <Link 
                    className='header__anker' 
                    to='/about'
                >
                    <img 
                        className='header__img' 
                        src={AboutImg} 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/about'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/about'
                                ? 'brightness(20%)'
                                : 'brightness(45%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/about'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/about'
                                ? 'brightness(20%)'
                                : 'brightness(45%)'
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
                        src={ContactImg} 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/contact'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/contact'
                                ? 'brightness(20%)'
                                : 'brightness(45%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/contact'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/contact'
                                ? 'brightness(20%)'
                                : 'brightness(45%)'
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
                        src={SearchImg} 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/search'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/search'
                                ? 'brightness(20%)'
                                : 'brightness(45%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/search'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/search'
                                ? 'brightness(20%)'
                                : 'brightness(45%)'
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
                        src={WorkoutsImg} 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/subbed-plan'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/subbed-plan'
                                ? 'brightness(20%)'
                                : 'brightness(45%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/subbed-plan'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/subbed-plan'
                                ? 'brightness(20%)'
                                : 'brightness(45%)'
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
                        src={AccountImg} 
                        style={{
                            filter: 
                            theme == 'dark'
                            ? currentRoute == '/account'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/account'
                                ? 'brightness(20%)'
                                : 'brightness(45%)',
                            WebkitFilter: 
                            theme == 'dark'
                            ? currentRoute == '/account'
                                ? 'brightness(120%)'
                                : 'brightness(65%)'
                            : currentRoute == '/account'
                                ? 'brightness(20%)'
                                : 'brightness(45%)'
                        }}
                    />
                </Link>
            </div>
        </div>
    </div>
)

export default Header