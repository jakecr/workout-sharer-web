import React from 'react'

const Footer = ({ colorContrast, colorPrimary, colorTertiary, theme }) => (
    <div className='footer' style={{ backgroundImage: 'linear-gradient(178deg, ' + colorPrimary + ' 0%, ' + colorPrimary + 'B3 50%, ' + colorPrimary + '33 100%), url(/assets/background-' + theme + '.jpg)' }}>
        <h1 className='footer__heading' style={{ color: colorTertiary }}>Workout Manager</h1>

        <div className='footer__group'>
            <a 
                href='https://unsplash.com/photos/cl7zEjr7-gk' 
                target='_blank' 
                className='footer__credit' 
                style={{ 
                    color: colorContrast,
                    borderTop: '1px solid ' + colorContrast
                }}
            >
                <strong>Photo by Ian Flores on Unsplash</strong>
            </a>
            <a 
                href='https://www.instagram.com/jacob.c.r/?hl=en' 
                target='_blank' 
                className='footer__copyright'
                style={{ 
                    color: colorContrast,
                    borderTop: '1px solid ' + colorContrast
                }}
            >
                <strong>Made by Jacob Rothschild &copy; 2020</strong>
            </a>
        </div>
    </div>
)

export default Footer