import React from "react";
import "./Home.css"; // We'll create this file next

// Sample images from public domain or placeholders
const heroImage =
  "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&w=1920&q=80";
const eventPlaceholder =
  "https://www.hire4event.com/blogs/wp-content/uploads/2019/04/Artist-For-College-Events.jpg";

function Home() {
  return (
    <main className="home-container">
      {/* HERO SECTION */}
      <section
        className="hero-section"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <h1 className="hero-title">Welcome to Campus Connect</h1>
          <p className="hero-subtitle">
            Discover &amp; Manage College Events with Ease
          </p>
          <button className="btn hero-cta">Join Now</button>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="features-section">
        <h2>Why Campus Connect?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>Event Discovery</h3>
            <p>Filter by category, date, or location to find what interests you.</p>
          </div>
          <div className="feature-card">
            <h3>Organizer Tools</h3>
            <p>Easily create, manage, and promote your events in one place.</p>
          </div>
          <div className="feature-card">
            <h3>Gamification</h3>
            <p>Earn badges, climb the leaderboard, and stay motivated to attend.</p>
          </div>
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          <div className="event-card">
            <img src={eventPlaceholder} alt="Event" />
            <h3>Tech Innovators Meetup</h3>
            <p>
              Join fellow students and industry professionals to explore emerging
              technologies and trends.
            </p>
            <button className="btn event-cta">Learn More</button>
          </div>
          <div className="event-card">
            <img src={eventPlaceholder} alt="Event" />
            <h3>Art &amp; Culture Fest</h3>
            <p>
              Immerse yourself in a vibrant display of creativity, performances,
              and artistic talent.
            </p>
            <button className="btn event-cta">Learn More</button>
          </div>
          <div className="event-card">
            <img src={eventPlaceholder} alt="Event" />
            <h3>Sports Tournament</h3>
            <p>
              Get ready for high-energy matches and showcase your athletic skills
              on the field.
            </p>
            <button className="btn event-cta">Learn More</button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>
          Sign up or log in to discover, create, and enjoy all the campus events.
        </p>
        <div className="cta-buttons">
          <button className="btn">Sign Up</button>
          <button className="btn btn-outline">Log In</button>
        </div>
      </section>
    </main>
  );
}

export default Home;
