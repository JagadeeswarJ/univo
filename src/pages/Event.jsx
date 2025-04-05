import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';

const Event = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registrations, setRegistrations] = useState(0);
  const [showRegistration, setShowRegistration] = useState(false);
  // College address details
  const collegeAddress = "VNR Vignana Jyothi Institute of Engineering and Technology, Bachupally, Nizampet Rd, Hyderabad, Telangana 500090";
  const collegeMapLink = `https://maps.google.com/maps?q=${encodeURIComponent(collegeAddress)}&output=embed`;

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        // Mock data - replace with actual API call
        const mockEvent = {
          id: eventId,
          title: "Tech Symposium 2024",
          category: "Technical",
          eventTags: ["Workshop", "Coding", "Robotics"],
          startTime: "2024-11-15T09:00:00Z",
          endTime: "2024-11-16T17:00:00Z",
          description: "Annual technical symposium featuring workshops, competitions, and guest lectures.",
          outcomes: "Skill development, Networking, Certificates",
          organizer: "ACM Student Chapter",
          cost: "free",
          location: collegeAddress,
          limit: 200,
          points: 30,
          poster: "https://via.placeholder.com/800x400?text=Tech+Symposium"
        };

        setEvent(mockEvent);
        setRegistrations(Math.min(20, mockEvent.limit));
        setLoading(false);
      } catch (err) {
        console.error("Failed to load event:", err);
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRegister = () => {
    navigate(`/register/${eventId}`);
  };
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    rollNumber: '',
    department: 'CSE',
    year: '2',
    gender: 'male',
    college: 'VNR Vignana Jyothi',
    accommodation: false,
    foodPreference: 'vegetarian',
    emergencyContact: '',
    agreeTerms: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Must be 10 digits';
    }
    if (!formData.rollNumber) newErrors.rollNumber = 'Roll number is required';
    if (!formData.emergencyContact) newErrors.emergencyContact = 'Emergency contact is required';
    if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Save to localStorage
      const registrations = JSON.parse(localStorage.getItem('eventRegistrations') || []);
      registrations.push({
        ...formData,
        eventId: event.id,
        registeredAt: new Date().toISOString()
      });
      localStorage.setItem('eventRegistrations', JSON.stringify(registrations));
      
      alert(`Registration successful for ${event.title}!`);
      setShowRegistration(false);
    }
  };

  // Inline styles
  const styles = {
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      padding: '20px'
    },
    formContainer: {
      backgroundColor: 'white',
      borderRadius: '8px',
      padding: '25px',
      width: '100%',
      maxWidth: '600px',
      maxHeight: '90vh',
      overflowY: 'auto'
    },
    formGroup: {
      marginBottom: '15px'
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: '500'
    },
    input: {
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd'
    },
    error: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px'
    },
    checkboxGroup: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    submitBtn: {
      backgroundColor: '#4CAF50',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '16px',
      width: '100%'
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="animate-pulse text-gray-600 text-lg">Loading event details...</div>
    </div>
  );

  if (!event) return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-red-500 text-lg">Event not found</div>
    </div>
  );

  const isFull = registrations >= event.limit;

  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      {/* Event Header - Mobile First */}
      <div className="mb-6 sm:mb-8">
        <img 
          src={event.poster} 
          alt={event.title} 
          className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg shadow-md"
        />
        <div className="mt-3 sm:mt-4 flex flex-wrap items-center gap-2">
          <span className="bg-blue-100 text-blue-800 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
            {event.category}
          </span>
          {event.eventTags.map((tag, i) => (
            <span key={i} className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded-full text-xs">
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
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">About</h2>
            <p className="text-gray-700 text-sm sm:text-base whitespace-pre-line">
              {event.description}
            </p>
          </section>

          {/* Outcomes Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">Key Takeaways</h2>
            <ul className="list-disc pl-5 space-y-1 text-sm sm:text-base">
              {event.outcomes.split(', ').map((item, i) => (
                <li key={i} className="text-gray-700">{item}</li>
              ))}
            </ul>
          </section>

          {/* Organizer Section */}
          <section>
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">Organizer</h2>
            <p className="text-gray-700 text-sm sm:text-base">{event.organizer}</p>
          </section>

          {/* Location Section */}
          <section className="pb-6 md:pb-0">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2 sm:mb-3 text-gray-800">Venue</h2>
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
                <h3 className="font-semibold text-lg sm:text-xl mb-2 text-gray-800">Date & Time</h3>
                <div className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <div>
                      <p className="font-medium">Starts:</p>
                      <p>{formatDate(event.startTime)}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Ends:</p>
                      <p>{formatDate(event.endTime)}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Cost</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {event.cost === "free" ? "Free" : `$${event.cost}`}
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm sm:text-base">Availability</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {registrations}/{event.limit} spots
                  </p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-1 sm:mt-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(registrations / event.limit) * 100}%` }}
                    />
                  </div>
                </div>

                {event.points > 0 && (
                  <div>
                    <h3 className="font-semibold text-sm sm:text-base">Reward Points</h3>
                    <p className="text-gray-700 text-sm sm:text-base">{event.points} points</p>
                  </div>
                )}
              </div>

              {/* Register Button */}
              {/* <button
                onClick={() => setShowRegistration(true)}  // Add this line
                disabled={isFull}
                className={`w-full py-3 rounded-md font-medium text-white ${
                  isFull ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {isFull ? 'Event Full' : 'Register Now'}
              </button> */}
              <button 
                onClick={() => setShowRegistration(true)}
                style={{
                  backgroundColor: '#2196F3',
                  color: 'white',
                  padding: '10px 20px',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  marginTop: '20px'
                }}
              >
                Register Now
              </button>
              {/* Registration Form - Paste this right after your button
      {showRegistration && (
        <RegistrationForm 
          eventTitle={event.title} 
          onClose={() => setShowRegistration(false)} 
        />
      )} */}
      {/* Registration Form */}
      {showRegistration && (
        <div style={styles.modal}>
          <div style={styles.formContainer}>
            <h2 style={{ marginTop: 20 }}>Register for {event.title}</h2>
            
            <form onSubmit={handleSubmit}>
              {/* Personal Information */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                {errors.fullName && <span style={styles.error}>{errors.fullName}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                {errors.email && <span style={styles.error}>{errors.email}</span>}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                {errors.phone && <span style={styles.error}>{errors.phone}</span>}
              </div>

              {/* Academic Information */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Roll Number *</label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                {errors.rollNumber && <span style={styles.error}>{errors.rollNumber}</span>}
              </div>

              <div style={{ display: 'flex', gap: '15px' }}>
                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Department</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    style={styles.input}
                  >
                    <option value="CSE">Computer Science</option>
                    <option value="ECE">Electronics</option>
                    <option value="EEE">Electrical</option>
                    <option value="MECH">Mechanical</option>
                    <option value="CIVIL">Civil</option>
                  </select>
                </div>

                <div style={{ ...styles.formGroup, flex: 1 }}>
                  <label style={styles.label}>Year</label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    style={styles.input}
                  >
                    <option value="1">First Year</option>
                    <option value="2">Second Year</option>
                    <option value="3">Third Year</option>
                    <option value="4">Fourth Year</option>
                  </select>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>College</label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  style={styles.input}
                />
              </div>

              {/* Additional Information */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Gender</label>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === 'male'}
                      onChange={handleInputChange}
                    /> Male
                  </label>
                  <label style={{ marginLeft: '15px' }}>
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === 'female'}
                      onChange={handleInputChange}
                    /> Female
                  </label>
                  <label style={{ marginLeft: '15px' }}>
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={formData.gender === 'other'}
                      onChange={handleInputChange}
                    /> Other
                  </label>
                </div>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Food Preference</label>
                <select
                  name="foodPreference"
                  value={formData.foodPreference}
                  onChange={handleInputChange}
                  style={styles.input}
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="non-vegetarian">Non-Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Emergency Contact Number *</label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleInputChange}
                  style={styles.input}
                />
                {errors.emergencyContact && <span style={styles.error}>{errors.emergencyContact}</span>}
              </div>

              <div style={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="accommodation"
                  name="accommodation"
                  checked={formData.accommodation}
                  onChange={handleInputChange}
                />
                <label htmlFor="accommodation">I require accommodation</label>
              </div>

              <div style={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleInputChange}
                />
                <label htmlFor="agreeTerms">I agree to the terms and conditions *</label>
                {errors.agreeTerms && <span style={styles.error}>{errors.agreeTerms}</span>}
              </div>

              <button type="submit" style={styles.submitBtn}>
                Submit Registration
              </button>
            </form>
          </div>
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