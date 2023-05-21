import React, { useContext } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

function Contact() {

    const { theme } = useContext(ThemeContext);


  return (
    <div className='document mx-auto flex flex-col gap-4'>
        <h1 className='text-center'>Contact Us</h1>

        <p>At PodClipBot, we're here to help. Please use the following methods to get in touch with us:</p>
        
        <div>
            <h5>General Inquiries</h5>
            <p>For any general questions about our service, please email us at: 
                <a className={`${theme === 'light' ? 'text-current' : ''} ml-1`}  href="mailto:info@podclipbot.com">info@podclipbot.com</a>
            </p>
        </div>

        <div>
            <h5>Technical Support</h5>
            <p>If you're having trouble with our site, please email our support team at: 
                <a className={`${theme === 'light' ? 'text-current' : ''} ml-1`} href="mailto:support@podclipbot.com">support@podclipbot.com</a>
            </p>
        </div>

        <div>
            <h5>Feedback</h5>
            <p>If you have any feedback or suggestions for our service, we'd love to hear from you. Please email: 
                <a className={`${theme === 'light' ? 'text-current' : ''} ml-1`} href="mailto:feedback@podclipbot.com">feedback@podclipbot.com</a>
            </p>
        </div>

        <div>
            <h5>Business Hours</h5>
            <p>Our support team is available Monday to Friday, 9 AM to 5 PM EST.</p>
        </div>

    </div>
  );
}

export default Contact;
