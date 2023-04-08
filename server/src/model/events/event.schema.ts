import { Event } from "@/types/dto/event.dto";
import mongoose from "mongoose";
import { nanoid } from "nanoid";

export interface EventOptional {
  id?: string;
  name?: string;
  desc?: string;
  clubName?: string;
  clubId?: string;
  eventDate?: Date;
  registeredMembers?: string[];
  images?: string[];
  category?: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

export interface EventDocument extends Event, mongoose.Document {}

const eventSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    default: () => nanoid(7),
    index: { unique: true },
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  clubName: {
    type: String,
    required: true,
  },
  clubId: {
    type: String,
    required: true,
  },
  eventDate: {
    type: Date,
    required: true,
  },
  registeredMembers: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: true,
  },
});

export const EventModel = mongoose.model<EventDocument>("Event", eventSchema);
