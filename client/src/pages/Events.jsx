import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CalendarIcon,
  MapPinIcon,
  CodeIcon,
  MusicIcon,
  ActivityIcon,
  XIcon,
} from "lucide-react";
import { t } from "../components/toast";

const server_url = import.meta.env.VITE_BACKEND_URL;

const eventImages = [
  "https://magazinelondon.co.uk/wp-content/uploads/2023/10/JA-MAGAZINE-BTF23-2212-2600x1500.jpg",
  "https://blog.coupondunia.in/wp-content/uploads/2014/07/college-fest.jpg",
  "https://cdn.bleacherreport.net/images_root/slides/photos/000/595/808/102809752_original.jpg?1293506368",
];

export default function EventLandingPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [recommendedEvents, setRecommendedEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showBrowseDropdown, setShowBrowseDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const navigate = useNavigate();

  const words = [
    "Events",
    "People",
    "Students",
    "Opportunities",
    "Fun",
    "Learning",
  ];
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [fade, setFade] = useState(false);
  const wordIndex = useRef(0);
  const profileDropdownRef = useRef(null);
  const browseDropdownRef = useRef(null);

  useEffect(() => {
    t("User Login Success");
    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        wordIndex.current = (wordIndex.current + 1) % words.length;
        setCurrentWord(words[wordIndex.current]);
        setFade(false);
      }, 400);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Fetch events data
  // Fetch events data
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${server_url}/event`);

        // Check if response has data property and it's an array
        if (
          response.data &&
          response.data.data &&
          Array.isArray(response.data.data)
        ) {
          setAllEvents(response.data.data); // Extract the actual data array
          console.log("Fetched events:", response.data.data);
        } else {
          console.error("Unexpected API response format:", response.data);
          setAllEvents([]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setAllEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target)
      ) {
        setShowProfileDropdown(false);
      }
      if (
        browseDropdownRef.current &&
        !browseDropdownRef.current.contains(event.target)
      ) {
        setShowBrowseDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filter events whenever filters or allEvents change
  useEffect(() => {
    // Only filter if allEvents contains data
    if (allEvents && allEvents.length > 0) {
      const filtered = allEvents.filter((event) => {
        return (
          (!selectedLocation || event.location === selectedLocation) &&
          (!selectedDate || event.date === selectedDate) &&
          (!selectedCategory || event.category === selectedCategory)
        );
      });

      setFilteredEvents(filtered);
      console.log("Filtered events:", filtered);
    } else {
      setFilteredEvents([]);
    }
  }, [allEvents, selectedLocation, selectedDate, selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setShowBrowseDropdown(false);
  };

  const categoryButtonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  const iconAnimationVariants = {
    technical: {
      animate: {
        rotate: [0, 15, 0, -15, 0],
        transition: { repeat: Infinity, duration: 2, repeatType: "loop" },
      },
    },
    cultural: {
      animate: {
        scale: [1, 1.2, 1],
        transition: { repeat: Infinity, duration: 1.5, repeatType: "loop" },
      },
    },
    sports: {
      animate: {
        y: [0, -5, 0],
        transition: {
          repeat: Infinity,
          duration: 1,
          repeatType: "loop",
          ease: "easeInOut",
        },
      },
    },
  };

  // Show empty state with sample data if no events are fetched yet
  const eventsToDisplay =
    filteredEvents.length > 0
      ? filteredEvents
      : selectedCategory || selectedLocation || selectedDate
      ? []
      : [
          {
            title: "Sample Hackathon Event",
            category: "Technical",
            location: "Hyderabad",
            date: "2025-04-15",
            image: eventImages[0],
          },
          {
            title: "Cultural Fest 2025",
            category: "Cultural",
            location: "Bangalore",
            date: "2025-05-20",
            image: eventImages[1],
          },
          {
            title: "Annual Sports Meet",
            category: "Sports",
            location: "Chennai",
            date: "2025-06-10",
            image: eventImages[2],
          },
        ];

  return loading ? (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mx-auto mb-6"></div>
        <p className="text-xl text-gray-700 font-semibold">
          Loading, please wait...
        </p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-6 py-8 font-sans">
      {/* Hero Section */}
      <motion.section
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-5xl font-extrabold mb-4">
          Find{" "}
          <span
            className={`transition-opacity text-blue-500 duration-400 ${
              fade ? "opacity-0" : "opacity-100"
            }`}
          >
            {currentWord}
          </span>{" "}
          near you
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Discover workshops, hackathons, meetups, and fests happening around
          your campus.
        </p>

        {/* Browse Events Button */}
        <div className="inline-block relative" ref={browseDropdownRef}>
          <button
            className="px-6 py-3 text-lg bg-gradient-to-r from-blue-500 to-indigo-600 hover:opacity-90 text-white rounded-full shadow-md"
            onClick={() => setShowBrowseDropdown(!showBrowseDropdown)}
          >
            Browse Events ✨
          </button>
          {/* Dropdown */}
          <AnimatePresence>
            {showBrowseDropdown && (
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-64 bg-white rounded-xl shadow-lg overflow-hidden z-10"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-2 space-y-2">
                  {["Technical", "Cultural", "Sports"].map((category) => (
                    <motion.button
                      key={category}
                      className="flex items-center justify-between w-full p-3 rounded-lg hover:bg-blue-50 text-left transition-colors"
                      onClick={() => handleCategorySelect(category)}
                      variants={categoryButtonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span className="font-medium text-gray-700">
                        {category}
                      </span>
                      <motion.div
                        variants={iconAnimationVariants[category.toLowerCase()]}
                        animate="animate"
                        className={
                          category === "Technical"
                            ? "text-blue-600"
                            : category === "Cultural"
                            ? "text-purple-600"
                            : "text-green-600"
                        }
                      >
                        {category === "Technical" && <CodeIcon size={18} />}
                        {category === "Cultural" && <MusicIcon size={18} />}
                        {category === "Sports" && <ActivityIcon size={18} />}
                      </motion.div>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Display selected category if any */}
        {selectedCategory && (
          <div className="mt-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {selectedCategory} Events
              <button
                className="ml-2 text-blue-600 hover:text-blue-800"
                onClick={() => setSelectedCategory("")}
              >
                <XIcon size={14} />
              </button>
            </span>
          </div>
        )}
      </motion.section>

      {/* Filters Toggle Button */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center px-4 py-2 rounded-lg border border-blue-300 text-blue-600 hover:bg-blue-50 transition-colors"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <section className="max-w-6xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="flex items-center border rounded-xl px-4 py-3 bg-white shadow-sm">
              <MapPinIcon className="mr-3 text-blue-500 w-5 h-5" />
              <select
                className="w-full text-gray-700 outline-none"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <option value="">Select Location</option>
                <option>Hyderabad</option>
                <option>Bangalore</option>
                <option>Gurugram</option>
                <option>Pune</option>
                <option>Kolkata</option>
                <option>Chennai</option>
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
        </section>
      )}

      {/* Event Cards */}
      <section className="max-w-6xl mx-auto">
        {eventsToDisplay.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {eventsToDisplay.map((event, index) => (
              <motion.div
                key={index}
                className="overflow-hidden rounded-2xl shadow-lg bg-white"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 200 }}
                onClick={() =>
                  navigate(`/events/${event.title}`, { state: { event } })
                }
              >
                <img
                  src={event.image || eventImages[index % eventImages.length]}
                  alt={event.title}
                  className="w-full h-44 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {event.title}
                    </h3>
                    <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {event.category}
                    </span>
                  </div>
                  <p className="text-gray-600 flex items-center mb-1">
                    <MapPinIcon className="w-4 h-4 mr-2 text-blue-500" />
                    {event.location}
                  </p>
                  <p className="text-gray-600 flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2 text-blue-500" />
                    {event.startTime ? event.startTime.slice(0, 10) : ""}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-gray-600">
              No events found matching your criteria. Try adjusting your
              filters.
            </p>
            <button
              className="mt-4 px-6 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              onClick={() => {
                setSelectedCategory("");
                setSelectedLocation("");
                setSelectedDate("");
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="mt-20 text-center text-sm text-gray-400">
        © 2025 UNIVO. Crafted with 💙 for students by students.
      </footer>

      {/* AI Recommender Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl p-6 max-w-xl w-full shadow-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <XIcon className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold mb-4 text-center">
                🎯 Recommended Events
              </h2>
              <div className="space-y-4">
                {recommendedEvents.length > 0 ? (
                  recommendedEvents.map((event, i) => (
                    <div
                      key={i}
                      className="p-4 border rounded-md shadow-sm bg-blue-50"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {event.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {event.location} - {event.date}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 text-center">No events found.</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
