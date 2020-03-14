import React, { useContext } from 'react'
import { Context as PrepContext } from '../context/PrepContext'
import Footer from '../components/Footer'
import Header from '../components/Header'

const PrivacyPolicyPage = () => {
    const { state: color } = useContext(PrepContext)

    return (
        <div>
            <title>Privacy Policy - Workout Sharer</title>
        
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
                        className='form u-width-large' 
                        style={{ 
                            backgroundColor: color.secondary, 
                            borderTop: color.isSimple 
                                ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                                : '2px solid ' + color.tertiary, 
                            borderBottom: color.isSimple 
                                ? color.theme == 'dark' ? '2px solid #28282a' : '2px solid rgb(215, 215, 215)' 
                                : '2px solid ' + color.tertiary
                        }}
                    >
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            1. WHAT INFORMATION DO WE COLLECT?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We may collect information regarding you when you use our apps.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            2. HOW DO WE USE YOUR INFORMATION?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We use personal information collected via our Services or Apps for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations. We indicate the specific processing grounds we rely on next to each purpose listed below.
                        </p>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We use the information we collect or receive:
                        </p>
                        <ul>
                            <li style={{ color: color.contrast }}>
                                <strong>To facilitate account creation and logon process.</strong> If you choose to link your account with us to a third party account (such as your Google or Facebook account), we use the information you allowed us to collect from those third parties to facilitate account creation and logon process for the performance of the contract.
                            </li>
                            
                            <li style={{ color: color.contrast }}>
                                <strong>To manage user accounts.</strong> We may use your information for the purposes of managing our account and keeping it in working order.
                            </li>
                            
                            <li style={{ color: color.contrast }}>
                                <strong>To respond to user inquiries/offer support to users.</strong> We may use your information to respond to your inquiries and solve any potential issues you might have with the use of our Services.
                            </li>
                        </ul>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            3. WILL YOUR INFORMATION BE SHARED WITH ANYONE?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We may process or share data based on the following legal basis:
                        </p>
                        <ul>
                            <li style={{ color: color.contrast }}>
                                <strong>Consent:</strong> We may process your data if you have given us specific consent to use your personal information in a specific purpose.
                            </li>
                            
                            <li style={{ color: color.contrast }}>
                                <strong>Legitimate Interests:</strong> We may process your data when it is reasonably necessary to achieve our legitimate business interests.
                            </li>
                            
                            <li style={{ color: color.contrast }}>
                                <strong>Performance of a Contract:</strong> Where we have entered into a contract with you, we may process your personal information to fulfill the terms of our contract.
                            </li>
                            
                            <li style={{ color: color.contrast }}>
                                <strong>Legal Obligations:</strong> We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena (including in response to public authorities to meet national security or law enforcement requirements).
                            </li>
                            
                            <li style={{ color: color.contrast }}>
                                <strong>Vital Interests:</strong> We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person and illegal activities, or as evidence in litigation in which we are involved.
                            </li>
                        </ul>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            More specifically, we may need to process your data or share your personal information in the following situations:
                        </p>
                        <ul>
                            <li style={{ color: color.contrast }}>
                                <strong>Vendors, Consultants and Other Third-Party Service Providers.</strong> We may share your data with third party vendors, service providers, contractors or agents who perform services for us or on our behalf and require access to such information to do that work. Examples include: payment processing, data analysis, email delivery, hosting services, customer service and marketing efforts. We may allow selected third parties to use tracking technology on the Services or Apps, which will enable them to collect data about how you interact with the Services or Apps over time. This information may be used to, among other things, analyze and track data, determine the popularity of certain content and better understand online activity. Unless described in this Policy, we do not share, sell, rent or trade any of your information with third parties for their promotional purposes.
                            </li>

                            <li style={{ color: color.contrast }}>
                                <strong>Business Transfers.</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                            </li>

                            <li style={{ color: color.contrast }}>
                                <strong>Third-Party Advertisers.</strong> We may use third-party advertising companies to serve ads when you visit the Services or Apps. These companies may use information about your visits to our Website(s) and other websites that are contained in web cookies and other tracking technologies in order to provide advertisements about goods and services of interest to you.
                            </li>
                        </ul>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            5. HOW LONG DO WE KEEP YOUR INFORMATION?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting or other legal requirements). No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us.
                        </p>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            6. HOW DO WE KEEP YOUR INFORMATION SAFE?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Services or Apps is at your own risk. You should only access the services within a secure environment.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            7. DO WE COLLECT INFORMATION FROM MINORS?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We do not knowingly solicit data from or market to children under 18 years of age. By using the Services or Apps, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services or Apps. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records. If you become aware of any data we have collected from children under age 18, please contact us at jacob.carroll.rothschild@gmail.com.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            8. WHAT ARE YOUR PRIVACY RIGHTS?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            If you are resident in the European Economic Area and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: http://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.
                        </p>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            If you have questions or comments about your privacy rights, you may email us at jacob.carroll.rothschild@gmail.com.
                        </p>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            <strong>Account Information</strong>
                        </p>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            If you would at any time like to review or change the information in your account or terminate your account, you can:
                        </p>
                        <ul>
                            <li style={{ color: color.contrast }}>
                                Delete your account through the account page.
                            </li>
                            
                            <li style={{ color: color.contrast }}>
                                Contact us using the contact information provided if you would like to change your email or username.
                            </li>
                        </ul>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, some information may be retained in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our Terms of Use and/or comply with legal requirements.
                        </p>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            <strong>Cookies and similar technologies:</strong> Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services or Apps. To opt-out of interest-based advertising by advertisers on our Services or Apps visit http://www.aboutads.info/choices/.
                        </p>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            <strong>Opting out of email marketing:</strong> You can unsubscribe from our marketing email list at any time by clicking on the unsubscribe link in the emails that we send or by contacting us using the details provided below. You will then be removed from the marketing email list – however, we will still need to send you service-related emails that are necessary for the administration and use of your account. To otherwise opt-out, you may:
                        </p>
                        <ul>
                            <li style={{ color: color.contrast }}>
                                We only send emails to confirm an action you make on the site or app.
                            </li>
                        </ul>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            9. CONTROLS FOR DO-NOT-TRACK FEATURES
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track (“DNT”) feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. No uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            10. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            California Civil Code Section 1798.83, also known as the “Shine The Light” law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
                        </p>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            If you are under 18 years of age, reside in California, and have a registered account with the Services or Apps, you have the right to request removal of unwanted data that you publicly post on the Services or Apps. To request removal of such data, please contact us using the contact information provided below, and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services or Apps, but please be aware that the data may not be completely or comprehensively removed from our systems.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            11. DO WE MAKE UPDATES TO THIS POLICY?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            We may update this privacy notice from time to time. The updated version will be indicated by an updated “Revised” date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            12. HOW CAN YOU CONTACT US ABOUT THIS POLICY?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            If you have questions or comments about this policy, you may email me at jacob.carroll.rothschild@gmail.com.
                        </p>
                        
                        <h3 
                            className='privacy--heading' 
                            style={{ color: color.contrast }}
                        >
                            HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                        </h3>
                        <p 
                            className='privacy--info' 
                            style={{ color: color.contrast }}
                        >
                            Based on the laws of some countries, you may have the right to request access to the personal information we collect from you, change that information, or delete it in some circumstances. To request to review, update, or delete your personal information, please visit: https://www.workoutsharer.com/contact. We will respond to your request within 30 days.
                        </p>
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

export default PrivacyPolicyPage