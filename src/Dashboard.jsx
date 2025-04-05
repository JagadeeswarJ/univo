import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CalendarIcon, MapPinIcon } from "lucide-react";

const eventsData = [
  {
    title: "Hackathon 2025",
    location: "Hyderabad",
    date: "2025-04-12",
    image: "https://source.unsplash.com/400x300/?hackathon",
  },
  {
    title: "Cultural Fest",
    location: "Bangalore",
    date: "2025-04-20",
    image: "https://source.unsplash.com/400x300/?culture",
  },
  {
    title: "Tech Talk with Alumni",
    location: "Chennai",
    date: "2025-04-15",
    image: "https://source.unsplash.com/400x300/?technology",
  },
  {
    title: "Startup Meetup",
    location: "Pune",
    date: "2025-04-18",
    image: "https://source.unsplash.com/400x300/?startup",
  },
  {
    title: "Design Thinking Workshop",
    location: "Gurugram",
    date: "2025-04-22",
    image: "https://source.unsplash.com/400x300/?design",
  },
  {
    title: "AI & ML Bootcamp",
    location: "Kolkata",
    date: "2025-04-19",
    image: "https://source.unsplash.com/400x300/?ai",
  },
];

export default function EventLandingPage() {
  const [changingWord, setChangingWord] = useState("events");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [filteredEvents, setFilteredEvents] = useState(eventsData);

  const words = ["events", "people", "students", "CEO", "fun", "learning"];
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setChangingWord(words[i]);
      i = (i + 1) % words.length;
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    const results = eventsData.filter(
      (event) =>
        (!selectedLocation || event.location === selectedLocation) &&
        (!selectedDate || event.date === selectedDate)
    );
    setFilteredEvents(results);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-8 font-sans">
      <header className="flex justify-between items-center mb-12">
        <div className="flex items-center space-x-3">
          <img
            src="/mnt/data/image.png"
            alt="Inivio Logo"
            className="h-10 w-14 object-contain"
          />
          <h1 className="text-3xl font-bold text-blue-700">🎉 Eventify</h1>
        </div>
        <div className="space-x-4">
          <button className="hover:text-blue-600 text-sm font-medium text-gray-700">Pricing</button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium">Login</button>
        </div>
      </header>

      <motion.section
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-extrabold mb-4">
          Find <span className="text-blue-600 transition-opacity duration-300" id="changingWord">{changingWord}</span> near you
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Discover workshops, hackathons, meetups, and fests happening around your campus.
        </p>
        <button
          className="px-8 py-3 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white rounded-full shadow-md"
          onClick={() => setShowFilters(true)}
        >
          Browse Events ✨
        </button>
      </motion.section>

      {showFilters && (
        <section className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
              <MapPinIcon className="mr-3 text-blue-500 w-5 h-5" />
              <select
                className="w-full text-gray-700 focus:ring-0 outline-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option>Hyderabad</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Pune</option>
                <option>Gurugram</option>
                <option>Kolkata</option>
              </select>
            </div>
            <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
              <CalendarIcon className="mr-3 text-blue-500 w-5 h-5" />
              <input
                type="date"
                className="border-none focus:ring-0 text-gray-700 w-full outline-none"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          </div>
          <div className="text-center">
            <button
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
              onClick={handleSearch}
            >
              Show Events
            </button>
          </div>
        </section>
      )}

      <section className="max-w-6xl mx-auto mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl shadow-lg bg-white"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600 flex items-center mb-1">
                  <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" /> {event.location}
                </p>
                <p className="text-gray-600 flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" /> {event.date}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="mt-20 text-center text-sm text-gray-400">
        © 2025 Eventify. Crafted with 💙 for students by students.
      </footer>
    </div>
  );
}
