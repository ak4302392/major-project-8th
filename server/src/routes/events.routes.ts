import {
  createEvent,
  exportAllRegisteredUsers,
  getAllEvents,
  getEventById,
  registerEvent,
} from "@/controllers/event";
import { Router } from "express";

const event = Router();

event.post("/events/create", createEvent);
event.post("/events/getEventByEventId", getEventById);
event.get("/events/getAllEvents", getAllEvents);
event.post("/events/register", registerEvent);
event.post("/events/exportAllRegisteredUsers",exportAllRegisteredUsers);
// club.post("/club/create", createClub);

export default event;
