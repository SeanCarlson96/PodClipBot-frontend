import React, { useState, useEffect } from 'react';
import TermsModal from './TermsModal';

const AgreementBanner = () => {
  const [agreement, setAgreement] = useState(false);
  const [firstVisit, setFirstVisit] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const openTermsModal = () => {
      setShowTerms(true);
  };

  const closeTermsModal = () => {
      setShowTerms(false);
  };

  useEffect(() => {
    if(localStorage.getItem('firstVisit') === null){
        setFirstVisit(true);
        localStorage.setItem('firstVisit', 'No');
    }
  }, []);

  if (!firstVisit) {
    return null;
  }

  return (
    <div>
      <input
        type="checkbox"
        className="form-check-input cursor-pointer border border-secondary"
        id="agreement"
        name="agreement"
        checked={agreement}
        onChange={(e) => setAgreement(e.target.checked)}
        readOnly={true}
        required
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

      <TermsModal show={showTerms} handleClose={closeTermsModal} />
    </div>
  );
}

export default AgreementBanner;
