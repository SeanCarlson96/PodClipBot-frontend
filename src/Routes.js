
import { Routes, Route } from 'react-router-dom';

import Tool from './components/Tool';
import Login from './components/Login';
import Subscriptions from './components/Subscriptions';

const Routing = () => (
  <Routes>
    <Route exact path="/" element={<Tool />} />
    <Route exact path="/login" element={<Login />} />
    <Route exact path="/subscriptions" element={<Subscriptions />} />
    {/* <Route exact path="/privacy-policy" component={PrivacyPolicy} />
    <Route exact path="/terms-of-use" component={TermsOfUse} />
    <Route exact path="/contact" component={Contact} /> */}
  </Routes>
);

export default Routing;
