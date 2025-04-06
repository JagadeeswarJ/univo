import { CloudHail } from "lucide-react";
import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import paymentHandler from "../services/payment.service";

const Event = () => {
  const eventImages = [
    "https://magazinelondon.co.uk/wp-content/uploads/2023/10/JA-MAGAZINE-BTF23-2212-2600x1500.jpg",
    "https://blog.coupondunia.in/wp-content/uploads/2014/07/college-fest.jpg",
    "https://cdn.bleacherreport.net/images_root/slides/photos/000/595/808/102809752_original.jpg?1293506368",
  ];
  const location = useLocation();
  const { eventId } = useParams();
  const navigate = useNavigate();
  const context = useContext(LoginContext);

  async function onPay(data) {
    console.log(data);
    data.amount = Number(data.amount);
    await paymentHandler(data, navigate, context);
  }

  // Initialize state
  const [event, setEvent] = useState(location.state?.event || null);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState(0);
  const [showRegistration, setShowRegistration] = useState(false);

  // College address details
  const collegeAddress =
    "VNR Vignana Jyothi Institute of Engineering and Technology, Bachupally, Nizampet Rd, Hyderabad, Telangana 500090";
  const collegeMapLink = `https://maps.google.com/maps?q=${encodeURIComponent(
    collegeAddress
  )}&output=embed`;

  useEffect(() => {
    console.log(context.user);
    const fetchEventData = async () => {
      try {
        // Mock data - replace with actual API call
        const mockEvent = {};

        // Only set event if it's not already set from location state
        if (!event) {
          setEvent(mockEvent);
        }

        setRegistrations(Math.min(20, event?.limit || 0));
        setLoading(false);
      } catch (err) {
        console.error("Failed to load event:", err);
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId, event]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleRegister = () => {
    setShowRegistration(true);
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    rollNumber: "",
    department: "CSE",
    year: "2",
    gender: "male",
    college: "VNR Vignana Jyothi",
    accommodation: false,
    foodPreference: "vegetarian",
    emergencyContact: "",
    agreeTerms: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.rollNumber.trim()) {
      newErrors.rollNumber = "Roll number is required";
    }

    if (!formData.emergencyContact.trim()) {
      newErrors.emergencyContact = "Emergency contact is required";
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Submit form logic here
      console.log("Form submitted:", formData);
      setShowRegistration(false);
    }
  };

  // Inline styles
  const styles = {
    modal: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
      padding: "20px",
    },
    formContainer: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "25px",
      width: "100%",
      maxWidth: "600px",
      maxHeight: "90vh",
      overflowY: "auto",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "5px",
      fontWeight: "500",
    },
    input: {
      width: "100%",
      padding: "8px",
      borderRadius: "4px",
      border: "1px solid #ddd",
    },
    error: {
      color: "red",
      fontSize: "12px",
      marginTop: "5px",
    },
    checkboxGroup: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    submitBtn: {
      backgroundColor: "#4CAF50",
      color: "white",
      padding: "10px 15px",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
      fontSize: "16px",
      width: "100%",
    },
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="animate-pulse text-gray-600 text-lg">
          Loading event details...
        </div>
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-red-500 text-lg">Event not found</div>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Event Header - Mobile First */}
      <div className="mb-6 sm:mb-8">
        <img
          src={event.image || eventImages[0]}
          alt={event.title}
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-md"
        />
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
          <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
            {event.category}
          </span>
          {event.eventTags?.map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
        {/* Left Column - Main Content (Stack on mobile) */}
        <div className="lg:w-2/3 space-y-6 md:space-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            {event.title}
          </h1>

          {/* About Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">
              About
            </h2>
            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">
              {event.description}
            </p>
          </section>

          {/* Outcomes Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">
              Key Takeaways
            </h2>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              {event.outcomes?.split(", ").map((item, i) => (
                <li key={i} className="text-gray-700">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* Organizer Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">
              Organizer
            </h2>
            <p className="text-gray-700 text-sm sm:text-base">
              {event.organizer}
            </p>
          </section>

          {/* Location Section */}
          <section className="pb-6 md:pb-0">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">
              Venue
            </h2>
            <div className="h-48 sm:h-64 md:h-80 bg-gray-100 rounded-lg overflow-hidden mb-2">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                style={{ border: 0 }}
                src={collegeMapLink}
                allowFullScreen
                aria-hidden="false"
                tabIndex="0"
                loading="lazy"
                className="bg-gray-200"
              />
            </div>
            <p className="text-gray-600 text-sm sm:text-base">
              <span className="font-medium">Address:</span> {collegeAddress}
            </p>
          </section>
        </div>

        {/* Right Column - Sidebar (Full width on mobile, sticky on desktop) */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:sticky lg:top-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Date & Time */}
              <div>
                <h3 className="font-semibold text-lg sm:text-xl mb-2 text-gray-800">
                  Date & Time
                </h3>
                <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Starts:</p>
                      <p>{event.startTime && formatDate(event.startTime)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <p className="font-medium">Ends:</p>
                      <p>{event.endTime && formatDate(event.endTime)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Cost</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {event.cost === "free" ? "Free" : `${event.cost}`}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm sm:text-base">
                    Availability
                  </h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {registrations}/{event.limit} spots
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1 sm:mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(registrations / event.limit) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {event.points > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">
                      Reward Points
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                      {event.points} points
                    </p>
                  </div>
                )}
              </div>

              {/* Register Button */}
              <button
                onClick={handleRegister}
                style={{
                  backgroundColor: "#2196F3",
                  color: "white",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontSize: "16px",
                  marginTop: "20px",
                }}
              >
                Register Now
              </button>

              {/* Registration Form */}
              {showRegistration && (
                <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto text-center">
                  <h2 className="text-2xl font-semibold mb-4">{event.title}</h2>
                  <p className="text-lg text-gray-700 mb-6">{event.cost}</p>
                  <button
                    className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition duration-300"
                    onClick={() =>
                      onPay({
                        eventId: event.eventId,
                        userId: context.user.username,
                        amount: event.cost,
                      })
                    }
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Event;
