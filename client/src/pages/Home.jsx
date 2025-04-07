import React, { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import "../Global.css";

const eventImages = [
  "https://magazinelondon.co.uk/wp-content/uploads/2023/10/JA-MAGAZINE-BTF23-2212-2600x1500.jpg",
  "https://blog.coupondunia.in/wp-content/uploads/2014/07/college-fest.jpg",
  "https://cdn.bleacherreport.net/images_root/slides/photos/000/595/808/102809752_original.jpg?1293506368",
];

function Home() {
  const navigate = useNavigate();
  const tiltRefs = useRef([]);

  useEffect(() => {
    tiltRefs.current.forEach((el) => {
      if (el) {
        VanillaTilt.init(el, {
          max: 10,
          speed: 600,
          scale: 1.05,
          glare: true,
          "max-glare": 0.2,
        });
      }
    });
  }, []);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  };

  const sectionHeading = (text) => (
    <motion.h2
      className="text-4xl sm:text-6xl font-extrabold mb-16 tracking-tight text-indigo-800 text-center animate-fadeInUp"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {text}
    </motion.h2>
  );

  const featureDetails = [
    {
      title: "Event Discovery",
      description: (
        <ul className="text-left text-gray-600 text-sm list-disc list-inside space-y-2">
          <li>Smart filters for categories, date, and campus location</li>
          <li>Trending, popular, and AI-curated events for your interests</li>
          <li>Bookmark events you like for quick access later</li>
          <li>Get timely reminders so you never miss what matters</li>
        </ul>
      ),
    },
    {
      title: "Organizer Tools",
      description: (
        <ul className="text-left text-gray-600 text-sm list-disc list-inside space-y-2">
          <li>Design beautiful event pages in minutes</li>
          <li>Track registrations and manage attendees</li>
          <li>Send live updates and announcements to participants</li>
          <li>View insights & feedback to improve event outcomes</li>
        </ul>
      ),
    },
    {
      title: "Gamification",
      description: (
        <ul className="text-left text-gray-600 text-sm list-disc list-inside space-y-2">
          <li>Earn points by attending and organizing events</li>
          <li>Climb leaderboards to gain campus-wide recognition</li>
          <li>Unlock badges for achievements and milestones</li>
          <li>Fun and motivating way to boost engagement</li>
        </ul>
      ),
    },
  ];

  return (
    <main className="home-container font-sans">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#2563eb] text-white py-44 text-center relative overflow-hidden">
        <motion.h1
          className="text-6xl sm:text-8xl font-extrabold mb-8 tracking-tight drop-shadow-xl text-white glow-text"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
        >
          <span className="text-black"> Welcome to </span>{" "}
          <span className="text-black">UNIVO</span>
        </motion.h1>

        <motion.h2
          className="text-3xl sm:text-5xl font-semibold mb-8 text-white"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          where campuses{" "}
          <span className="inline-block text-yellow-300">
            <Typewriter
              words={["Unite", "Thrive", "Celebrate", "Innovate", "Lead Together"]}
              loop={0}
              cursor
              cursorStyle="_"
              typeSpeed={80}
              deleteSpeed={50}
              delaySpeed={1000}
            />
          </span>
        </motion.h2>

        <motion.p
          className="text-2xl sm:text-3xl mb-12 max-w-3xl mx-auto text-gray-200 font-light"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Discover, Host, and Be Part of Every Campus Vibe with UNIVO
        </motion.p>

        <motion.div
          className="flex justify-center gap-6"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <button
            className="bg-yellow-400 text-indigo-900 font-bold py-4 px-10 rounded-xl hover:bg-yellow-300 transition duration-300 shadow-xl text-lg"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 px-6 bg-white text-center">
        {sectionHeading("Explore Our Features")}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {featureDetails.map((feature, i) => (
            <motion.div
              key={i}
              ref={(el) => (tiltRefs.current[i] = el)}
              className="group p-6 border rounded-xl shadow-lg bg-gray-50 transition transform duration-300 hover:-translate-y-1 hover:rotate-[0.5deg] hover:scale-[1.03] hover:shadow-2xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
            >
              <h3 className="text-xl font-semibold text-blue-800 mb-4">
                {feature.title}
              </h3>
              {feature.description}
            </motion.div>
          ))}
        </div>
      </section>

      {/* EVENTS SECTION */}
      <section id="events" className="py-20 px-6 bg-gradient-to-b from-white to-gray-100">
        {sectionHeading("Upcoming Events")}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Tech Innovators Meetup", "Art & Culture Fest", "Sports Tournament"].map((title, i) => (
            <motion.div
              key={i}
              ref={(el) => (tiltRefs.current[i + 3] = el)}
              className="group bg-white rounded-lg shadow-md p-4 transition transform duration-300 hover:-translate-y-1 hover:scale-[1.03] hover:rotate-[0.5deg] hover:shadow-2xl"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i + 1}
            >
              <img
                src={eventImages[i]}
                alt="Event"
                className="rounded-md mb-4 h-48 w-full object-cover"
              />
              <h3 className="text-xl font-bold text-purple-700 mb-2">
                {title}
              </h3>
              <p className="text-gray-700 mb-4">
                {
                  i === 0 ? "Explore emerging technologies with students and professionals." :
                  i === 1 ? "Celebrate creativity, performances, and artistic talent." :
                  "High-energy competitions showcasing athletic spirit and skill."
                }
              </p>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gradient-to-tr from-indigo-900 via-purple-900 to-pink-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-lg mb-2">UNIVO</h3>
            <p>Empowering every student to create, connect & celebrate campus life.</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-yellow-300 transition">Features</a></li>
              <li><a href="#events" className="hover:text-yellow-300 transition">Events</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Connect</h3>
            <div className="flex justify-center sm:justify-start space-x-4 text-xl mt-2">
              <a href="mailto:support@univo.in" className="hover:text-yellow-300 transition cursor-pointer">
                <i className="ri-mail-fill"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-yellow-300 transition cursor-pointer" target="_blank" rel="noopener noreferrer">
                <i className="ri-instagram-fill"></i>
              </a>
              <a href="https://twitter.com" className="hover:text-yellow-300 transition cursor-pointer" target="_blank" rel="noopener noreferrer">
                <i className="ri-twitter-x-fill"></i>
              </a>
              <a href="https://linkedin.com" className="hover:text-yellow-300 transition cursor-pointer" target="_blank" rel="noopener noreferrer">
                <i className="ri-linkedin-box-fill"></i>
              </a>
            </div>
            <p className="mt-4 text-sm text-gray-300">support@univo.in</p>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-400 text-xs border-t border-gray-600 pt-4">
          © {new Date().getFullYear()} UNIVO. Made with ❤️ by Team UNIVO
        </div>
      </footer>
    </main>
  );
}

export default Home;