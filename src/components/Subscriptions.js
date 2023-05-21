
const SubscriptionCard = ({ planName, price, benefits }) => (
  <div className="sub-card rounded-lg p-6 border border-secondary w-80">
    <h2 className="mb-2 font-extralight">{planName}</h2>
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
  </div>
);

const Subscriptions = () => {
  const subscriptionOptions = [
    {
      planName: "Base",
      price: 1.99,
      benefits: [
        "Font",
        "Font Size", 
        "Subtitle Color", 
        "Subtitle Background on/off", 
        "-",
        "Music Choice",
        "-",
        "Watermark on/off"
      ],
    },
    {
      planName: "Advanced",
      price: 4.99,
      benefits: [
        "Subtitle Background Color",
        "Font Stroke Width",
        "Font Stroke Color", 
        "Subtitle Horizontal Position",
        "Subtitle Vertical Position",
        "Subtitle Segment Length",
        "-",
        "Custom Music Upload", 
        "Music Fade on/off"
      ],
    },
    {
      planName: "Premium",
      price: 9.99,
      benefits: [
        "Save Your Settings",
        "-",
        "Diarization",
        "Additional Speaker Colors",
        "-",
        "Music Duration",
        "-",
        "Custom Watermark Upload",
        "Watermark Horizontal Position",
        "Watermark Vertical Position",
        "Watermark Size",
        "Watermark Opacity",
        "Watermark Duration"
      ],
    },
  ];

  return (
    <div className="Subscriptions mx-auto flex flex-col gap-3 mb-5">
      <h1 className="text-center">Subscription Plans</h1>
      <div className="flex flex-wrap justify-center gap-4">
        {subscriptionOptions.map((option, index) => (
          <SubscriptionCard key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
