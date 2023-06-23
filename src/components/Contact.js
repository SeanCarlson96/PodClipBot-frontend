import React, { useContext, useState } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';
import ReCaptchaV3 from './ReCaptchaV3';

function Contact() {

    const { theme } = useContext(ThemeContext);
    const [disableForm, setDisableForm] = useState(false);

  return (
    <div className='document mx-auto flex flex-col gap-4'>
        <h1 className='text-center'>Contact Us</h1>

        <p>At PodClipBot, we're here to help. Please use the following methods to get in touch with us:</p>
        
        {/* <div>
            <h5>Technical Support, Feedback, or General Inquiries</h5>
            <p>For absolutely anything at all, we'd love to hear from you. Please email us at: 
                <a className={`${theme === 'light' ? 'text-current' : ''} ml-1`}  href="mailto:podclipbot@gmail.com">podclipbot@gmail.com</a>
            </p>
        </div>

        <div>
            <h5>Connect with the creator</h5>
            <p>If you'd like contact the creator of PodClipBot directly, connect with Sean on 
                <a className={`${theme === 'light' ? 'text-current' : ''} ml-1`} href="https://www.linkedin.com/in/sean-carlson-5954b5161/">LinkedIn</a>
            </p>
        </div> */}
        <div>
            <h5>Technical Support, Feedback, or General Inquiries</h5>
            <p>For absolutely anything at all, we'd love to hear from you. Please email us at: 
                {
                    disableForm 
                    ? <span className={`${theme === 'light' ? 'text-current' : ''} ml-1`}>podclipbot@gmail.com</span> 
                    : <a className={`${theme === 'light' ? 'text-current' : ''} ml-1`}  href="mailto:podclipbot@gmail.com">podclipbot@gmail.com</a>
                }
            </p>
        </div>

        {/* <div>
            <h5>Connect with the creator</h5>
            <p>If you'd like contact the creator of PodClipBot directly, connect with Sean on 
                {
                    disableForm 
                    ? <span className={`${theme === 'light' ? 'text-current' : ''} ml-1`}>LinkedIn</span>
                    : <a className={`${theme === 'light' ? 'text-current' : ''} ml-1`} href="https://www.linkedin.com/in/sean-carlson-5954b5161/" target="_blank">LinkedIn</a>
                }
            </p>
        </div> */}

        <ReCaptchaV3 action={'contact'} setDisableForm={setDisableForm}/>

    </div>
  );
}

export default Contact;
