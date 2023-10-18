// pages/pricing.js
import Head from "next/head";
import LandingPageHeader from "../components/LandingPageHeader";
import AppFooter from "../components/AppFooter";

export default function Pricing() {
  return (
    <div className="bg-gray-100 min-h-screen  relative">
      <LandingPageHeader />
      <div className="px-4 py-12">
        <Head>
          <title>Pricing - Agentinsights</title>
        </Head>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              Transparent Pricing for Unparalleled Insights
            </h1>
            <p>
              At Agentinsights, we believe in transparent, straightforward
              pricing that delivers exceptional value and transformative
              insights for your business. Explore our plans and find the one
              that aligns with your business needs.
            </p>
          </div>

          <div className="container max-w-5xl mx-auto px-4 md:px-0">
            {/* Pricing Boxes Section */}
            <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4 mb-10">
              {/* Starter Plan */}
              <div className="flex-1 bg-white p-6 rounded-lg shadow border-2 border-indigo-500 hover:bg-indigo-500 hover:text-white transition duration-300">
                <h2 className="text-xl font-semibold mb-4">Starter Plan</h2>
                <p className="mb-4 font-medium">Free</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>1 Agent</li>
                  <li>Up to 30hrs per month</li>
                  <li>
                    Comprehensive Call Recording: Capture 100% of call details,
                    ensuring zero missed interactions.
                  </li>
                  <li>
                    In-depth Agent Evaluation: Analyze performance meticulously,
                    from individual calls to batch analyses of 300 calls.
                  </li>
                  <li>
                    Consistent Analysis: Benefit from a system that ensures up
                    to 98% consistency in call evaluation and analysis.
                  </li>
                  <li>
                    Data-Driven Decision Making: Transform conversations into
                    actionable insights and drive informed decision-making
                    across your organization.
                  </li>
                </ul>
                <p className="font-semibold mt-auto">
                  Best for: Small teams or startups
                </p>
              </div>

              {/* Professional Plan */}
              <div className="flex-1 bg-white p-6 rounded-lg shadow border-2 border-green-500 hover:bg-green-500 hover:text-white transition duration-300">
                <h2 className="text-xl font-semibold mb-4">Business Plan</h2>
                <p className="mb-4 font-medium">Price: $100 per agent/month</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Up to 60 hrs per month</li>
                  <li>
                    Comprehensive Call Recording: Capture 100% of call details,
                    ensuring zero missed interactions.
                  </li>
                  <li>
                    In-depth Agent Evaluation: Analyze performance meticulously,
                    from individual calls to batch analyses of 300 calls.
                  </li>
                  <li>
                    Consistent Analysis: Benefit from a system that ensures up
                    to 98% consistency in call evaluation and analysis.
                  </li>

                  <li>
                    Data-Driven Decision Making: Transform conversations into
                    actionable insights and drive informed decision-making
                    across your organization.
                  </li>
                </ul>
                <p className="font-semibold mt-auto">
                  Best for: Growing teams and SMEs
                </p>
              </div>

              {/* Enterprise Plan */}
              <div className="flex-1 bg-white p-6 rounded-lg shadow border-2 border-red-500 hover:bg-red-500 hover:text-white transition duration-300">
                <h2 className="text-xl font-semibold mb-4">Enterprise Plan</h2>
                <p className="mb-4 font-medium">Price: Custom Pricing</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Comprehensive Call Recording: Capture 100% of call details,
                    ensuring zero missed interactions.
                  </li>
                  <li>
                    In-depth Agent Evaluation: Analyze performance meticulously,
                    from individual calls to batch analyses of 300 calls.
                  </li>
                  <li>
                    Consistent Analysis: Benefit from a system that ensures up
                    to 98% consistency in call evaluation and analysis.
                  </li>

                  <li>
                    Data-Driven Decision Making: Transform conversations into
                    actionable insights and drive informed decision-making
                    across your organization.
                  </li>
                </ul>
                <p className="font-semibold mt-auto">
                  Best for: Large enterprises with specific needs
                </p>
              </div>
            </div>
          </div>

          {/* Add-Ons */}
          <div className="p-8 bg-gray-50">
            <h2 className="text-xl font-semibold mb-4">Note :</h2>
            <p>
              • All prices are billed annually. Monthly billing is available at
              a different rate.
            </p>
            <p>• Custom plans and features are available upon request.</p>
          </div>

          {/* FAQs */}
          <div className="p-8 space-y-4">
            <h2 className="text-xl font-semibold mb-4">FAQs</h2>
            {/* Questions */}
            <div className="space-y-2">
              <p>
                <span className="font-medium">How is user defined?</span> A user
                is defined as an individual who has access to the Agentinsights
                platform, regardless of their role or usage frequency.
              </p>
              <p>
                <span className="font-medium">
                  What happens if I exceed my call recording limit?
                </span>{" "}
                If you exceed your call recording limit, additional charges may
                apply. Alternatively, you can upgrade your plan to accommodate
                your needs.
              </p>
              <p>
                <span className="font-medium">Can I change my plan later?</span>
                Absolutely! You can upgrade or downgrade your plan at any time
                through your account settings.
              </p>
            </div>
          </div>

          {/* Footer with Call to Action */}
          <div className="bg-indigo-600 text-white p-8 rounded-md">
            <h2 className="text-2xl font-bold mb-4">
              Join Us in Transforming Customer Interactions into Strategic
              Assets
            </h2>
            <p>
              Get in touch with our sales team to explore how Agentinsights can
              be your partner in harnessing the unparalleled value of every
              customer interaction. Let’s build a future where every
              conversation drives your business forward.
            </p>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
