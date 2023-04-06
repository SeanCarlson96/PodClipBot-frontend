
import { Routes, Route } from 'react-router-dom';

import Tool from './components/Tool';
import Login from './components/Login';
import Subscriptions from './components/Subscriptions';
import Registration from './components/Registration';

const Routing = () => (
  <Routes>
    <Route exact path="/" element={<Tool />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/subscriptions" element={<Subscriptions />} />
    <Route exact path="/registration" element={<Registration />} />
    {/* <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
    <Route exact path="/terms-of-use" element={<TermsOfUse />} />
    <Route exact path="/contact" element={<Contact />} /> */}
  </Routes>
);

export default Routing;
