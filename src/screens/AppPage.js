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
            <title>Home - Workout Sharer</title>
        
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
                            boxShadow: !color.isSimple 
                                ? '0rem 0rem 2rem .6rem' + color.tertiary + '59' 
                                : 'none',
                            borderTop: '2px solid ' + color.tertiary, 
                            borderBottom: '2px solid ' + color.tertiary, 
                            borderRight: color.isSimple 
                                ? color.theme == 'dark' 
                                    ? '1.5px solid #28282a' 
                                    : '1.5px solid rgb(215, 215, 215)' 
                                : color.theme == 'dark' 
                                    ? '2px solid #28282a' 
                                    : '2px solid rgb(215, 215, 215)', 
                            borderLeft: color.isSimple 
                            ? color.theme == 'dark' 
                                ? '1.5px solid #28282a' 
                                : '1.5px solid rgb(215, 215, 215)' 
                            : color.theme == 'dark' 
                                ? '2px solid #28282a' 
                                : '2px solid rgb(215, 215, 215)', 
                        }}
                    >
                        <div className='info__content info__content--left'>
                            <div className='info__content--outset'></div>

                            <h2 className='info__header' style={{ color: color.contrast }}>Whats the difference between this website and the app?</h2>
                        
                            <p style={{ color: color.contrast }}>This website is meant for creating plans, and interpreting plans. The app has features like an interval timer and calendar that help you to not just interpret plans, but also follow them.</p>
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
                            boxShadow: !color.isSimple 
                                ? '0rem 0rem 2rem .6rem' + color.tertiary + '59' 
                                : 'none',
                            borderTop: '2px solid ' + color.tertiary, 
                            borderBottom: '2px solid ' + color.tertiary, 
                            borderRight: color.isSimple 
                                ? color.theme == 'dark' 
                                    ? '1.5px solid #28282a' 
                                    : '1.5px solid rgb(215, 215, 215)' 
                                : color.theme == 'dark' 
                                    ? '2px solid #28282a' 
                                    : '2px solid rgb(215, 215, 215)', 
                            borderLeft: color.isSimple 
                            ? color.theme == 'dark' 
                                ? '1.5px solid #28282a' 
                                : '1.5px solid rgb(215, 215, 215)' 
                            : color.theme == 'dark' 
                                ? '2px solid #28282a' 
                                : '2px solid rgb(215, 215, 215)', 
                        }}
                    >
                        <div className='info__content info__content--right'>
                            <h2 className='info__header' style={{ color: color.contrast }}>Why choose this app?</h2>
                        
                            <p style={{ color: color.contrast }}>Workout sharer has some great features to help you have an easier time following your plan. Our timer will automatically set intervals to the plan you're subscribed to so you never have to set intervals again, but you can if you want and the calendar will tell you which workouts to do on which days so you have time to follow the plan.</p>
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
                            boxShadow: !color.isSimple 
                                ? '0rem 0rem 2rem .6rem' + color.tertiary + '59' 
                                : 'none',
                            borderTop: '2px solid ' + color.tertiary, 
                            borderBottom: '2px solid ' + color.tertiary, 
                            borderRight: color.isSimple 
                                ? color.theme == 'dark' 
                                    ? '1.5px solid #28282a' 
                                    : '1.5px solid rgb(215, 215, 215)' 
                                : color.theme == 'dark' 
                                    ? '2px solid #28282a' 
                                    : '2px solid rgb(215, 215, 215)', 
                            borderLeft: color.isSimple 
                            ? color.theme == 'dark' 
                                ? '1.5px solid #28282a' 
                                : '1.5px solid rgb(215, 215, 215)' 
                            : color.theme == 'dark' 
                                ? '2px solid #28282a' 
                                : '2px solid rgb(215, 215, 215)', 
                        }}
                    >
                        <div className='info__content info__content--left'>
                            <div className='info__content--outset'></div>

                            <h2 className='info__header' style={{ color: color.contrast }}>How can you get the app?</h2>
                        
                            <p style={{ color: color.contrast }}>The app is available on the app store and google play store, so if you have a smart phone than you are in luck, because you can get it today! At a one time price of $5, there's no reason you shouldn't try the app!!!</p>
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