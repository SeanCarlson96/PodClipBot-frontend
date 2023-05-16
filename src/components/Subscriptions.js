
const SubscriptionCard = ({ planName, price, benefits }) => (
  <div className="rounded-lg p-6 mx-2 my-6 w-1/3 border">
    <h2 className="mb-4 font-light">{planName}</h2>
    <p className="text-xl text-gray-600 mb-6">${price}/month</p>
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
  </div>
);

const Subscriptions = () => {
  const subscriptionOptions = [
    {
      planName: "Base",
      price: 1.99,
      benefits: ["Toggle Watermark", "Change Text Color", "Change Font, and Font Size", "Toggle Text Background", "Randomize, or Choose Your Background Music"],
    },
    {
      planName: "Advanced",
      price: 4.99,
      benefits: ["Upload your own background music", 
                "Toggle music fade in, fade out", 
                "Text Font stroke width and color", 
                "Position your subtitles",
                "Change text background color",
                "Adjust subtitle segment length"
              ],
    },
    {
      planName: "Premium",
      price: 9.99,
      benefits: [
        "Upload your own watermark",
        "Choose the WhisperX model",
        "Position your watermark",
        "Adjust watermark size, duration, and opacity",
        "Adjust music duration"
      ],
    },
  ];

  return (
    <div className="Subscriptions mx-auto flex flex-col gap-3 border">
      <h1>Subscription Plans</h1>
      <div className="flex justify-center border">
        {subscriptionOptions.map((option, index) => (
          <SubscriptionCard key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
