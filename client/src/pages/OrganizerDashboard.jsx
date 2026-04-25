import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";
import profile from "../assets/team4.jpg";
import {useForm} from "react-hook-form";
import api from "../services/api";

// Detailed mock organizer profile
const organizerProfile = {
  name: "Dr. Rajesh Kumar",
  organization: "VNR Vignana Jyothi Institute of Engineering and Technology",
  department: "Computer Science & Engineering",
  position: "Faculty Coordinator",
  email: "rajesh.kumar@vnrvjiet.in",
  phone: "+91 9876543210",
  bio: "Faculty coordinator for technical events with 10+ years of experience organizing national-level symposiums and hackathons.",
  profileImage: "../../assets/team4.jpg",
  socialLinks: {
    linkedin: "https://linkedin.com/in/rajesh-kumar",
    twitter: "https://twitter.com/prof_rajesh",
    website: "https://cse.vnrvjiet.ac.in/faculty",
  },
  stats: {
    yearsActive: 5,
    totalEvents: 27,
    upcomingEvents: 3,
  },
};

// 5 detailed mock events
const mockEvents = [
  {
    id: "1",
    title: "Tech Symposium 2024",
    category: "Technical",
    type: "Conference",
    startTime: "2024-11-15T09:00:00Z",
    endTime: "2024-11-16T17:00:00Z",
    description:
      "Annual technical symposium featuring workshops, paper presentations, and coding competitions with industry experts.",
    participantLimit: 200,
    participants: Array(85)
      .fill()
      .map((_, i) => ({
        id: `p${i}`,
        name: `Participant ${i + 1}`,
        email: `participant${i + 1}@email.com`,
        department: ["CSE", "ECE", "EEE", "MECH"][
          Math.floor(Math.random() * 4)
        ],
        year: Math.floor(Math.random() * 4) + 1,
        registeredAt: new Date(
          Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),
    location: "College Main Auditorium",
    status: "upcoming",
    registrationFee: "Free",
    prizes: "₹50,000 in prizes",
    contactPerson: "Prof. Smitha (9898989898)",
  },
  {
    id: "2",
    title: "Hackathon 2024",
    category: "Coding",
    type: "Competition",
    startTime: "2024-09-20T10:00:00Z",
    endTime: "2024-09-21T18:00:00Z",
    description:
      "24-hour coding competition to solve real-world problems using innovative tech solutions.",
    participantLimit: 50,
    participants: Array(42)
      .fill()
      .map((_, i) => ({
        id: `h${i}`,
        name: `Hacker ${i + 1}`,
        email: `hacker${i + 1}@email.com`,
        department: ["CSE", "ECE"][Math.floor(Math.random() * 2)],
        year: Math.floor(Math.random() * 4) + 1,
        registeredAt: new Date(
          Date.now() - Math.random() * 15 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),
    location: "Computer Lab 3",
    status: "upcoming",
    registrationFee: "₹200 per team",
    prizes: "₹30,000 + Internship opportunities",
    contactPerson: "Dr. Gupta (9876543210)",
  },
  {
    id: "3",
    title: "Cultural Fest 2023",
    category: "Cultural",
    type: "Festival",
    startTime: "2023-12-05T10:00:00Z",
    endTime: "2023-12-07T22:00:00Z",
    description:
      "Annual cultural festival showcasing dance, music, drama and art competitions.",
    participantLimit: 300,
    participants: Array(156)
      .fill()
      .map((_, i) => ({
        id: `c${i}`,
        name: `Performer ${i + 1}`,
        email: `performer${i + 1}@email.com`,
        department: ["CSE", "ECE", "EEE", "MECH", "CIVIL"][
          Math.floor(Math.random() * 5)
        ],
        year: Math.floor(Math.random() * 4) + 1,
        registeredAt: new Date(
          Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),
    location: "Open Air Theater",
    status: "completed",
    registrationFee: "Free",
    prizes: "Trophies and certificates",
    contactPerson: "Prof. Reddy (9898767654)",
  },
  {
    id: "4",
    title: "Robotics Workshop",
    category: "Technical",
    type: "Workshop",
    startTime: "2024-10-10T14:00:00Z",
    endTime: "2024-10-12T16:00:00Z",
    description:
      "Hands-on workshop covering robotics fundamentals with Arduino and Raspberry Pi.",
    participantLimit: 30,
    participants: Array(28)
      .fill()
      .map((_, i) => ({
        id: `r${i}`,
        name: `Robotics Enthusiast ${i + 1}`,
        email: `robotics${i + 1}@email.com`,
        department: ["CSE", "ECE", "MECH"][Math.floor(Math.random() * 3)],
        year: Math.floor(Math.random() * 4) + 1,
        registeredAt: new Date(
          Date.now() - Math.random() * 10 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),
    location: "Engineering Block Room 205",
    status: "upcoming",
    registrationFee: "₹500 (includes kit)",
    prizes: "Certification",
    contactPerson: "Dr. Sharma (9876543211)",
  },
  {
    id: "5",
    title: "Career Fair 2023",
    category: "Professional",
    type: "Exhibition",
    startTime: "2023-08-25T09:00:00Z",
    endTime: "2023-08-25T17:00:00Z",
    description:
      "Opportunity to meet with top employers from IT, Core and other industries.",
    participantLimit: 500,
    participants: Array(387)
      .fill()
      .map((_, i) => ({
        id: `cf${i}`,
        name: `Student ${i + 1}`,
        email: `student${i + 1}@email.com`,
        department: ["CSE", "ECE", "EEE", "MECH", "CIVIL"][
          Math.floor(Math.random() * 5)
        ],
        year: Math.floor(Math.random() * 4) + 1,
        registeredAt: new Date(
          Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000
        ).toISOString(),
      })),
    location: "College Sports Complex",
    status: "completed",
    registrationFee: "Free",
    prizes: "Job offers",
    contactPerson: "Placement Office",
  },
];

const OrganizerDashboard = () => {




  const { register, handleSubmit, reset } = useForm();
  const [events, setEvents] = useState(mockEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    category: "Technical",
    type: "Workshop",
    startTime: "",
    endTime: "",
    description: "",
    participantLimit: 50,
    location: "",
    registrationFee: "Free",
    prizes: "",
    contactPerson: "",
  });
  const handleCreateEvent = async (formData) => {
    try {
      // Map the frontend form fields to the backend API expected fields
      const newEventData = {
        title: formData.title,
        category: formData.category,
        eventTags: [], // You can add this field to your form if needed
        startTime: formData.startTime,
        endTime: formData.endTime,
        eventDescription: formData.description, // Note the field name change
        eventOutcomes: "", // Add this field to your form or leave empty
        organizedBy: organizerProfile.name, // Use the organizer's name
        cost: formData.registrationFee,
        location: formData.location,
        participantLimit: Number(formData.participantLimit),
        organizerId: context.user?.id || "default-organizer-id", // Make sure you have this from context
        createdId: Date.now().toString(),
        points: 0, // Default value or add to your form
      };
      
      // Use the correct endpoint URL
      const response = await api.post("/event/create", newEventData);
      
      if (response.data && response.data.success) {
        // Add the newly created event to the state
        setEvents([...events, response.data.data]);
        
        // Close the form and reset values
        setShowForm(false);
        setNewEvent({
          title: "",
          category: "Technical",
          type: "Workshop",
          startTime: "",
          endTime: "",
          description: "",
          participantLimit: 50,
          location: "",
          registrationFee: "Free",
          prizes: "",
          contactPerson: "",
        });
        reset();
      } else {
        console.error("Error in response:", response.data);
        alert("Failed to create event. Please check the form data.");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      
      // Better error handling with specific messages
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        
        if (error.response.status === 400) {
          alert("Missing required fields: " + (error.response.data.message || ""));
        } else {
          alert("Server error: " + (error.response.data.message || "Unknown error"));
        }
      } else {
        alert("Network error. Please check your connection.");
      }
    }
  };
  const [activeTab, setActiveTab] = useState("events");

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };



  // Styles
  const styles = {
    dashboard: {
      fontFamily: "Arial, sans-serif",
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f5f7fa",
    },
    header: {
      backgroundColor: "#2c3e50",
      color: "white",
      padding: "20px",
      borderRadius: "8px",
      marginBottom: "20px",
      display: "flex",
      alignItems: "center",
    },
    profileImage: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginRight: "20px",
      objectFit: "cover",
      border: "3px solid white",
    },
    profileInfo: {
      flex: 1,
    },
    socialLinks: {
      display: "flex",
      gap: "10px",
      marginTop: "10px",
    },
    socialLink: {
      color: "white",
      textDecoration: "none",
      fontSize: "14px",
    },
    tabs: {
      display: "flex",
      marginBottom: "20px",
      borderBottom: "1px solid #ddd",
    },
    tab: {
      padding: "10px 20px",
      cursor: "pointer",
      borderBottom: activeTab === "events" ? "3px solid #3498db" : "none",
    },
    card: {
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    },
    statsContainer: {
      display: "flex",
      gap: "20px",
      marginBottom: "20px",
      flexWrap: "wrap",
    },
    statCard: {
      flex: 1,
      minWidth: "200px",
      backgroundColor: "white",
      borderRadius: "8px",
      padding: "15px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      textAlign: "center",
    },
    statValue: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#2c3e50",
      margin: "10px 0",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#f8f9fa",
      padding: "12px",
      textAlign: "left",
      borderBottom: "1px solid #ddd",
    },
    td: {
      padding: "12px",
      borderBottom: "1px solid #ddd",
    },
    button: {
      backgroundColor: "#3498db",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "4px",
      cursor: "pointer",
      marginRight: "5px",
      fontSize: "14px",
    },
    modalOverlay: {
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
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "8px",
      width: "80%",
      maxWidth: "800px",
      maxHeight: "80vh",
      overflow: "auto",
    },
    formInput: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ddd",
      boxSizing: "border-box",
    },
    formSelect: {
      width: "100%",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "4px",
      border: "1px solid #ddd",
      backgroundColor: "white",
    },
    eventDetail: {
      marginBottom: "15px",
    },
    detailLabel: {
      fontWeight: "bold",
      marginRight: "10px",
    },
  };
  const context = useContext(LoginContext);

  return (
    <div style={styles.dashboard}>
      {/* Profile Header */}
      <div style={styles.header}>
        <img src={profile} alt="Profile" style={styles.profileImage} />
        <div style={styles.profileInfo}>
          <h1>{context.user?.username}</h1>
          <p>
            {organizerProfile.position}, {organizerProfile.department}
          </p>
          <p>{organizerProfile.organization}</p>
          <div style={styles.socialLinks}>
            <a
              href={organizerProfile.socialLinks.linkedin}
              style={styles.socialLink}
            >
              LinkedIn
            </a>
            <a
              href={organizerProfile.socialLinks.twitter}
              style={styles.socialLink}
            >
              Twitter
            </a>
            <a
              href={organizerProfile.socialLinks.website}
              style={styles.socialLink}
            >
              Website
            </a>
          </div>
        </div>
        <div>
          <p>Email: {context.user?.username}@gmail.com</p>
          <p>Phone: {organizerProfile.phone}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div style={styles.statsContainer}>
        <div style={styles.statCard}>
          <h3>Years Active</h3>
          <div style={styles.statValue}>
            {organizerProfile.stats.yearsActive}
          </div>
        </div>
        <div style={styles.statCard}>
          <h3>Total Events</h3>
          <div style={styles.statValue}>
            {organizerProfile.stats.totalEvents}
          </div>
        </div>
        <div style={styles.statCard}>
          <h3>Upcoming Events</h3>
          <div style={styles.statValue}>
            {organizerProfile.stats.upcomingEvents}
          </div>
        </div>
        <div style={styles.statCard}>
          <h3>Total Participants</h3>
          <div style={styles.statValue}>
            {events.reduce((sum, event) => sum + ((event.participants && event.participants.length) || 0), 0)}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <div
          style={{
            ...styles.tab,
            borderBottom: activeTab === "events" ? "3px solid #3498db" : "none",
            color: activeTab === "events" ? "#3498db" : "#7f8c8d",
          }}
          onClick={() => setActiveTab("events")}
        >
          My Events
        </div>
        <div
          style={{
            ...styles.tab,
            borderBottom:
              activeTab === "profile" ? "3px solid #3498db" : "none",
            color: activeTab === "profile" ? "#3498db" : "#7f8c8d",
          }}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </div>
      </div>

      {/* Events Tab */}
      {activeTab === "events" && (
        <div style={styles.card}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>Your Events</h2>
            <button
              style={{ ...styles.button, backgroundColor: "#2ecc71" }}
              onClick={() => setShowForm(true)}
            >
              Create New Event
            </button>
          </div>

          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Event Title</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Participants</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event,index) => (
                <tr key={index}>
                  <td style={styles.td}>{event.title}</td>
                  <td style={styles.td}>{event.type}</td>
                  <td style={styles.td}>
                    {formatDate(event.startTime)} - {formatDate(event.endTime)}
                  </td>
                  <td style={styles.td}>
                    {event.participants ? event.participants.length : 0}/{event.participantLimit}
                  </td>
                  <td style={styles.td}>
                    <span
                      style={{
                        color:
                          event.status === "upcoming"
                            ? "#3498db"
                            : event.status === "completed"
                            ? "#7f8c8d"
                            : "#2ecc71",
                        fontWeight: "bold",
                      }}
                    >
                      {event.status ? event.status.charAt(0).toUpperCase() +
                        event.status.slice(1) : ''}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, backgroundColor: "#3498db" }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "profile" && (
        <div style={styles.card}>
          <h2>Profile Information</h2>

          <div style={{ display: "flex", gap: "30px", marginTop: "20px" }}>
            <div style={{ flex: 1 }}>
              <div style={styles.eventDetail}>
                <span style={styles.detailLabel}>Name:</span>
                <span>{organizerProfile.name}</span>
              </div>
              <div style={styles.eventDetail}>
                <span style={styles.detailLabel}>Position:</span>
                <span>{organizerProfile.position}</span>
              </div>
              <div style={styles.eventDetail}>
                <span style={styles.detailLabel}>Department:</span>
                <span>{organizerProfile.department}</span>
              </div>
              <div style={styles.eventDetail}>
                <span style={styles.detailLabel}>Organization:</span>
                <span>{organizerProfile.organization}</span>
              </div>
            </div>

            <div style={{ flex: 1 }}>
              <div style={styles.eventDetail}>
                <span style={styles.detailLabel}>Email:</span>
                <span>{organizerProfile.email}</span>
              </div>
              <div style={styles.eventDetail}>
                <span style={styles.detailLabel}>Phone:</span>
                <span>{organizerProfile.phone}</span>
              </div>
              <div style={styles.eventDetail}>
                <span style={styles.detailLabel}>Years Active:</span>
                <span>{organizerProfile.stats.yearsActive}</span>
              </div>
              <div style={styles.eventDetail}>
                <span style={styles.detailLabel}>Bio:</span>
                <p>{organizerProfile.bio}</p>
              </div>
            </div>
          </div>

          <h3 style={{ marginTop: "30px" }}>Social Links</h3>
          <div style={{ display: "flex", gap: "15px", marginTop: "10px" }}>
            <a href={organizerProfile.socialLinks.linkedin} style={styles.button}>
              LinkedIn
            </a>
            <a href={organizerProfile.socialLinks.twitter} style={styles.button}>
              Twitter
            </a>
            <a href={organizerProfile.socialLinks.website} style={styles.button}>
              Website
            </a>
          </div>
        </div>
      )}

{/* Create Event Form using react-hook-form */}
{showForm && (
  <div style={styles.modalOverlay}>
    <div style={styles.modalContent}>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit(handleCreateEvent)}>
        <input
          type="text"
          placeholder="Event Title *"
          {...register("title", { required: true })}
          style={styles.formInput}
        />

        <select {...register("category")} style={styles.formSelect}>
          <option value="Technical">Technical</option>
          <option value="Cultural">Cultural</option>
          <option value="Workshop">Workshop</option>
          <option value="Professional">Professional</option>
          <option value="Coding">Coding</option>
        </select>

        <select {...register("type")} style={styles.formSelect}>
          <option value="Workshop">Workshop</option>
          <option value="Conference">Conference</option>
          <option value="Competition">Competition</option>
          <option value="Festival">Festival</option>
          <option value="Exhibition">Exhibition</option>
        </select>

        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <label>Start Time *</label>
            <input
              type="datetime-local"
              {...register("startTime", { required: true })}
              style={styles.formInput}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label>End Time *</label>
            <input
              type="datetime-local"
              {...register("endTime", { required: true })}
              style={styles.formInput}
            />
          </div>
        </div>

        <textarea
          placeholder="Event Description *"
          {...register("description", { required: true })}
          style={{ ...styles.formInput, minHeight: "100px" }}
        />
        
        <textarea
          placeholder="Event Outcomes (What participants will learn/gain)"
          {...register("eventOutcomes")}
          style={{ ...styles.formInput, minHeight: "80px" }}
        />

        <input
          type="text"
          placeholder="Location/Venue *"
          {...register("location", { required: true })}
          style={styles.formInput}
        />

        <input
          type="number"
          placeholder="Participant Limit"
          {...register("participantLimit", { min: 1 })}
          style={styles.formInput}
        />

        <input
          type="text"
          placeholder="Registration Fee"
          {...register("registrationFee")}
          style={styles.formInput}
        />

        <input
          type="text"
          placeholder="Prizes/Awards"
          {...register("prizes")}
          style={styles.formInput}
        />

        <input
          type="text"
          placeholder="Contact Person Details"
          {...register("contactPerson")}
          style={styles.formInput}
        />

        <div style={{ marginTop: "20px", textAlign: "right" }}>
          <button
            type="button"
            style={{ ...styles.button, backgroundColor: "#e74c3c" }}
            onClick={() => {
              reset();
              setShowForm(false);
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            style={{ ...styles.button, backgroundColor: "#2ecc71" }}
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  </div>
)}
      {selectedEvent && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2>{selectedEvent.title}</h2>
            <p style={{ color: "#7f8c8d", marginBottom: "20px" }}>
              {selectedEvent.category} • {selectedEvent.type}
            </p>

            <div style={{ display: "flex", gap: "30px", marginBottom: "20px" }}>
              <div style={{ flex: 1 }}>
                <div style={styles.eventDetail}>
                  <span style={styles.detailLabel}>Date:</span>
                  <span>
                    {formatDate(selectedEvent.startTime)} -{" "}
                    {formatDate(selectedEvent.endTime)}
                  </span>
                </div>
                <div style={styles.eventDetail}>
                  <span style={styles.detailLabel}>Location:</span>
                  <span>{selectedEvent.location}</span>
                </div>
                <div style={styles.eventDetail}>
                  <span style={styles.detailLabel}>Registration:</span>
                  <span>{selectedEvent.registrationFee}</span>
                </div>
                <div style={styles.eventDetail}>
                  <span style={styles.detailLabel}>Participants:</span>
                  <span>
                    {selectedEvent.participants.length}/
                    {selectedEvent.participantLimit}
                  </span>
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <div style={styles.eventDetail}>
                  <span style={styles.detailLabel}>Status:</span>
                  <span
                    style={{
                      color:
                        selectedEvent.status === "upcoming"
                          ? "#3498db"
                          : selectedEvent.status === "completed"
                          ? "#7f8c8d"
                          : "#2ecc71",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedEvent.status.charAt(0).toUpperCase() +
                      selectedEvent.status.slice(1)}
                  </span>
                </div>
                <div style={styles.eventDetail}>
                  <span style={styles.detailLabel}>Prizes:</span>
                  <span>{selectedEvent.prizes}</span>
                </div>
                <div style={styles.eventDetail}>
                  <span style={styles.detailLabel}>Contact:</span>
                  <span>{selectedEvent.contactPerson}</span>
                </div>
              </div>
            </div>

            <div style={styles.eventDetail}>
              <span style={styles.detailLabel}>Description:</span>
              <p>{selectedEvent.description}</p>
            </div>

            <h3>Participants ({selectedEvent.participants.length})</h3>
            <div
              style={{
                maxHeight: "300px",
                overflowY: "auto",
                marginTop: "10px",
              }}
            >
              <table style={{ ...styles.table, width: "100%" }}>
                <thead>
                  <tr>
                    <th style={styles.th}>Name</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Department</th>
                    <th style={styles.th}>Year</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedEvent.participants.map((participant) => (
                    <tr key={participant.id}>
                      <td style={styles.td}>{participant.name}</td>
                      <td style={styles.td}>{participant.email}</td>
                      <td style={styles.td}>{participant.department}</td>
                      <td style={styles.td}>Year {participant.year}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button
              style={{ ...styles.button, marginTop: "20px" }}
              onClick={() => setSelectedEvent(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrganizerDashboard;
