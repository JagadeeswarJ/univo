import React, { useState, useEffect, useMemo } from "react";
import { CalendarDays, Clock, ChevronDown, ChevronUp, Filter, Calendar, Check, Star, X, Plus, Bell, AlertCircle } from "lucide-react";

// Card Components with animation
const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-white shadow-md transition-all duration-300 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Mock Data - extended with more events and categories, participation status added
const mockEvents = [
  {
    id: 1,
    title: "Tech Fest Inauguration Ceremony",
    platform: "VNRVJIET Campus",
    start: "2025-04-06T10:00:00",
    duration: "2 hours",
    category: "ceremony",
    description: "Opening ceremony for the annual technology festival featuring keynote speakers from leading tech companies.",
    status: "live", // live, completed, upcoming
    registered: true,
    participated: false
  },
  {
    id: 2,
    title: "Coding Competition",
    platform: "Online - HackerRank",
    start: "2025-04-07T14:00:00",
    duration: "3 hours",
    category: "competition",
    description: "Test your coding skills against other participants in this timed competition with prizes for top performers.",
    status: "upcoming",
    registered: true,
    participated: false
  },
  {
    id: 3,
    title: "AI Workshop",
    platform: "Science Building, Room 302",
    start: "2025-04-08T09:30:00",
    duration: "4 hours",
    category: "workshop",
    description: "Hands-on workshop exploring the latest developments in artificial intelligence and machine learning.",
    status: "upcoming",
    registered: false,
    participated: false
  },
  {
    id: 4,
    title: "Industry Panel Discussion",
    platform: "Virtual Meeting",
    start: "2025-04-05T16:00:00",
    duration: "1 hour 30 minutes",
    category: "talk",
    description: "Panel discussion with industry experts on the future of technology and career opportunities.",
    status: "completed",
    registered: true,
    participated: true
  },
  {
    id: 5,
    title: "Project Showcase",
    platform: "Main Hall",
    start: "2025-04-09T13:00:00",
    duration: "5 hours",
    category: "showcase",
    description: "Students and faculty showcase their innovative projects and research work to visitors and industry representatives.",
    status: "upcoming",
    registered: true,
    participated: false
  }
];

// Utility Functions
function getDurationInMs(duration) {
  const hoursMatch = duration.match(/(\d+)\s*hour/);
  const minsMatch = duration.match(/(\d+)\s*minute/);
  const hours = hoursMatch ? parseInt(hoursMatch[1]) : 0;
  const minutes = minsMatch ? parseInt(minsMatch[1]) : 0;
  return (hours * 3600 + minutes * 60) * 1000;
}

// Badge Component with animation
const Badge = ({ children, variant, onClick, className }) => {
  const variantClasses = {
    upcoming: "bg-yellow-100 text-yellow-800",
    live: "bg-red-100 text-red-800",
    completed: "bg-green-100 text-green-800",
    registered: "bg-blue-100 text-blue-800",
    ceremony: "bg-purple-100 text-purple-800",
    competition: "bg-red-100 text-red-800",
    workshop: "bg-yellow-100 text-yellow-800",
    talk: "bg-indigo-100 text-indigo-800",
    showcase: "bg-pink-100 text-pink-800",
    selected: "bg-teal-100 text-teal-800",
  };

  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:shadow-md ${variantClasses[variant] || "bg-gray-100 text-gray-800"} ${onClick ? "cursor-pointer" : ""} ${className || ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
};

// Toast notification component
const Toast = ({ message, onClose, type = "success" }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);
  
  const bgColor = type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500";
  
  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-md shadow-lg flex items-center gap-2 animate-fade-in z-50`}>
      {type === "success" ? <Check size={18} /> : <AlertCircle size={18} />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2">
        <X size={16} />
      </button>
    </div>
  );
};

// Event Status Indicator Component
const StatusIndicator = ({ status, registered, participated }) => {
  let color = "bg-yellow-400"; // default/upcoming
  let pulseEffect = "";
  
  if (status === "live") {
    color = "bg-red-500";
    pulseEffect = "animate-pulse";
  } else if (status === "completed" && participated) {
    color = "bg-green-500";
  } else if (registered) {
    color = "bg-blue-400";
  }
  
  return (
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color} ${pulseEffect}`}></div>
      <span className="text-xs capitalize">{status}</span>
      {registered && <span className="text-xs text-blue-600">(Registered)</span>}
      {participated && <span className="text-xs text-green-600">(Participated)</span>}
    </div>
  );
};

// Calendar Grid Component with enhanced display
const CalendarGrid = ({ events, myEvents, onAddEvent, currentDate }) => {
  const [month, setMonth] = useState(new Date(currentDate));
  const [hoveredDay, setHoveredDay] = useState(null);
  const [selectedEventForPopup, setSelectedEventForPopup] = useState(null);
  
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1).getDay();
  
  const prevMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  };
  
  const nextMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  };
  
  // Create calendar grid
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null); // Empty days before the first day of month
  }
  
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }
  
  // Get events for the day
  const getEventsForDay = (day) => {
    if (!day) return [];
    
    const date = new Date(month.getFullYear(), month.getMonth(), day);
    const dateStr = date.toISOString().split('T')[0];
    
    return events.filter(event => {
      const eventDate = new Date(event.start).toISOString().split('T')[0];
      return eventDate === dateStr;
    });
  };
  
  // Check if an event is in my events
  const isInMyEvents = (eventId) => {
    return myEvents.some(event => event.id === eventId);
  };

  // Handle event popup
  const handleEventClick = (e, event) => {
    e.stopPropagation();
    setSelectedEventForPopup(event);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 animate-fade-in relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {month.toLocaleString('default', { month: 'long' })} {month.getFullYear()}
        </h2>
        <div className="flex gap-2">
          <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronUp className="rotate-90" size={18} />
          </button>
          <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">
            <ChevronDown className="rotate-90" size={18} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-gray-500 py-2 font-medium">
            {day}
          </div>
        ))}
        
        {days.map((day, index) => {
          const dayEvents = day ? getEventsForDay(day) : [];
          const hasRegistered = dayEvents.some(event => event.registered);
          const hasLive = dayEvents.some(event => event.status === "live");
          const hasCompleted = dayEvents.some(event => event.status === "completed" && event.participated);
          
          return (
            <div 
              key={index} 
              className={`p-1 min-h-16 border rounded transition-all ${
                day 
                  ? "hover:shadow-md bg-white cursor-pointer" 
                  : "bg-gray-50"
              } ${
                day && new Date(month.getFullYear(), month.getMonth(), day).toDateString() === new Date().toDateString()
                  ? "border-blue-500"
                  : "border-gray-100"
              }`}
              onMouseEnter={() => day && setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {day && (
                <>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${hasRegistered ? "font-bold text-blue-600" : ""}`}>
                      {day}
                    </span>
                    <div className="flex space-x-1">
                      {hasLive && <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>}
                      {hasCompleted && <span className="w-2 h-2 rounded-full bg-green-500"></span>}
                      {!hasLive && !hasCompleted && hasRegistered && <span className="w-2 h-2 rounded-full bg-blue-500"></span>}
                    </div>
                  </div>
                  
                  <div className="mt-1">
                    {dayEvents.map(event => {
                      let borderColor = "border-l-4 ";
                      if (event.status === "live") borderColor += "border-red-500";
                      else if (event.status === "completed" && event.participated) borderColor += "border-green-500";
                      else if (event.registered) borderColor += "border-blue-500";
                      else borderColor += "border-yellow-300";
                      
                      return (
                        <div 
                          key={event.id}
                          className={`text-xs p-1 mb-1 rounded truncate transition-all hover:scale-105 ${
                            isInMyEvents(event.id)
                              ? `bg-blue-100 text-blue-800 ${borderColor}`
                              : `bg-gray-100 text-gray-800 ${borderColor}`
                          }`}
                          title={event.title}
                          onClick={(e) => handleEventClick(e, event)}
                        >
                          {event.title.length > 15 ? `${event.title.substring(0, 15)}...` : event.title}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Event popup for calendar view */}
      {selectedEventForPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in" onClick={() => setSelectedEventForPopup(null)}>
          <div className="bg-white rounded-lg p-4 max-w-md w-full m-4" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-xl font-bold">{selectedEventForPopup.title}</h3>
              <button onClick={() => setSelectedEventForPopup(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="mb-2 flex items-center">
              <StatusIndicator 
                status={selectedEventForPopup.status} 
                registered={selectedEventForPopup.registered} 
                participated={selectedEventForPopup.participated} 
              />
            </div>
            
            <div className="mb-2 flex items-center text-sm text-gray-600">
              <CalendarDays size={16} className="mr-2 text-blue-500" />
              <span>{new Date(selectedEventForPopup.start).toDateString()}</span>
            </div>
            
            <div className="mb-2 flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-2 text-blue-500" />
              <span>{selectedEventForPopup.duration}</span>
            </div>
            
            <p className="text-gray-700 my-3">{selectedEventForPopup.description}</p>
            
            <div className="flex justify-end mt-4">
              {!isInMyEvents(selectedEventForPopup.id) ? (
                <button 
                  onClick={() => {
                    onAddEvent(selectedEventForPopup);
                    setSelectedEventForPopup(null);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center gap-1"
                >
                  <Plus size={16} />
                  <span>Add to My Calendar</span>
                </button>
              ) : (
                <button 
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded flex items-center gap-1 cursor-not-allowed"
                >
                  <Check size={16} />
                  <span>Added to Calendar</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Event Card Component
const EventCard = ({ event, isInMyEvents, onAddToCalendar }) => {
  const [expanded, setExpanded] = useState(false);
  const [animateAdd, setAnimateAdd] = useState(false);
  const now = useMemo(() => new Date(), []);
  const eventStart = new Date(event.start);
  const durationMs = getDurationInMs(event.duration);
  const eventEnd = new Date(eventStart.getTime() + durationMs);

  // Relative time formatting
  const timeUntil = useMemo(() => {
    const nowTime = now.getTime();
    const startTime = eventStart.getTime();
    const endTime = eventEnd.getTime();
    
    if (startTime > nowTime) {
      const diff = startTime - nowTime;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      if (days > 0) return `Starts in ${days} day${days > 1 ? 's' : ''} and ${hours} hour${hours > 1 ? 's' : ''}`;
      return `Starts in ${hours} hour${hours > 1 ? 's' : ''}`;
    }
    if (nowTime < endTime) {
      const diff = endTime - nowTime;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      return `Ends in ${hours > 0 ? `${hours} hour${hours > 1 ? 's' : ''} and ` : ''}${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
    return "Event has ended";
  }, [eventStart, eventEnd, now]);

  const formattedDate = `${eventStart.toDateString()} at ${eventStart.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

  const handleAddToCalendar = () => {
    setAnimateAdd(true);
    setTimeout(() => {
      setAnimateAdd(false);
      onAddToCalendar(event);
    }, 500);
  };

  // Border color based on status
  const getBorderColor = () => {
    if (event.status === "live") return "border-l-4 border-red-500";
    if (event.status === "completed" && event.participated) return "border-l-4 border-green-500";
    if (event.registered) return "border-l-4 border-blue-500";
    return "border-l-4 border-yellow-300";
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto my-4 overflow-hidden transform transition-all duration-300 hover:shadow-lg ${
      getBorderColor()
    } ${expanded ? "scale-102" : "scale-100"}`}>
      <div className="p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Badge variant={event.status} className="animate-fade-in">
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
              <Badge variant={event.category} className="animate-fade-in">
                {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
              </Badge>
              {event.registered && (
                <Badge variant="registered" className="flex items-center gap-1">
                  <span>Registered</span>
                </Badge>
              )}
              {isInMyEvents && (
                <Badge variant="selected" className="flex items-center gap-1 animate-bounce-once">
                  <Star size={10} />
                  <span>My Calendar</span>
                </Badge>
              )}
            </div>
            <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 transition-colors">{event.title}</h3>
            <p className="text-sm text-gray-600">{event.platform}</p>
            
            {/* Status indicator */}
            <div className="mt-2">
              <StatusIndicator 
                status={event.status} 
                registered={event.registered} 
                participated={event.participated} 
              />
            </div>
          </div>
          <button className="text-gray-500 hover:text-gray-700 transition-colors hover:bg-gray-100 p-1 rounded-full">
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
        
        <div className="mt-3 flex items-center text-sm text-gray-500">
          <CalendarDays size={16} className="mr-2 text-blue-500" />
          <span>{formattedDate}</span>
        </div>
        
        <div className="mt-2 flex items-center text-sm text-gray-500">
          <Clock size={16} className="mr-2 text-blue-500" />
          <span>{event.duration}</span>
        </div>
        
        <div className="mt-2 text-sm font-medium text-blue-600">
          {timeUntil}
        </div>
      </div>

      {expanded && (
        <div className="px-4 pb-4 border-t border-gray-100 pt-3 bg-gray-50 animate-fade-in">
          <div className="bg-white p-3 rounded-lg shadow-sm mb-3 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-blue-600 mb-2">Event Description</h4>
            <p className="text-gray-700">{event.description}</p>
          </div>
          
          <div className="bg-white p-3 rounded-lg shadow-sm mb-3 hover:shadow-md transition-shadow">
            <h4 className="font-medium text-blue-600 mb-2">Event Details</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li><strong>Location:</strong> {event.platform}</li>
              <li><strong>Date:</strong> {formattedDate}</li>
              <li><strong>Duration:</strong> {event.duration}</li>
              <li><strong>Category:</strong> {event.category}</li>
              <li>
                <strong>Status:</strong> 
                <span className={`ml-2 ${
                  event.status === "live" ? "text-red-600 font-bold" : 
                  event.status === "completed" ? "text-green-600" : "text-yellow-600"
                }`}>
                  {event.status.toUpperCase()}
                </span>
              </li>
              <li>
                <strong>Registration:</strong> 
                <span className={`ml-2 ${event.registered ? "text-blue-600" : "text-gray-600"}`}>
                  {event.registered ? "Registered" : "Not Registered"}
                </span>
              </li>
              {event.status === "completed" && (
                <li>
                  <strong>Participation:</strong> 
                  <span className={`ml-2 ${event.participated ? "text-green-600" : "text-red-600"}`}>
                    {event.participated ? "Attended" : "Did not attend"}
                  </span>
                </li>
              )}
            </ul>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button 
              onClick={handleAddToCalendar}
              disabled={isInMyEvents}
              className={`px-4 py-2 rounded-md transition-all duration-300 flex items-center gap-2 ${
                isInMyEvents 
                  ? "bg-gray-300 text-gray-600 cursor-not-allowed" 
                  : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"
              } ${animateAdd ? "animate-ping-once" : ""}`}
            >
              {isInMyEvents ? (
                <>
                  <Check size={18} />
                  <span>Added to Calendar</span>
                </>
              ) : (
                <>
                  <Plus size={18} />
                  <span>Add to My Calendar</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </Card>
  );
};

// Multi-select category filter component with animation
const CategoryFilter = ({ categories, selectedCategories, setSelectedCategories, statuses, selectedStatuses, setSelectedStatuses }) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  
  const toggleCategory = (category) => {
    if (category === "all") {
      if (!selectedCategories.includes("all")) {
        setSelectedCategories(["all"]);
      }
      return;
    }
    
    setSelectedCategories(prev => {
      const withoutAll = prev.filter(c => c !== "all");
      
      if (withoutAll.includes(category)) {
        const result = withoutAll.filter(c => c !== category);
        return result.length === 0 ? ["all"] : result;
      } else {
        return [...withoutAll, category];
      }
    });
  };
  
  const toggleStatus = (status) => {
    if (status === "all") {
      if (!selectedStatuses.includes("all")) {
        setSelectedStatuses(["all"]);
      }
      return;
    }
    
    setSelectedStatuses(prev => {
      const withoutAll = prev.filter(s => s !== "all");
      
      if (withoutAll.includes(status)) {
        const result = withoutAll.filter(s => s !== status);
        return result.length === 0 ? ["all"] : result;
      } else {
        return [...withoutAll, status];
      }
    });
  };
  
  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="relative">
        <button 
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50 transition-all duration-300 hover:shadow"
        >
          <Filter size={16} className="text-blue-500" />
          <span>Categories</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isCategoryOpen && (
          <div className="absolute z-10 mt-1 w-64 bg-white border rounded-md shadow-lg p-2 animate-fade-in">
            <div className="space-y-1">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="capitalize">{category}</span>
                  {selectedCategories.includes(category) && (
                    <Check size={16} className="text-blue-600 animate-fade-in" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedCategories.map(category => (
            <Badge key={category} variant={category === "all" ? "upcoming" : category} className="animate-fade-in">
              <div className="flex items-center gap-1">
                <span className="capitalize">{category}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedCategories.length === 1) {
                      setSelectedCategories(["all"]);
                    } else {
                      setSelectedCategories(prev => prev.filter(c => c !== category));
                    }
                  }}
                  className="ml-1 text-xs hover:text-black"
                >
                  ✕
                </button>
              </div>
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Status Filter */}
      <div className="relative">
        <button 
          onClick={() => setIsStatusOpen(!isStatusOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md hover:bg-gray-50 transition-all duration-300 hover:shadow"
        >
          <Filter size={16} className="text-blue-500" />
          <span>Status</span>
          <ChevronDown size={16} className={`transition-transform duration-300 ${isStatusOpen ? 'rotate-180' : ''}`} />
        </button>
        
        {isStatusOpen && (
          <div className="absolute z-10 mt-1 w-64 bg-white border rounded-md shadow-lg p-2 animate-fade-in">
            <div className="space-y-1">
              {statuses.map(status => (
                <button
                  key={status}
                  onClick={() => toggleStatus(status)}
                  className="flex items-center justify-between w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded transition-colors"
                >
                  <span className="capitalize">{status}</span>
                  {selectedStatuses.includes(status) && (
                    <Check size={16} className="text-blue-600 animate-fade-in" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
        
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedStatuses.map(status => (
            <Badge key={status} variant={status === "all" ? "selected" : status} className="animate-fade-in">
              <div className="flex items-center gap-1">
                <span className="capitalize">{status}</span>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (selectedStatuses.length === 1) {
                      setSelectedStatuses(["all"]);
                    } else {
                      setSelectedStatuses(prev => prev.filter(s => s !== status));
                    }
                  }}
                  className="ml-1 text-xs hover:text-black"
                >
                  ✕
                </button>
              </div>
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
};

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes pingOnce {
    0% { transform: scale(1); }
    50% { transform: scale(1.2); }
    100% { transform: scale(1); }
  }
  
  @keyframes bounceOnce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
    100% { transform: translateY(0); }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-in-out forwards;
  }
  
  .animate-ping-once {
    animation: pingOnce 0.5s ease-in-out;
  }
  
  .animate-bounce-once {
    animation: bounceOnce 0.8s ease-in-out;
  }
  
  .scale-100 {
    transform: scale(1);
  }
  
  .scale-102 {
    transform: scale(1.02);
  }
`;
document.head.appendChild(style);

// Main App Component
const EventCalendarApp = () => {
  const [events, setEvents] = useState(mockEvents);
  const [myEvents, setMyEvents] = useState([]);
  const [view, setView] = useState("list"); // list, calendar
  const [toast, setToast] = useState(null);
  const [currentDate] = useState(new Date());
  
  // Extract categories and statuses for filtering
  const allCategories = ["all", ...Array.from(new Set(events.map(event => event.category)))];
  const allStatuses = ["all", "live", "upcoming", "completed"];
  
  const [selectedCategories, setSelectedCategories] = useState(["all"]);
  const [selectedStatuses, setSelectedStatuses] = useState(["all"]);
  
  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Category filter
      const categoryMatch = selectedCategories.includes("all") || 
                          selectedCategories.includes(event.category);
      
      // Status filter
      const statusMatch = selectedStatuses.includes("all") || 
                        selectedStatuses.includes(event.status);
      
      return categoryMatch && statusMatch;
    });
  }, [events, selectedCategories, selectedStatuses]);
  
  // Handle adding event to my calendar
  const handleAddToCalendar = (event) => {
    if (!myEvents.some(e => e.id === event.id)) {
      setMyEvents([...myEvents, event]);
      setToast({
        message: `${event.title} added to your calendar!`,
        type: "success"
      });
    }
  };
  
  // Close toast
  const closeToast = () => {
    setToast(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Notification area with counter */}
      <div className="fixed top-4 right-4 z-50">
        <button className="bg-blue-600 text-white p-2 rounded-full shadow-lg relative hover:bg-blue-700 transition-colors">
          <Bell size={20} />
          {myEvents.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-bounce-once">
              {myEvents.length}
            </span>
          )}
        </button>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tech Fest Event Calendar</h1>
          <p className="text-gray-600 mb-4">Browse and manage your event schedule</p>
          
          {/* View Toggle */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-2">
              <button 
                onClick={() => setView("list")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                  view === "list" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Filter size={18} />
                <span>List View</span>
              </button>
              <button 
                onClick={() => setView("calendar")}
                className={`px-4 py-2 rounded-md flex items-center gap-2 transition-colors ${
                  view === "calendar" 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <Calendar size={18} />
                <span>Calendar View</span>
              </button>
            </div>
            
            {/* Filters */}
            <CategoryFilter 
              categories={allCategories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              statuses={allStatuses}
              selectedStatuses={selectedStatuses}
              setSelectedStatuses={setSelectedStatuses}
            />
          </div>
          
          {/* Main Content */}
          {view === "list" ? (
            <div className="space-y-4">
              {filteredEvents.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  No events match your current filters. Try adjusting your filter criteria.
                </div>
              ) : (
                filteredEvents.map(event => (
                  <EventCard 
                    key={event.id} 
                    event={event} 
                    isInMyEvents={myEvents.some(e => e.id === event.id)}
                    onAddToCalendar={handleAddToCalendar}
                  />
                ))
              )}
            </div>
          ) : (
            <CalendarGrid 
              events={filteredEvents} 
              myEvents={myEvents} 
              onAddEvent={handleAddToCalendar}
              currentDate={currentDate}
            />
          )}
        </div>
        
        {/* My Events Section */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Star size={20} className="text-yellow-500" />
            My Calendar
          </h2>
          
          {myEvents.length === 0 ? (
            <div className="text-center p-8 text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
              <div className="mb-3">
                <Calendar size={40} className="mx-auto text-gray-400" />
              </div>
              <p>You haven't added any events to your calendar yet.</p>
              <p>Browse events and add them to your personal calendar.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myEvents.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  isInMyEvents={true}
                  onAddToCalendar={() => {}}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Toast notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}
    </div>
  );
};

export default EventCalendarApp;