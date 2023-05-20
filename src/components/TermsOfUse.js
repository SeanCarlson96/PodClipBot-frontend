import React from 'react'

function TermsOfUse() {
  return (
    <div className="document flex flex-col gap-2 mx-auto">
        <h3>Terms of Use</h3>
        <p>
            {"Welcome to PodClipBot. Please read these Terms of Use ('Terms') carefully before using this website ('Site') operated by PodClipBot ('us', 'we', or 'our')."}
        </p>
        <p>
            {"Your access to and use of the Site is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users and others who access or use the Site."}
        </p>
        <h5>1. Acceptance of Terms</h5>
        <p>
            {"By accessing or using the Site, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access the Site."}
        </p>
        <h5>2. Changes to Terms</h5>
        <p>
            {"We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms."}
        </p>
        <h5>3. Content</h5>
        <p>
            {"Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ('Content'). You are responsible for ensuring that the Content you contribute does not infringe any copyright or violate any laws. Any illegal activities carried out through our Service are strictly forbidden."}
        </p>
        <h5>4. Termination</h5>
        <p>
            {"We may terminate or suspend access to our Site immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach the Terms."}
        </p>
        <h5>5. Liability</h5>
        <p>
            {"PodClipBot is not responsible for any damage caused from using the Site, or from any failure of the Site, for any reason, to provide any services."}
        </p>
        <h5>6. Privacy Policy</h5>
        <p>
            {"We are committed to ensuring that your privacy is protected. Please refer to our "}
            <a href="/privacy-policy" style={{textDecoration: 'none', color: 'inherit'}}>
                    <button 
                        type="button"
                        style={{background: 'none', border: 'none', padding: 0, textDecoration: 'underline', cursor: 'pointer'}}
                    >
                        Privacy Policy
                    </button>
                </a>
            {" for information about how we handle your personal data."}
        </p>
        <h5>7. Governing Law</h5>
        <p>
            {"These Terms shall be governed in accordance with the laws of the United States, and all users agree that any legal action they may seek to bring against PodClipBot or relating to the Site will be brought in the United States."}
        </p>
    </div>
  )
}

export default TermsOfUse