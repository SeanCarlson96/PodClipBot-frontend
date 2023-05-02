
const SubscriptionCard = ({ planName, price, benefits }) => (
  <div className="bg-white rounded-lg p-6 mx-2 my-6 flex-shrink flex-grow">
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
      planName: "Basic",
      price: 9.99,
      benefits: ["Feature 1", "Feature 2"],
    },
    {
      planName: "Pro",
      price: 19.99,
      benefits: ["Feature 1", "Feature 2", "Feature 3", "Feature 4"],
    },
    {
      planName: "Enterprise",
      price: 49.99,
      benefits: [
        "Feature 1",
        "Feature 2",
        "Feature 3",
        "Feature 4",
        "Feature 5",
        "Feature 6",
      ],
    },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="font-extralight">Subscription Plans</h1>
      <p className="mb-10 font-light">Unlock new features of our tool with each level of subscription!</p>
      <div className="flex flex-wrap justify-center">
        {subscriptionOptions.map((option, index) => (
          <SubscriptionCard key={index} {...option} />
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
