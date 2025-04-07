import express, { Router } from "express";
import {
    getEventDetails,
    getAllEvents,
    registerForEvent,
    createEvent,
    editEvent,
    deleteEvent, getRegisteredUsers, addFeedback,
    getFeedback,
    getEventByOrganizer,

} from "../controllers/event.controller";

const EventRoute: Router = express.Router();

EventRoute.get("/", getAllEvents);
EventRoute.get("/:eventId", getEventDetails);
EventRoute.post("/:eventId/feedback", getEventDetails);
EventRoute.post("/:eventId/register", registerForEvent);
EventRoute.post("/create", createEvent);
EventRoute.post("/:eventId/edit", editEvent);
EventRoute.delete("/:eventId/delete", deleteEvent);
EventRoute.get("/:eventId/users", getRegisteredUsers);
EventRoute.post("/:eventId/feedback", addFeedback);
EventRoute.get("/:eventId/feedback", getFeedback);
EventRoute.get("/organizer/:organizerId", getEventByOrganizer);

export default EventRoute;
