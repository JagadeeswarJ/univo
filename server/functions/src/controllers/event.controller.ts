import { Request, Response } from "express";
import { db } from "../config/db.config";
import { env } from "../config/env";
import { v4 as uuidv4 } from "uuid";

const eventCollection = db.collection(env.EVENTS_COLLECTION);
const regCollection = db.collection(env.REGISTRATIONS_COLLECTION);


export const getEventDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventId = req.params.id;
        const doc = await eventCollection.doc(eventId).get();

        if (!doc.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        }

        res.json({ success: true, data: doc.data() });
    } catch (error) {
        console.error("Error fetching event:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const getAllEvents = async (_req: Request, res: Response): Promise<void> => {
    try {
        const snapshot = await eventCollection.get();
        const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        res.json({ success: true, data: events });
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


export const registerForEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const eventId = req.params.id;
        const { userId } = req.body;

        // Check if event exists
        const eventDoc = await eventCollection.doc(eventId).get();
        if (!eventDoc.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        }

        // Optional: check if already registered
        const snapshot = await regCollection
            .where("userId", "==", userId)
            .where("eventId", "==", eventId)
            .get();

        if (!snapshot.empty) {
            res.status(400).json({ success: false, message: "Already registered" });
        }

        const newReg = {
            regId: uuidv4(),
            userId,
            eventId,
            status: "registered",
            registrationTime: new Date().toISOString(),
        };

        await regCollection.doc(newReg.regId).set(newReg);

        res.status(200).json({ success: true, message: "Registration successful", data: newReg });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ success: false, message: "Registration failed" });
    }

};

// for organizer 
export const createEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            title,
            category,
            eventTags,
            startTime,
            endTime,
            eventDescription,
            eventOutcomes,
            organizedBy,
            cost,
            location,
            participantLimit,
            organizerId,
            createdId,
            points,
        } = req.body;

        if (!title || !startTime || !endTime || !organizedBy || !location || !organizerId) {
            res.status(400).json({ success: false, message: "Missing required fields" });
        } else {
            const eventId = uuidv4();

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

            await eventCollection.doc(eventId).set(eventData);

            res.status(201).json({
                success: true,
                message: "Event created successfully",
                data: eventData,
            });
        }
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create event",
            error: (error as Error).message,
        });
    }
};

export const editEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId } = req.params;
        const updateData = req.body;

        const eventRef = eventCollection.doc(eventId);
        const eventSnapshot = await eventRef.get();

        if (!eventSnapshot.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        } else {
            await eventRef.update({
                ...updateData,
                updatedAt: new Date().toISOString(),
            });

            res.status(200).json({
                success: true,
                message: "Event updated successfully",
            });
        }
    } catch (error) {
        console.error("Error updating event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update event",
            error: (error as Error).message,
        });
    }
};



export const deleteEvent = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId } = req.params;

        const eventRef = eventCollection.doc(eventId);
        const eventSnapshot = await eventRef.get();

        if (!eventSnapshot.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        } else {
            await eventRef.delete();
            res.status(200).json({
                success: true,
                message: "Event deleted successfully",
            });
        }
    } catch (error) {
        console.error("Error deleting event:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete event",
            error: (error as Error).message,
        });
    }
};

export const getRegisteredUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId } = req.params;

        const snapshot = await regCollection.where("eventId", "==", eventId).get();

        if (snapshot.empty) {
            res.status(404).json({ success: false, message: "No registrations found for this event" });
        } else {
            const registrations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json({ success: true, data: registrations });
        }
    } catch (error) {
        console.error("Error fetching registrations:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};
export const addFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId } = req.params;
        const { userId, feedback } = req.body;

        // Check if event exists
        const eventDoc = await eventCollection.doc(eventId).get();
        if (!eventDoc.exists) {
            res.status(404).json({ success: false, message: "Event not found" });
        }

        // Optional: check if already registered
        const snapshot = await regCollection
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

        await eventCollection.doc(eventId).collection("feedback").add(feedbackData);

        res.status(200).json({ success: true, message: "Feedback submitted successfully", data: feedbackData });
    } catch (error) {
        console.error("Feedback error:", error);
        res.status(500).json({ success: false, message: "Feedback submission failed" });
    }
}
export const getFeedback = async (req: Request, res: Response): Promise<void> => {
    try {
        const { eventId } = req.params;

        const snapshot = await eventCollection.doc(eventId).collection("feedback").get();

        if (snapshot.empty) {
            res.status(404).json({ success: false, message: "No feedback found for this event" });
        } else {
            const feedbacks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json({ success: true, data: feedbacks });
        }
    } catch (error) {
        console.error("Error fetching feedback:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}
export const getEventByOrganizer = async (req: Request, res: Response): Promise<void> => {
    try {
        const { organizerId } = req.params;

        const snapshot = await eventCollection.where("organizerId", "==", organizerId).get();

        if (snapshot.empty) {
            res.status(404).json({ success: false, message: "No events found for this organizer" });
        } else {
            const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            res.status(200).json({ success: true, data: events });
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}