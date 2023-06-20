import React, { useContext } from 'react';
// import FreePlan from './FreePlan';
import BasePlan from './base-plan-components/BasePlan';
import AdvancedPlan from './advanced-plan-components/AdvancedPlan';
import PremiumPlan from './premium-plan-components/PremiumPlan';
import FreeValuePlan from './premium-plan-components/FreeValuePlan';
import UserContext from '../contexts/UserContext';

function SubscriptionSwitch({ formData }) {
  const { user } = useContext(UserContext);

  const renderPlan = () => {
    if(user){
        switch (user.subscription) {
          case 'none':
            // return <FreePlan formData={formData} />;
            return <FreeValuePlan formData={formData} />;
          case 'base':
            return <BasePlan formData={formData} />;
          case 'advanced':
            return <AdvancedPlan formData={formData} />;
          case 'premium':
            return <PremiumPlan formData={user.defaultSettings} />;
          default:
            return <p>Invalid subscription type</p>;
        }

    } else {
        // return <FreePlan formData={formData} />;
        return <FreeValuePlan formData={formData} />;
    }
  };


  return <div>{renderPlan()}</div>;
}

export default SubscriptionSwitch;
