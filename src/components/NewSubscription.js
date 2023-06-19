import React, {useState, useContext} from "react";
import ReCaptchaV3 from "./ReCaptchaV3";
import CheckIfLoggedIn from "./CheckIfLoggedIn";
import UserContext from "../contexts/UserContext";
import axios from "axios";

const SubscriptionCard = ({ planName, price, benefits, color, disableForm, handleClick }) => {
  return (
  // <div className="sub-card rounded-lg p-6 border border-secondary w-80">
  <div className={`sub-card p-6 w-80 ${color}-border`}>
    <h2 className={`mb-2 font-extralight ${color}-plan`}>{planName}</h2>
    <p className="text-xl text-gray-400 mb-4">${price}/month</p>
    <ul className="list-unstyled">
      {benefits.map((benefit, index) => (
        <li key={index} className="mb-2">
          <span className="text-success mr-2">
            <i className="bi bi-check-circle-fill"></i>
          </span>
          {benefit}
        </li>
      ))}
    </ul>
    <button
        className={`btn btn-block btn-primary mt-4`} 
        disabled={disableForm}
        onClick={() => handleClick(planName)}
    >
        Try {planName}
    </button>

  </div>
  );
};

const NewSubscription = () => {
  const [disableForm, setDisableForm] = useState(false);
  // const [stripeLink, setStripeLink] = useState("");
  const baseStripeLink = process.env.REACT_APP_BASE_STRIPE_LINK
  const advancedStripeLink = process.env.REACT_APP_ADVANCED_STRIPE_LINK
  const premiumStripeLink = process.env.REACT_APP_PREMIUM_STRIPE_LINK
  // const [redirectToStripe, setRedirectToStripe] = useState(false);
  const user = useContext(UserContext);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const handleSubscriptionButtonClick = async (plan) => {
    if(!user.user) {
      setShowLoginPrompt(true)
    } else {
      const userId = user.user.id;  
      // Define your Stripe Price IDs
      const stripePriceIds = {
          'Base': 'price_1NDYKnBnRV7ZyiYAyfWXXZwX',  // Replace with your actual Stripe Price ID for the "Base" plan
          'Advanced': 'price_1NDaErBnRV7ZyiYAgo7pMUfi',  // Replace with your actual Stripe Price ID for the "Advanced" plan
          'Premium': 'price_1NDaGMBnRV7ZyiYA2Q0Vf0X4'  // Replace with your actual Stripe Price ID for the "Premium" plan
      };

      // Get the correct Stripe Price ID based on the plan name
      const stripePriceId = stripePriceIds[plan];
      
      // Make the request to your server to create the Checkout Session
      const response = await axios.post(backendURL + '/create-checkout-session', {
          userId: userId,
          priceId: stripePriceId
      });

      const { sessionId } = response.data;

      // Redirect the user to Stripe Checkout
      const stripe = window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);
      await stripe.redirectToCheckout({ sessionId });
    }
}

  const subscriptionOptions = [
    {
      planName: "Pro Plan",
      price: 9.99,
      benefits: [
        "Save Your Settings",
        "Custom Music Upload",
        "Custom Watermark Upload",
        "Watermark On/Off",
        "Watermark Horizontal Position",
        "Watermark Vertical Position",
        "Watermark Size",
        "Watermark Opacity",
        "Watermark Duration"
      ],
      color: "pro",
      stripeLink: premiumStripeLink,
    },
  ];

  return (
    <div className="Subscriptions mx-auto flex flex-col gap-3 mb-5">

      {showLoginPrompt ? <CheckIfLoggedIn setShowLoginPrompt={setShowLoginPrompt} /> : (
      <>
        <h1 className="text-center">Subscription Plan</h1>
        <div className="flex flex-wrap justify-center gap-4">
          {subscriptionOptions.map((option, index) => (
            // <SubscriptionCard key={index} {...option} disableForm={disableForm} handleClick={handleClick} />
            <SubscriptionCard key={index} {...option} disableForm={disableForm} handleClick={handleSubscriptionButtonClick} />
          ))}
        </div>
        <ReCaptchaV3 action="subscriptions" setDisableForm={setDisableForm} />
      </>
      )}

    </div>
  );
};

export default NewSubscription;
