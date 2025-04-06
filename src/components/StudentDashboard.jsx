import React, { useState, useEffect, useContext } from "react";
import { LoginContext } from "../context/LoginContext";

// Gamification logic
const calculateLevel = (xp) => Math.floor(xp / 100);
const calculateXPToNextLevel = (xp) => 100 - (xp % 100);

const useGamification = () => {
  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState([]);

  useEffect(() => {
    setLevel(calculateLevel(xp));
  }, [xp]);

  const addXP = (amount) => {
    setXP((prevXP) => prevXP + amount);
  };

  const unlockBadge = (badge) => {
    if (!badges.includes(badge)) {
      setBadges((prevBadges) => [...prevBadges, badge]);
    }
  };

  return { xp, level, badges, addXP, unlockBadge };
};
import {
  UserCircle,
  Award,
  BadgeCheck,
  FileText,
  Calendar,
  BookOpen,
  Code,
  Server,
  Database,
  Layers,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const StudentDashboard = () => {
  const [showAllEvents, setShowAllEvents] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const context = useContext(LoginContext);
  console.log(context.user);
  // Weekly activity data with more realistic numbers
  const weeklyActivityData = [
    { day: "Mon", problems: 3, hours: 2.5 },
    { day: "Tue", problems: 7, hours: 3.2 },
    { day: "Wed", problems: 2, hours: 1.5 },
    { day: "Thu", problems: 8, hours: 4.0 },
    { day: "Fri", problems: 5, hours: 2.8 },
    { day: "Sat", problems: 10, hours: 5.5 },
    { day: "Sun", problems: 4, hours: 2.1 },
  ];

  const maxActivity = Math.max(
    ...weeklyActivityData.map((item) => item.problems)
  );
  const totalProblems = weeklyActivityData.reduce(
    (sum, day) => sum + day.problems,
    0
  );
  const totalHours = weeklyActivityData
    .reduce((sum, day) => sum + day.hours, 0)
    .toFixed(1);

  // Skill proficiency data
  const skills = [
    { name: "Algorithms", value: 85, color: "bg-blue-500" },
    { name: "Data Structures", value: 70, color: "bg-indigo-500" },
    { name: "Web Dev", value: 90, color: "bg-purple-500" },
    { name: "Database", value: 65, color: "bg-pink-500" },
    { name: "AI/ML", value: 55, color: "bg-red-500" },
  ];
  // Helper function to generate random performance data for monthly and weekly trends
  const generatePerformanceData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
    const weeklyDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const monthlyPerformance = months.map((month, index) => ({
      month,
      events: Math.floor(Math.random() * 10) + 1, // Random events count between 1 and 10
    }));

    const weeklyPerformance = weeklyDays.map((day, index) => ({
      day,
      problems: Math.floor(Math.random() * 10) + 1, // Random problems count between 1 and 10
      hours: (Math.random() * 5).toFixed(1), // Random hours between 0 and 5
    }));

    return { monthlyPerformance, weeklyPerformance };
  };

  const { monthlyPerformance, weeklyPerformance } = generatePerformanceData();
  // Event participation data for pie chart
  const eventTypes = [
    {
      name: "Hackathons",
      count: 5,
      color: "bg-emerald-500",
      colorHex: "#10b981",
    },
    { name: "Workshops", count: 8, color: "bg-amber-500", colorHex: "#f59e0b" },
    {
      name: "Competitions",
      count: 12,
      color: "bg-sky-500",
      colorHex: "#0ea5e9",
    },
    {
      name: "Seminars",
      count: 4,
      color: "bg-fuchsia-500",
      colorHex: "#d946ef",
    },
  ];

  const totalEvents = eventTypes.reduce((sum, type) => sum + type.count, 0);

  // Detailed events data
  const allEvents = [
    {
      id: 1,
      title: "HackNex 2025",
      date: "12 March 2024",
      status: "Completed",
      description:
        "A 48-hour hackathon focused on creating innovative solutions for climate change using emerging technologies. Teams of 3-5 participants worked on projects involving AI, IoT, and blockchain.",
      location: "Tech Innovation Hub, Building 5",
      organizer: "TechNex Foundation",
      achievements: "Second Place Overall, Best Use of AI",
    },
    {
      id: 2,
      title: "AI Expo",
      date: "12 April 2024",
      status: "Registered",
      description:
        "An expo showcasing the latest advancements in artificial intelligence and machine learning. Features keynote speakers from leading tech companies and research institutions.",
      location: "Convention Center, Hall A",
      organizer: "AI Research Alliance",
      schedule: "9:00 AM - 6:00 PM",
    },
    {
      id: 3,
      title: "CodeSprint 2.0",
      date: "18 March 2024",
      status: "View Details",
      description:
        "A competitive coding challenge where participants solve algorithmic problems within a time limit. Problems range from easy to hard difficulty levels, testing various aspects of computer science knowledge.",
      location: "Online (Virtual Event)",
      organizer: "CodeMasters Academy",
      duration: "3 hours",
    },
    {
      id: 4,
      title: "Data Science Workshop",
      date: "24 April 2024",
      status: "Registered",
      description:
        "Hands-on workshop covering data analysis, visualization, and machine learning techniques using Python. Participants will work with real-world datasets to build predictive models.",
      location: "Learning Center, Room 304",
      organizer: "Data Analytics Club",
      prerequisites: "Basic Python knowledge recommended",
    },
    {
      id: 5,
      title: "Cloud Computing Summit",
      date: "5 May 2024",
      status: "Registered",
      description:
        "A summit focused on cloud architecture, serverless computing, and DevOps practices. Includes technical sessions and hands-on labs with major cloud providers.",
      location: "Grand Tech Hotel, Conference Room B",
      organizer: "Cloud Professionals Network",
      speakers: "Engineers from AWS, Azure, and Google Cloud",
    },
    {
      id: 6,
      title: "Web Dev Bootcamp",
      date: "2 March 2024",
      status: "Completed",
      description:
        "Intensive 2-day bootcamp covering modern web development frameworks and best practices. Topics included React, Node.js, and responsive design principles.",
      location: "Digital Learning Center",
      organizer: "Frontend Masters",
      certification: "Certificate of Completion Awarded",
    },
  ];

  const displayedEvents = showAllEvents ? allEvents : allEvents.slice(0, 3);

  // Calculate angle for pie chart segments
  const calculatePieSegments = () => {
    const context = useContext(LoginContext);
    console.log(context.user);
    let startAngle = 0;
    return eventTypes.map((type) => {
      const percentage = (type.count / totalEvents) * 100;
      const degrees = (percentage / 100) * 360;
      const segmentPath = describeArc(
        50,
        50,
        40,
        startAngle,
        startAngle + degrees
      );
      const midAngle = startAngle + degrees / 2;

      // Calculate label position
      const labelRadius = 65;
      const labelX =
        50 + labelRadius * Math.cos(((midAngle - 90) * Math.PI) / 180);
      const labelY =
        50 + labelRadius * Math.sin(((midAngle - 90) * Math.PI) / 180);

      const result = {
        path: segmentPath,
        color: type.colorHex,
        percentage,
        labelX,
        labelY,
        name: type.name,
        count: type.count,
      };

      startAngle += degrees;
      return result;
    });
  };

  const pieSegments = calculatePieSegments();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 bg-gray-50 min-h-screen">
      {/* Header with Tabs */}
      <div className="mb-8">
        <h2 className="text-4xl font-bold mb-4 text-gray-800 flex items-center">
          Welcome back, {context.user?.username}
          <span className="ml-2 text-4xl">👋</span>
        </h2>
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "overview"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("performance")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "performance"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
          >
            Performance
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "events"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
          >
            Events
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "certificates"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600"
            }`}
          >
            Certificates
          </button>
        </div>
      </div>

      {activeTab === "overview" && (
        <>
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
              <div className="relative mb-4">
                <UserCircle className="w-24 h-24 text-indigo-600" />
                <div className="absolute bottom-0 right-0 bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
              </div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {context.user?.username}
              </h3>
              <p className="text-gray-500 text-sm mb-4">Student | Semester 5</p>
              <div className="w-full">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Profile Completeness</span>
                  <span>85%</span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-4/5 rounded-full"></div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <Stat
                icon={<Award className="w-5 h-5" />}
                label="Events"
                value="3"
              />
              <Stat
                icon={<FileText className="w-5 h-5" />}
                label="Participations"
                value="12"
              />
              <Stat
                icon={<BadgeCheck className="w-5 h-5" />}
                label="Certificates"
                value="4"
              />
              <Stat
                icon={<BookOpen className="w-5 h-5" />}
                label="Problems Solved"
                value="247"
              />
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Activity Chart */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-gray-800">
                  Weekly Activity
                </h4>
                <div className="text-sm">
                  <span className="font-medium text-indigo-600">
                    {totalProblems}
                  </span>{" "}
                  problems solved ·
                  <span className="font-medium text-indigo-600 ml-1">
                    {totalHours}
                  </span>{" "}
                  hours
                </div>
              </div>
              <div className="h-64">
                <div className="flex items-end h-48 space-x-2 mb-2">
                  {weeklyActivityData.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center flex-1"
                    >
                      <div
                        className="w-full bg-indigo-500 rounded-t-lg hover:bg-indigo-600 transition-all cursor-pointer relative group"
                        style={{
                          height: `${
                            (item.problems / maxActivity) * 100 || 10
                          }%`,
                          minHeight: "10px",
                        }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.problems} problems
                          <br />
                          {item.hours} hours
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        {item.day}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  {weeklyActivityData.map((item, index) => (
                    <div key={index} className="text-center flex-1">
                      <div>{item.day}</div>
                      <div className="font-semibold">{item.problems}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Skills Distribution */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">
                Skills Distribution
              </h4>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">
                        {skill.name}
                      </span>
                      <span>{skill.value}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${skill.color} rounded-full`}
                        style={{ width: `${skill.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Event Participation */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h4 className="text-lg font-semibold text-gray-800">My Events</h4>
              <button
                onClick={() => setShowAllEvents(!showAllEvents)}
                className="text-indigo-600 flex items-center text-sm font-medium hover:text-indigo-800"
              >
                {showAllEvents ? (
                  <>
                    Show Less <ChevronUp className="ml-1 w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show All <ChevronDown className="ml-1 w-4 h-4" />
                  </>
                )}
              </button>
            </div>
            <div className="space-y-4">
              {displayedEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onViewDetails={() => setSelectedEvent(event)}
                />
              ))}
            </div>
          </div>
        </>
      )}

      {activeTab === "performance" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Type Distribution - PIE CHART */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-6">
              Event Participation
            </h4>
            <div className="flex justify-center mb-8">
              <div className="relative w-64 h-64">
                <svg viewBox="0 0 100 100">
                  {pieSegments.map((segment, i) => (
                    <path
                      key={i}
                      d={segment.path}
                      fill={segment.color}
                      stroke="#ffffff"
                      strokeWidth="1"
                    />
                  ))}
                  <circle cx="50" cy="50" r="25" fill="#ffffff" />
                  <text
                    x="50"
                    y="46"
                    textAnchor="middle"
                    fontSize="8"
                    fontWeight="bold"
                    fill="#333333"
                  >
                    {totalEvents}
                  </text>
                  <text
                    x="50"
                    y="56"
                    textAnchor="middle"
                    fontSize="5"
                    fill="#666666"
                  >
                    Total Events
                  </text>
                </svg>

                {/* Legend */}
                <div className="absolute top-full left-0 right-0 mt-6">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {eventTypes.map((type, i) => (
                      <div key={i} className="flex items-center text-sm">
                        <div
                          className={`w-3 h-3 rounded-full ${type.color} mr-2`}
                        ></div>
                        <span>
                          {type.name} ({type.count})
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-2">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Tech Stack Proficiency
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <TechStackCard icon={<Code />} name="Frontend" percentage={92} />
              <TechStackCard icon={<Server />} name="Backend" percentage={78} />
              <TechStackCard
                icon={<Database />}
                name="Database"
                percentage={65}
              />
              <TechStackCard icon={<Layers />} name="DevOps" percentage={42} />
              <TechStackCard icon={<BookOpen />} name="ML/AI" percentage={58} />
            </div>
          </div>
          {/* Weekly Performance Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-3">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Weekly Performance
            </h4>
            <div className="h-64 flex items-end">
              <div className="flex-1 flex items-end space-x-2">
                {weeklyPerformance.map((data, i) => {
                  const maxProblems = Math.max(
                    ...weeklyPerformance.map((item) => item.problems)
                  );
                  const barHeight = (data.problems / maxProblems) * 100 || 10; // Ensure minimum height for visibility
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full ${
                          i % 2 === 0 ? "bg-indigo-600" : "bg-indigo-400"
                        } rounded-t-md hover:bg-indigo-500 transition-all cursor-pointer relative group`}
                        style={{ height: `${barHeight}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.problems} problems
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-600 mt-2">
                        {data.day}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Monthly Performance Trend */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-3">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Performance
            </h4>
            <div className="h-64 flex items-end">
              <div className="flex-1 flex items-end space-x-2">
                {monthlyPerformance.map((data, i) => {
                  const maxEvents = Math.max(
                    ...monthlyPerformance.map((item) => item.events)
                  );
                  const barHeight = (data.events / maxEvents) * 100 || 10; // Ensure minimum height for visibility
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full ${
                          i % 2 === 0 ? "bg-indigo-600" : "bg-indigo-400"
                        } rounded-t-md hover:bg-indigo-500 transition-all cursor-pointer relative group`}
                        style={{ height: `${barHeight}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.events} events
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-600 mt-2">
                        {data.month}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:col-span-3">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Monthly Performance
            </h4>
            <div className="h-64 flex items-end">
              <div className="flex-1 flex items-end space-x-2">
                {monthlyPerformance.map((data, i) => {
                  const maxEvents = Math.max(
                    ...monthlyPerformance.map((item) => item.events)
                  );
                  const barHeight = (data.events / maxEvents) * 100 || 10; // Ensure minimum height for visibility
                  return (
                    <div key={i} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full ${
                          i === monthlyPerformance.length - 1
                            ? "bg-indigo-600"
                            : "bg-indigo-400"
                        } rounded-t-md hover:bg-indigo-500 transition-all cursor-pointer relative group`}
                        style={{ height: `${barHeight}%` }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {data.events} events
                        </div>
                      </div>
                      <div className="text-xs font-medium text-gray-600 mt-2">
                        {data.month}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-6">
            All Events
          </h4>
          <div className="space-y-4">
            {allEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                onViewDetails={() => setSelectedEvent(event)}
              />
            ))}
          </div>
        </div>
      )}

      {activeTab === "certificates" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <CertificateCard
            title="Web Development Bootcamp"
            issuer="TechSkill Academy"
            date="March 2024"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFfNNtA_PEpeXe1vgI_ep5JYEV0GXo2irdSg&s"
          />
          <CertificateCard
            title="Advanced Data Structures"
            issuer="CodeMasters"
            date="January 2024"
            image="https://m.media-amazon.com/images/I/81wT0dPRbDL.jpg"
          />
          <CertificateCard
            title="Frontend with React"
            issuer="WebCraft Institute"
            date="February 2024"
            image="https://d2vyhi5ouo1we3.cloudfront.net/force_jpg/aHR0cHM6Ly9pbWFnZXMuYmFubmVyYmVhci5jb20vcmVxdWVzdHMvaW1hZ2VzLzAwOC85MjQvNTc5L29yaWdpbmFsL2VhYzQyY2FiZjM5YzIxY2Y4NThlNWY4NDRlZmM0YTA1MjJmOGUxNzkucG5nPzE2MzI4MDgzMDI=/image.jpg"
          />
          <CertificateCard
            title="Database Design & SQL"
            issuer="DataPro Learning"
            date="December 2023"
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGvoHQSvQrW2Vj0VocIk_4S3oGvlLs-uJrvQ&s"
          />
        </div>
      )}

      {/* Event Details Modal */}
      {selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
};

// Helper function to create SVG arcs for pie chart
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x, y, radius, startAngle, endAngle) {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    largeArcFlag,
    0,
    end.x,
    end.y,
    "L",
    x,
    y,
    "Z",
  ].join(" ");
}

const Stat = ({ icon, label, value }) => (
  <div className="flex flex-col items-center bg-gray-50 rounded-xl p-4 transition-all hover:bg-indigo-50 hover:shadow-md">
    <div className="text-indigo-600 mb-2 bg-indigo-100 p-2 rounded-lg">
      {icon}
    </div>
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-xs text-gray-600">{label}</div>
  </div>
);

const EventCard = ({ event, onViewDetails }) => {
  const statusColors = {
    Completed: "bg-green-100 text-green-700",
    Registered: "bg-blue-100 text-blue-700",
    "View Details": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center p-4">
        <div>
          <h5 className="text-lg font-semibold text-gray-800">{event.title}</h5>
          <p className="text-sm text-gray-500">{event.date}</p>
        </div>
        <div className="flex items-center gap-3 mt-2 md:mt-0">
          <span
            className={`text-xs font-medium px-3 py-1 rounded-full ${
              statusColors[event.status]
            }`}
          >
            {event.status}
          </span>
          <button
            onClick={onViewDetails}
            className="text-indigo-600 hover:text-indigo-800 font-medium text-sm hover:underline"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

const EventModal = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-bold text-gray-800">{event.title}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{event.date}</span>
          </div>

          <p className="text-gray-700 leading-relaxed">{event.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {event.location && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Location</h4>
                <p className="text-sm text-gray-600">{event.location}</p>
              </div>
            )}

            {event.organizer && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Organizer</h4>
                <p className="text-sm text-gray-600">{event.organizer}</p>
              </div>
            )}

            {event.achievements && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Achievements</h4>
                <p className="text-sm text-gray-600">{event.achievements}</p>
              </div>
            )}

            {event.schedule && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Schedule</h4>
                <p className="text-sm text-gray-600">{event.schedule}</p>
              </div>
            )}

            {event.duration && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Duration</h4>
                <p className="text-sm text-gray-600">{event.duration}</p>
              </div>
            )}

            {event.prerequisites && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">
                  Prerequisites
                </h4>
                <p className="text-sm text-gray-600">{event.prerequisites}</p>
              </div>
            )}

            {event.speakers && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">Speakers</h4>
                <p className="text-sm text-gray-600">{event.speakers}</p>
              </div>
            )}

            {event.certification && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-1">
                  Certification
                </h4>
                <p className="text-sm text-gray-600">{event.certification}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border-t p-6 flex justify-end">
          <button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-lg mr-4"
          >
            Close
          </button>
          {event.status === "Registered" && (
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg">
              Join Event
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TechStackCard = ({ icon, name, percentage }) => (
  <div className="bg-gray-50 rounded-xl p-4 flex flex-col items-center">
    <div className="text-indigo-600 mb-1">{icon}</div>
    <div className="text-sm font-medium text-gray-800 mb-2">{name}</div>
    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
      <div
        className="bg-indigo-600 h-1.5 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
    <div className="text-xs text-gray-600">{percentage}%</div>
  </div>
);

const CertificateCard = ({ title, issuer, date, image }) => (
  <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
    <img src={image} alt={title} className="w-full h-32 object-cover" />
    <div className="p-4">
      <h5 className="font-semibold text-gray-800">{title}</h5>
      <p className="text-sm text-gray-500">{issuer}</p>
      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <span className="text-xs text-gray-500">{date}</span>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs py-1 px-3 rounded-md">
          View
        </button>
      </div>
    </div>
  </div>
);

export default StudentDashboard;
