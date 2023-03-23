import { createEvent } from "@/controllers/event";
import { Router } from "express";

const event = Router();

event.post("/events/create", createEvent);

// club.post("/club/create", createClub);

export default event;
