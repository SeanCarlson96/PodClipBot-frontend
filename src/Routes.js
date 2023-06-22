
import { Routes, Route, useLocation } from 'react-router-dom';
import React, { useEffect } from 'react';

// import Tool from './components/Tool';
import Login from './components/Login';
// import Subscriptions from './components/Subscriptions';
import Registration from './components/Registration';
import Profile from './components/profile/Profile';
import EmailInput from './components/EmailInput';
import ResetPassword from './components/ResetPassword';
import Landing from './components/Landing';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfUse from './components/TermsOfUse';
import Contact from './components/Contact';
import ReturnedFromStripe from './components/ReturnedFromStripe';
import NewSubscription from './components/NewSubscription';

// const Routing = () => (
//   <Routes>
//     <Route exact path="/" element={<Landing />} />
//     {/* <Route exact path="/tool" element={<Tool />} /> */}
//     <Route exact path="/tool" element={<></>} />
//     <Route exact path="/login" element={<Login />} />
//     {/* <Route exact path="/subscriptions" element={<Subscriptions />} /> */}
//     <Route exact path="/subscriptions" element={<NewSubscription />} />
//     <Route exact path="/registration" element={<Registration />} />
//     <Route exact path="/profile" element={<Profile />} />
//     <Route exact path="/email-input" element={<EmailInput />} />
//     <Route exact path="/reset-password" element={<ResetPassword />} />
//     <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
//     <Route exact path="/terms-of-use" element={<TermsOfUse />} />
//     <Route exact path="/contact" element={<Contact />} />
//     <Route exact path="/returnedFromStripe/:userId" element={<ReturnedFromStripe />} />
//   </Routes>
// );
const Routing = () => {
  const location = useLocation();

  useEffect(() => {
    window.gtag('config', 'G-NPPCKP16GN', {
      page_path: location.pathname,
    });
  }, [location]);

  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
      <Route exact path="/login" element={<Login />} />
      <Route exact path="/registration" element={<Registration />} />
      <Route exact path="/profile" element={<Profile />} />
      <Route exact path="/email-input" element={<EmailInput />} />
      <Route exact path="/reset-password" element={<ResetPassword />} />
      <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route exact path="/terms-of-use" element={<TermsOfUse />} />
      <Route exact path="/contact" element={<Contact />} />
      <Route exact path="/returnedFromStripe/:userId" element={<ReturnedFromStripe />} />
      <Route exact path="/subscriptions" element={<NewSubscription />} />
    </Routes>
  );
};

export default Routing;
