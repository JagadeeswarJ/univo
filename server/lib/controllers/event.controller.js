"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventByOrganizer = exports.getFeedback = exports.addFeedback = exports.getRegisteredUsers = exports.deleteEvent = exports.editEvent = exports.createEvent = exports.registerForEvent = exports.getAllEvents = exports.getEventDetails = void 0;
const db_config_1 = require("../config/db.config");
const env_1 = require("../config/env");
const uuid_1 = require("uuid");
const eventCollection = db_config_1.db.collection(env_1.env.EVENTS_COLLECTION);
const regCollection = db_config_1.db.collection(env_1.env.REGISTRATIONS_COLLECTION);
const getEventDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const doc = yield eventCollection.doc(eventId).get();
        if (!doc.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        }
        res.json({ success: true, data: doc.data() });
    }
    catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getEventDetails = getEventDetails;
const getAllEvents = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const snapshot = yield eventCollection.get();
        const events = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
        res.json({ success: true, data: events });
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getAllEvents = getAllEvents;
const registerForEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const eventId = req.params.id;
        const { userId } = req.body;
        // Check if event exists
        const eventDoc = yield eventCollection.doc(eventId).get();
        if (!eventDoc.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        }
        // Optional: check if already registered
        const snapshot = yield regCollection
            .where("userId", "==", userId)
            .where("eventId", "==", eventId)
            .get();
        if (!snapshot.empty) {
            res.status(400).json({ success: false, message: "Already registered" });
        }
        const newReg = {
            regId: (0, uuid_1.v4)(),
            userId,
            eventId,
            status: "registered",
            registrationTime: new Date().toISOString(),
        };
        yield regCollection.doc(newReg.regId).set(newReg);
        res.status(200).json({ success: true, message: "Registration successful", data: newReg });
    }
    catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Registration failed" });
    }
});
exports.registerForEvent = registerForEvent;
// for organizer 
const createEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, category, eventTags, startTime, endTime, eventDescription, eventOutcomes, organizedBy, cost, location, participantLimit, organizerId, createdId, points, } = req.body;
        if (!title || !startTime || !endTime || !organizedBy || !location || !organizerId) {
            res.status(400).json({ success: false, message: "Missing required fields" });
        }
        else {
            const eventId = (0, uuid_1.v4)();
            const eventData = {
                eventId,
                title,
                category,
                eventTags: eventTags || [],
                startTime,
                endTime,
                eventDescription,
                eventOutcomes,
                organizedBy,
                cost: cost || "free",
                location,
                participantLimit: participantLimit || null,
                organizerId,
                createdId,
                points: points || 0,
                createdAt: new Date().toISOString(),
            };
            yield eventCollection.doc(eventId).set(eventData);
            res.status(201).json({
                success: true,
                message: "Event created successfully",
                data: eventData,
            });
        }
    }
    catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create event",
            error: error.message,
        });
    }
});
exports.createEvent = createEvent;
const editEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const updateData = req.body;
        const eventRef = eventCollection.doc(eventId);
        const eventSnapshot = yield eventRef.get();
        if (!eventSnapshot.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        }
        else {
            yield eventRef.update(Object.assign(Object.assign({}, updateData), { updatedAt: new Date().toISOString() }));
            res.status(200).json({
                success: true,
                message: "Event updated successfully",
            });
        }
    }
    catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update event",
            error: error.message,
        });
    }
});
exports.editEvent = editEvent;
const deleteEvent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const eventRef = eventCollection.doc(eventId);
        const eventSnapshot = yield eventRef.get();
        if (!eventSnapshot.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        }
        else {
            yield eventRef.delete();
            res.status(200).json({
                success: true,
                message: "Event deleted successfully",
            });
        }
    }
    catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete event",
            error: error.message,
        });
    }
});
exports.deleteEvent = deleteEvent;
const getRegisteredUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const snapshot = yield regCollection.where("eventId", "==", eventId).get();
        if (snapshot.empty) {
            res.status(404).json({ success: false, message: "No registrations found for this event" });
        }
        else {
            const registrations = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            res.status(200).json({ success: true, data: registrations });
        }
    }
    catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getRegisteredUsers = getRegisteredUsers;
const addFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const { userId, feedback } = req.body;
        // Check if event exists
        const eventDoc = yield eventCollection.doc(eventId).get();
        if (!eventDoc.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        }
        // Optional: check if already registered
        const snapshot = yield regCollection
            .where("userId", "==", userId)
            .where("eventId", "==", eventId)
            .get();
        if (snapshot.empty) {
            res.status(400).json({ success: false, message: "Not registered for this event" });
        }
        const feedbackData = {
            userId,
            eventId,
            feedback,
            feedbackTime: new Date().toISOString(),
        };
        yield eventCollection.doc(eventId).collection("feedback").add(feedbackData);
        res.status(200).json({ success: true, message: "Feedback submitted successfully", data: feedbackData });
    }
    catch (error) {
        console.error("Feedback error:", error);
        res.status(500).json({ success: false, message: "Feedback submission failed" });
    }
});
exports.addFeedback = addFeedback;
const getFeedback = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { eventId } = req.params;
        const snapshot = yield eventCollection.doc(eventId).collection("feedback").get();
        if (snapshot.empty) {
            res.status(404).json({ success: false, message: "No feedback found for this event" });
        }
        else {
            const feedbacks = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            res.status(200).json({ success: true, data: feedbacks });
        }
    }
    catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getFeedback = getFeedback;
const getEventByOrganizer = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { organizerId } = req.params;
        const snapshot = yield eventCollection.where("organizerId", "==", organizerId).get();
        if (snapshot.empty) {
            res.status(404).json({ success: false, message: "No events found for this organizer" });
        }
        else {
            const events = snapshot.docs.map(doc => (Object.assign({ id: doc.id }, doc.data())));
            res.status(200).json({ success: true, data: events });
        }
    }
    catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});
exports.getEventByOrganizer = getEventByOrganizer;
