import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReCaptchaV3 = ({ action, setDisableForm }) => {
    const reCaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    const backendURL = process.env.REACT_APP_BACKEND_URL;
    const [message, setMessage] = useState('');


    useEffect(() => {
        const checkRecaptchaLoad = () => {
            if (window.grecaptcha && window.grecaptcha.enterprise && window.grecaptcha.enterprise.ready) {
                window.grecaptcha.enterprise.ready(function() {
                    window.grecaptcha.enterprise.execute(reCaptchaSiteKey, { action: action })
                    .then(function(token) {
                        axios.post(backendURL + '/verify-recaptcha', { token }, {
                            headers: {
                                'Content-Type': 'application/json',
                            }
                        })
                        .then(response => {
                            // console.log(response.data);
                        })
                        .catch(error => {
                            console.error('Error:', error);
                            setMessage('reCaptcha could not verify that you are human. Please try again.');
                            setDisableForm(true);
                        });
                        
                    });
                });
            } else {
                setTimeout(checkRecaptchaLoad, 100);
            }
        };
    
        checkRecaptchaLoad();
    }, [action, reCaptchaSiteKey, setDisableForm, backendURL]);

    return (
        <>
            <p className='text-danger text-center'>{message}</p>
        </>
    );
};

export default ReCaptchaV3;
