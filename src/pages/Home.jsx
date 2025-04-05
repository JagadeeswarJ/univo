import React from "react";
import coverpg from "../assets/coverpg.jpg"; // Importing the local image
import { useNavigate } from "react-router-dom";
import "../Global.css";

const eventPlaceholder =
  "https://www.hire4event.com/blogs/wp-content/uploads/2019/04/Artist-For-College-Events.jpg";

function Home() {
  const navigate = useNavigate();

  const handleJoinNow = () => {
    navigate("/login");
  };

  return (
    <main className="home-container">
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${coverpg})` }} // Using local image
      >
        <div className="hero-overlay">
          <h1 className="hero-title bg-red">Welcome to Campus Connect</h1>
          <p className="hero-subtitle">
            Discover &amp; Manage College Events with Ease
          </p>
          <button className="btn hero-cta" onClick={handleJoinNow}>
            Join Now
          </button>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="features-section">
        <h2>Why Campus Connect?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Event Discovery</h3>
            <p>
              Filter by category, date, or location to find what interests you.
            </p>
          </div>
          <div className="feature-card">
            <h3>Organizer Tools</h3>
            <p>Easily create, manage, and promote your events in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Gamification</h3>
            <p>
              Earn badges, climb the leaderboard, and stay motivated to attend.
            </p>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="events-section">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Upcoming Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-6">
          {/* Event Card 1 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src={eventPlaceholder}
              alt="Event"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              Tech Innovators Meetup
            </h3>
            <p className="text-gray-700 mb-4">
              Join fellow students and industry professionals to explore
              emerging technologies and trends.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Learn More
            </button>
          </div>

          {/* Event Card 2 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src={eventPlaceholder}
              alt="Event"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              Art &amp; Culture Fest
            </h3>
            <p className="text-gray-700 mb-4">
              Immerse yourself in a vibrant display of creativity, performances,
              and artistic talent.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Learn More
            </button>
          </div>

          {/* Event Card 3 */}
          <div className="bg-white rounded-lg shadow-md p-4">
            <img
              src={eventPlaceholder}
              alt="Event"
              className="rounded-md mb-4"
            />
            <h3 className="text-xl font-bold text-blue-600 mb-2">
              Sports Tournament
            </h3>
            <p className="text-gray-700 mb-4">
              Get ready for high-energy matches and showcase your athletic
              skills on the field.
            </p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-12 text-center mt-10">
        <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="mb-8 text-lg">
          Sign up or log in to discover, create, and enjoy all the campus
          events.
        </p>
        <div className="flex justify-center gap-6">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </button>
          <button
            className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            onClick={() => navigate("/login")}
          >
            Log In
          </button>
        </div>
      </section>
    </main>
  );
}

export default Home;
