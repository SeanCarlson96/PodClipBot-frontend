import React, { useState, useContext } from 'react';
import TermsModal from './TermsModal';
import { ThemeContext } from '../contexts/ThemeContext'; // Update this import path to your actual ThemeContext location

const AgreementBanner = () => {
  const [agreement, setAgreement] = useState(localStorage.getItem('agreement') !== 'Yes');
  // const [agreement, setAgreement] = useState(true);
  const [showTerms, setShowTerms] = useState(false);
  const { theme } = useContext(ThemeContext);
  const backgroundColor = theme === 'dark' ? '#161616' : '#FBFAF5';
  const textColor = theme === 'dark' ? '#FBFAF5' : '#161616';

  const openTermsModal = () => {
    setShowTerms(true);
  };

  const closeTermsModal = () => {
    setShowTerms(false);
  };

  const handleAgreementChange = (e) => {
    setAgreement(!e.target.checked);
    localStorage.setItem('agreement', e.target.checked ? 'Yes' : 'No');
  };

  return (
    <div style={{ position: 'relative' }}>
      {agreement && (
        <div style={{ 
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
        }}>
          <div style={{ 
            position: 'absolute',
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '1rem',
            background: backgroundColor,
            color: textColor,
            zIndex: 1001,
            borderRadius: '0.5rem',
          }}>
            {/* <h1>Welcome to our website!</h1> */}
            <p>Before using the clip creation tool, we require all first time visitors to agree to our terms of use.</p>
            <div className='text-center mt-4'>
              <input
                type="checkbox"
                className="form-check-input cursor-pointer border border-secondary"
                id="agreement"
                name="agreement"
                checked={!agreement}
                onChange={handleAgreementChange}
              />
              <label className='form-check-label ml-2' htmlFor="agreement">
                I agree to the 
                <button 
                    type="button" 
                    className='ml-1'
                    onClick={openTermsModal}
                    style={{background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer'}}
                >
                    Terms of Use
                </button>
              </label>
            </div>

            <TermsModal show={showTerms} handleClose={closeTermsModal} />
          </div>
        </div>
      )}
      {/* Your actual page content goes here, it will be covered by the overlay until user agrees */}
    </div>
  );
}

export default AgreementBanner;
