import React from "react";

function Pricing() {
  const pricingPlans = [
    {
      title: "Free",
      price: "₹0",
      features: [
        "Access to basic events",
        "Community support",
        "Bookmark 5 events",
        "Limited notifications",
      ],
      buttonText: "Get Started",
      popular: false,
    },
    {
      title: "Pro",
      price: "₹199/month",
      features: [
        "Unlimited event bookmarks",
        "Priority notifications",
        "Create and manage your own events",
        "Early access to new features",
      ],
      buttonText: "Upgrade Now",
      popular: true,
    },
    {
      title: "Enterprise",
      price: "Custom",
      features: [
        "Dedicated support",
        "Advanced analytics & tools",
        "Custom integrations",
        "Bulk registrations & admin tools",
      ],
      buttonText: "Contact Us",
      popular: false,
    },
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          Simple & Transparent Pricing
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl shadow-lg p-8 border-2 ${
                plan.popular ? "border-indigo-500" : "border-transparent"
              } bg-white hover:shadow-2xl transition transform hover:-translate-y-1`}
            >
              {plan.popular && (
                <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                {plan.title}
              </h3>
              <p className="text-3xl font-bold text-indigo-600 mb-6">
                {plan.price}
              </p>
              <ul className="text-gray-600 text-sm space-y-3 mb-6 list-disc list-inside">
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition">
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;
