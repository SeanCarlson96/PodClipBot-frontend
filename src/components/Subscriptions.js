
const SubscriptionCard = ({ planName, price, benefits, color }) => (
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
    <button className={`btn btn-block btn-primary mt-4`}>Try {planName}</button>
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
      color: "base",
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
      color: "advanced",
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
      color: "premium",
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
