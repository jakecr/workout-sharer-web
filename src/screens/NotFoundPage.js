import React, { useEffect, useContext } from 'react'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const NotFoundPage = () => {
    const { state: color, checkIfNotLoggedIn } = useContext(PrepContext)

    useEffect(() => {
        checkIfNotLoggedIn()
    }, [])

    return (
        <div>
            <title>404 - Workout Dealer</title>
        
            <div 
                className='background' 
                style={{ backgroundColor: color.primary }}
            >
                <Header 
                    theme={color.theme}
                    currentRoute={window.location.pathname}
                    contrastColor={color.contrast}
                />
                
                <h1 
                    className='form__header u-abs-center' 
                    style={{ color: color.contrast }}
                >
                    Could not find the page you are looking for, make sure the url is correct.
                </h1>
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

export default NotFoundPage