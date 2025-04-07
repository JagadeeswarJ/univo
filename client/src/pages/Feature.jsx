import React from "react";
import { Sparkles, ClipboardList, BadgePercent } from "lucide-react"; // Install lucide-react if not already: npm install lucide-react

const featureDetails = [
  {
    title: "Event Discovery",
    icon: <Sparkles size={40} className="text-indigo-500" />,
    description: [
      "Smart filters for categories, date, and campus location",
      "Trending, popular, and AI-curated events for your interests",
      "Bookmark events you like for quick access later",
      "Get timely reminders so you never miss what matters",
    ],
  },
  {
    title: "Organizer Tools",
    icon: <ClipboardList size={40} className="text-pink-500" />,
    description: [
      "Design beautiful event pages in minutes",
      "Track registrations and manage attendees",
      "Send live updates and announcements to participants",
      "View insights & feedback to improve event outcomes",
    ],
  },
  {
    title: "Gamification",
    icon: <BadgePercent size={40} className="text-yellow-500" />,
    description: [
      "Earn points by attending and organizing events",
      "Climb leaderboards to gain campus-wide recognition",
      "Unlock badges for achievements and milestones",
      "Fun and motivating way to boost engagement",
    ],
  },
];

function Feature() {
  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-14">
          🚀 Discover What Makes Us Different
        </h1>
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {featureDetails.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 ease-in-out p-8 transform hover:-translate-y-1 border"
            >
              <div className="flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">
                {feature.title}
              </h2>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-2">
                {feature.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Feature;
