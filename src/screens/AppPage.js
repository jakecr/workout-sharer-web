import React, { useEffect, useContext } from 'react'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const AppPage = () => {
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    useEffect(() => { 
        if(!color.isLoggedIn) {
            checkIfNotLoggedIn()
        }
        window.scrollTo(0, 0)
    }, [])

    return (
        <div>
            <title>Home - Workout Dealer</title>
        
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
                        <div className='info__content info__content--left'>
                            <h2 className='info__header' style={{ color: color.contrast }}>Whats the difference between this website and the app?</h2>
                        
                            <p style={{ color: color.contrast }}>This website is only meant for creating plans, and interpreting plans. The app has features like an interval timer and calendar that help you to not just interpret plans, but also follow them.</p>
                        </div>
                        
                        <div 
                            className='info__image info__image--right'
                            style={{
                                backgroundImage: 'url(/assets/timer-demo.png)'
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
                        <div className='info__content info__content--right'>
                            <h2 className='info__header' style={{ color: color.contrast }}>Why choose this app?</h2>
                        
                            <p style={{ color: color.contrast }}>Workout sharer has some great features to help you have an easier time following your plan. Our timer will automatically set intervals to the plan you're subscribed to so that you never have to set intervals again, but you can if you want and the calendar will tell you which workouts to do on which days so that you have time to follow the plan.</p>
                        </div>
                        
                        <div 
                            className='info__image info__image--left'
                            style={{
                                backgroundImage: 'url(/assets/calendar-demo.png)'
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
                        <div className='info__content info__content--left'>
                            <h2 className='info__header' style={{ color: color.contrast }}>How can you get the app?</h2>
                        
                            <p style={{ color: color.contrast }}>The app is available on the app store and google play store, so if you have a smart phone than you are in luck, because you can get it today! At a one time price of 5$, there's no reason you shouldn't try the app!!!</p>
                        </div>
                        
                        <div 
                            className='info__image info__image--right' 
                            style={{
                                backgroundImage: 'url(/assets/app-icon.png)'
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

export default AppPage