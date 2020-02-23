import React, { useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AboutPage = () => {
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    useEffect(() => {
        if(!color.isLoggedIn) {
            checkIfNotLoggedIn()
        }
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <title>About - Workout Sharer</title>
            
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />
                
                <div className='info__container'>
                    <div 
                        className='info__group'
                        style={{ 
                            backgroundColor: color.secondary, 
                            boxShadow: '0rem 0rem 2rem .6rem' + color.tertiary + '59'
                        }}
                    >
                        <div className='info__content info__content--left'>
                            <div className='info__content--outset'></div>

                            <h2 className='info__header' style={{ color: color.contrast }}>What do you use this website for?</h2>
                        
                            <p style={{ color: color.contrast }}>With this website, you can make a plan for anyone to follow, or follow a plan that anyone made. You can enter your records for the assessments the plan creator set and get any plan you want adapted to your fitness level.</p>
                        </div>
                        
                        <div 
                            className='info__image info__image--right'
                            style={{
                                backgroundImage: 'url(/assets/create-demo.PNG)'
                            }}
                        >
                        </div>
                    </div>
                </div>
                
                <div className='info__container'>
                    <div 
                        className='info__group'
                        style={{ 
                            backgroundColor: color.secondary,
                            boxShadow: '0rem 0rem 2rem .6rem' + color.tertiary + '59'
                        }}
                    >
                        <div className='info__content info__content--right'>
                            <h2 className='info__header' style={{ color: color.contrast }}>Why use this website?</h2>
                        
                            <p style={{ color: color.contrast }}>As someone sharing workout plans with others, it's difficult to post your plan in an organized way where other people can find and use it easily. With Workout Sharer, you can easily make and share plans for free. For athletes, Workout Sharer adapts plans to your fitness level so as you get stronger your plan will continue to work for you.</p>
                        </div>
                        
                        <div 
                            className='info__image info__image--left'
                            style={{
                                backgroundImage: 'url(/assets/adapted-demo.PNG)'
                            }}
                        >
                        </div>
                    </div>
                </div>
                
                <div className='info__container'>
                    <div 
                        className='info__group'
                        style={{ 
                            backgroundColor: color.secondary, 
                            boxShadow: '0rem 0rem 2rem .6rem' + color.tertiary + '59'
                        }}
                    >
                        <div className='info__content info__content--left'>
                            <div className='info__content--outset'></div>
                        
                            <h2 className='info__header' style={{ color: color.contrast }}>How to get started creating plans?</h2>
                        
                            <p style={{ color: color.contrast }}>If you are looking to make a plan, you will find a link at the bottom of your <Link className='link' to='/account'>"ACCOUNT"</Link> page to a <Link className='link' to='/create-plan'>plan creation page.</Link> After you make a plan, you can find it on your <Link className='link' to='/account'>"ACCOUNT"</Link> page or you can find its page through the <Link className='link' to='/search'>"PLANS SEARCH"</Link> page.</p>
                        </div>
                        
                        <div 
                            className='info__image info__image--right'
                            style={{
                                backgroundImage: 'url(/assets/create-link-demo.PNG)'
                            }}
                        >
                        </div>
                    </div>
                </div>
                
                <div className='info__container'>
                    <div 
                        className='info__group'
                        style={{ 
                            backgroundColor: color.secondary, 
                            boxShadow: '0rem 0rem 2rem .6rem' + color.tertiary + '59'
                        }}
                    >
                        <div className='info__content info__content--right'>
                            <h2 className='info__header' style={{ color: color.contrast }}>How to get started following a plan?</h2>
                        
                            <p style={{ color: color.contrast }}>First, find a plan through the <Link className='link' to='/search'>"PLANS SEARCH"</Link> page. Once you find the plan you want to follow, subscribe to it and go to your <Link className='link' to='/subbed-plan'>"SUBBED PLAN"</Link> page and enter your records to get your plan adapted to your fitness level.</p>
                        </div>
                        
                        <div 
                            className='info__image info__image--left'
                            style={{
                                backgroundImage: 'url(/assets/search-demo.PNG)'
                            }}
                        >
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

export default AboutPage