import React, { useEffect, useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AboutPage = () => {
    const [ hasCheckedIfLoggedIn, setHasCheckedIfLoggedIn ] = useState(false)
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    useEffect(() => {
        setHasCheckedIfLoggedIn(true)
        checkIfNotLoggedIn()
        window.scrollTo(0, 0)
    }, [!hasCheckedIfLoggedIn])

    return (
        <div>
            <title>About - Workout Dealer</title>
            
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
                            border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                        }}
                    >
                        <div className='info__content info--left'>
                            <h2 className='info__header' style={{ color: color.contrast }}>What do you use this website for?</h2>
                        
                            <p style={{ color: color.contrast }}>With this website, you can make a plan for anyone to follow, or follow a plan that anyone made. You can enter your records for the assessments the plan creator set and get any plan you want adapted to your fitness level.</p>
                        </div>
                        
                        <div 
                            className='info__image info--right info__image--right'
                            style={{
                                backgroundImage: 'url(/assets/create-demo.png)'
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
                            border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                        }}
                    >
                        <div className='info__content info--right'>
                            <h2 className='info__header' style={{ color: color.contrast }}>Why use this website?</h2>
                        
                            <p style={{ color: color.contrast }}>As someone sharing your workout plan with others it can be difficult to post your plan in a way that other people can find it. With Workout Sharer, you can easily make and share a plan for free. As an athlete, Workout Sharer will adapt your plan to your fitness level so as you get stronger your plan will continue to work for you.</p>
                        </div>
                        
                        <div 
                            className='info__image info--left info__image--left'
                            style={{
                                backgroundImage: 'url(/assets/adapted-demo.png)'
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
                            border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                        }}
                    >
                        <div className='info__content info--left'>
                            <h2 className='info__header' style={{ color: color.contrast }}>How to get started creating plans?</h2>
                        
                            <p style={{ color: color.contrast }}>If you are looking to make a plan, you will find a link at the bottom of your <Link className='link' style={{ color: color.tertiary }} to='/account'>"ACCOUNT"</Link> page to a <Link className='link' style={{ color: color.tertiary }} to='/create-plan'>plan creation page.</Link> After you make a plan you can find it on your <Link className='link' style={{ color: color.tertiary }} to='/account'>"ACCOUNT"</Link> page or you can find its page through the <Link className='link' style={{ color: color.tertiary }} to='/search'>"PLANS SEARCH"</Link> page.</p>
                        </div>
                        
                        <div 
                            className='info__image info--right info__image--right'
                            style={{
                                backgroundImage: 'url(/assets/create-link-demo.png)'
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
                            border: color.theme == 'dark' ? '1px solid rgb(52,53,54)' : '1px solid rgb(204,204,204)' 
                        }}
                    >
                        <div className='info__content info--right'>
                            <h2 className='info__header' style={{ color: color.contrast }}>How to get started following a plan?</h2>
                        
                            <p style={{ color: color.contrast }}>First, you will have to find a plan through the <Link className='link' style={{ color: color.tertiary }} to='/search'>"PLANS SEARCH"</Link> page. Once you find the plan you want to follow, subscribe to it and go to your <Link className='link' style={{ color: color.tertiary }} to='/subbed-plan'>"SUBBED PLAN"</Link> page and enter your records to get your plan adapted to your fitness level.</p>
                        </div>
                        
                        <div 
                            className='info__image info--left info__image--left'
                            style={{
                                backgroundImage: 'url(/assets/search-demo.png)'
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