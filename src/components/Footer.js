import React from 'react'

const Footer = ({ colorContrast, colorPrimary, colorTertiary, theme }) => (
    <div className='footer' style={{ backgroundImage: 'linear-gradient(178deg, ' + colorPrimary + ' 0%, ' + colorPrimary + 'B3 50%, ' + colorPrimary + '33 100%), url(/assets/background-' + theme + '.jpg)' }}>
        <h1 className='footer__heading' style={{ color: colorTertiary }}>Workout Sharer</h1>

        <div className='footer__group'>
            <a 
                href='www.linkedin.com/in/jacob-rothschild-93578a192' 
                target='_blank' 
                className='footer__credit' 
                style={{ 
                    color: colorContrast,
                    borderTop: '1px solid ' + colorContrast
                }}
            >
                <strong>-- Website creators Linkedin --</strong>
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
                <strong>-- Website creators Instagram --</strong>
            </a>
        </div>
    </div>
)

export default Footer