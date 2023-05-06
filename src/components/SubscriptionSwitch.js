import React from 'react';
import FreePlan from './FreePlan';
import BasePlan from './BasePlan';
import AdvancedPlan from './AdvancedPlan';
import PremiumPlan from './PremiumPlan';

function SubscriptionSwitch({ user }) {
  const renderPlan = () => {
    if(user){
        switch (user.subscription) {
          case 'none':
            return <FreePlan />;
          case 'base':
            return <BasePlan />;
          case 'advanced':
            return <AdvancedPlan />;
          case 'premium':
            return <PremiumPlan />;
          default:
            return <p>Invalid subscription type</p>;
        }

    } else {
        return <FreePlan />;
    }
  };

  return <div>{renderPlan()}</div>;
}

export default SubscriptionSwitch;
