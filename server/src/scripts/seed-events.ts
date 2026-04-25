import { db } from "../config/db.config";
import { env } from "../config/env";
import { v4 as uuidv4 } from "uuid";

const events = [
  {
    title: "VNR HackFest 2026",
    category: "Technical",
    eventTags: ["hackathon", "coding", "innovation"],
    startTime: "2026-05-10T09:00:00.000Z",
    endTime: "2026-05-11T18:00:00.000Z",
    eventDescription:
      "A 24-hour hackathon where teams build innovative tech solutions for real-world problems. Open to all branches.",
    eventOutcomes:
      "Participants will gain hands-on experience building full-stack projects under time pressure.",
    organizedBy: "VNR VJIET CSE Department",
    cost: 200,
    location: "Hyderabad",
    participantLimit: 120,
    organizerId: "organizer-001",
    createdId: "seed-001",
    points: 15,
    image:
      "https://blog.coupondunia.in/wp-content/uploads/2014/07/college-fest.jpg",
  },
  {
    title: "Cultural Fiesta 2026",
    category: "Cultural",
    eventTags: ["dance", "music", "drama", "art"],
    startTime: "2026-06-05T10:00:00.000Z",
    endTime: "2026-06-07T22:00:00.000Z",
    eventDescription:
      "Annual cultural festival showcasing talent across dance, music, drama and fine arts. Open to all students.",
    eventOutcomes:
      "A platform to showcase and celebrate diverse artistic talent across the campus.",
    organizedBy: "VNR VJIET Cultural Committee",
    cost: 100,
    location: "Hyderabad",
    participantLimit: 300,
    organizerId: "organizer-002",
    createdId: "seed-002",
    points: 10,
    image:
      "https://magazinelondon.co.uk/wp-content/uploads/2023/10/JA-MAGAZINE-BTF23-2212-2600x1500.jpg",
  },
  {
    title: "Inter-College Sports Meet 2026",
    category: "Sports",
    eventTags: ["cricket", "football", "athletics", "badminton"],
    startTime: "2026-07-15T08:00:00.000Z",
    endTime: "2026-07-17T18:00:00.000Z",
    eventDescription:
      "Annual inter-college sports competition covering cricket, football, athletics and badminton with trophies and cash prizes.",
    eventOutcomes:
      "Encourages sportsmanship, teamwork and healthy competition among students.",
    organizedBy: "VNR VJIET Sports Board",
    cost: 150,
    location: "Hyderabad",
    participantLimit: 200,
    organizerId: "organizer-003",
    createdId: "seed-003",
    points: 12,
    image:
      "https://cdn.bleacherreport.net/images_root/slides/photos/000/595/808/102809752_original.jpg?1293506368",
  },
];

async function seedEvents() {
  const collection = db.collection(env.EVENTS_COLLECTION);

  for (const event of events) {
    const eventId = uuidv4();
    const doc = {
      ...event,
      eventId,
      createdAt: new Date().toISOString(),
    };
    await collection.doc(eventId).set(doc);
    console.log(`Seeded: "${event.title}" → ${eventId}`);
  }

  console.log("\nAll 3 events seeded successfully.");
  process.exit(0);
}

seedEvents().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
