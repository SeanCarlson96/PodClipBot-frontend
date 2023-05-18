import React from 'react';
import FreePlan from './FreePlan';
import BasePlan from './base-plan-components/BasePlan';
import AdvancedPlan from './advanced-plan-components/AdvancedPlan';
import PremiumPlan from './premium-plan-components/PremiumPlan';

function SubscriptionSwitch({ user, formData }) {

  const renderPlan = () => {
    if(user){
        switch (user.subscription) {
          case 'none':
            return <FreePlan formData={formData} />;
          case 'base':
            return <BasePlan formData={formData} />;
          case 'advanced':
            return <AdvancedPlan formData={formData} />;
          case 'premium':
            return <PremiumPlan formData={formData} />;
          default:
            return <p>Invalid subscription type</p>;
        }

    } else {
        return <FreePlan formData={formData} />;
    }
  };


  return <div>{renderPlan()}</div>;
}

export default SubscriptionSwitch;
