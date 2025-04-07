import React from "react";
import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

const team = [
  {
    name: "Jagadeeswar",
    role: "Community",
    image: "src/assets/team1.jpg",
    social: ["twitter", "globe", "mail"],
  },
  {
    name: "Sai Teja",
    role: "Design",
    image: "src/assets/team2.jpg",
    social: ["twitter", "globe", "mail"],
  },
  {
    name: "Sipun",
    role: "Operations",
    image: "src/assets/team3.jpg",
    social: ["twitter", "linkedin", "globe"],
  },
  {
    name: "Pranav Babu",
    role: "Engineering",
    image: "src/assets/team4.jpg",
    social: ["github", "twitter", "mail"],
  },
  {
    name: "Viswaksen",
    role: "Vision & Strategy",
    image: "src/assets/team5.jpg",
    social: ["twitter", "globe", "linkedin"],
  },
];

const About = () => {
  return (
    <div className="bg-gradient-to-br from-[#ecf4ff] via-[#f9f9ff] to-[#d9eaff] min-h-screen">

      <section className="text-center py-16 px-4">
        <h1 className="text-5xl font-extrabold text-gray-900">
          We do <span className="text-blue-600 underline decoration-4">it all!</span>
        </h1>
        <p className="mt-4 text-xl text-gray-600">Well, most of it.</p>
        <p className="mt-6 max-w-3xl mx-auto text-gray-600 leading-relaxed">
          You have the potential to build something that can change the world. At our core, we want to create opportunities for builders through student-focused initiatives.
        </p>

        {/* Team Cards Layout */}
        <div className="mt-16 space-y-12">
          {/* First Row - 3 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center px-4 max-w-5xl mx-auto">
            {team.slice(0, 3).map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] border border-gray-100 hover:border-transparent hover:ring-4 hover:ring-blue-300/20 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                />
                <h3 className="mt-4 font-bold text-xl text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-semibold tracking-wide mt-1">
                  {member.role.toUpperCase()}
                </p>
                <div className="flex justify-center mt-4 gap-5 text-gray-500 text-xl">
                  {member.social.map((icon, i) => (
                    <i
                      key={i}
                      className={`ri-${icon}-fill hover:text-blue-500 transition duration-300`}
                    ></i>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Second Row - 2 cards centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center px-4 max-w-3xl mx-auto">
            {team.slice(3).map((member, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-3xl shadow-md hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-[1.03] border border-gray-100 hover:border-transparent hover:ring-4 hover:ring-blue-300/20 text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg"
                />
                <h3 className="mt-4 font-bold text-xl text-gray-900">{member.name}</h3>
                <p className="text-sm text-blue-600 font-semibold tracking-wide mt-1">
                  {member.role.toUpperCase()}
                </p>
                <div className="flex justify-center mt-4 gap-5 text-gray-500 text-xl">
                  {member.social.map((icon, i) => (
                    <i
                      key={i}
                      className={`ri-${icon}-fill hover:text-blue-500 transition duration-300`}
                    ></i>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-24">
          <h2 className="text-4xl font-bold">
            Join us in our <span className="text-blue-500">adventures</span>
          </h2>
          <p className="mt-2 text-gray-600">Want to join us? We're actively hiring across the board.</p>
          <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-md transition">
            Get in touch
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
