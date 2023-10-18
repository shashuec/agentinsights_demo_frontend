// pages/about.js
import Head from "next/head";
import LandingPageHeader from "../components/LandingPageHeader";
import AppFooter from "../components/AppFooter";

export default function About() {
  return (
    <div className="bg-gray-100 min-h-screen  relative">
      <LandingPageHeader />
      <div className="bg-gray-100 min-h-screen px-4 py-12">
        <Head>
          <title>About Us - Agentinsights</title>
        </Head>

        <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {/* Header */}
          <div className="bg-indigo-600 text-white p-8 rounded-t-lg">
            <h1 className="text-3xl font-bold mb-2">ABOUT US</h1>
            <h2 className="text-xl mb-4">The Genesis of Agentinsights</h2>
            <p>
              In the bustling world of customer service and sales, every
              interaction carries a wealth of insight, waiting to be unearthed.
              During our stint in a B2B SaaS environment, it became increasingly
              evident that while we were capturing data, we were only scratching
              the surface. Traditional methods allowed us to assess merely 1% of
              calls, leaving a staggering 99% of customer interactions
              unexplored and unanalyzed, leading us into potential
              decision-making risks. This wasn’t just a gap; it was an abyss.
            </p>
          </div>

          {/* Content Sections */}
          <div className="p-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Navigating Through the Challenges
              </h2>
              <p>
                Our journey began with a commitment to ensuring that every
                voice, every concern, and every nuance of customer interaction
                was captured, analyzed, and utilized to its utmost potential,
                not just for the benefit of sales and support teams, but for the
                entire organization. But the path was fraught with challenges.
                Inconsistent call recording, technical failures, and the sheer
                volume of data threatened to drown valuable insights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Innovation Through Insight
              </h2>
              <p>
                Our resolution solidified with the realization that
                organizations needed a smarter, more efficient way to mine the
                gold from customer conversations. Agentinsights was conceived
                with a vision to empower organizations to capture 100% of call
                details, ensuring zero missed interactions and elevating audit &
                analysis accuracy by up to 95%.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-indigo-600 mb-4">
                Bringing Agentinsights to Life
              </h2>
              <p>
                With Agentinsights, we brought to the table a platform that not
                only ensures comprehensive call recording but also enables
                businesses to evaluate agent performance at scale. From single
                calls to batch analysis of 500+ calls at once, our system
                ensures 98% consistency, effectively addressing the issue of
                human inconsistency and bias. Now, organizations are no longer
                losing out on the &quot;golden data&quot; from customer
                interactions. Agentinsights is here to harness the real voice of
                your customers, converting conversations into valuable insights,
                and driving informed decision-making across all echelons of your
                business.
              </p>
            </section>
          </div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
