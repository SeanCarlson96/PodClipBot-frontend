import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const CheckIfLoggedIn = ({setShowLoginPrompt}) => {
        return (
            <div className='mx-auto mt-5 flex flex-col gap-3'>

                <div className='mb-4'>
                    <button onClick={() => setShowLoginPrompt(false)}>
                        <FontAwesomeIcon icon={faArrowLeft} /> Back to Subscriptions
                    </button>
                </div>

                <h5>Please Sign In or Register before purchasing a subscription.</h5>

                <div className='flex gap-3 justify-center'>
                    <Link className="btn btn-primary w-36" to="/login">Sign In</Link>
                    <Link className="btn btn-secondary w-36" to="/registration">Register</Link>
                </div>
            </div>
        );
};

export default CheckIfLoggedIn;
