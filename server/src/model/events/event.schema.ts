import { Event } from "@/types/dto/event.dto";
import mongoose from "mongoose";

export interface EventOptional {
  id?: string;
  name?: string;
  desc?: string;
  clubName?: string;
  eventDate?: Date;
  registeredMembers?: mongoose.Types.ObjectId[];
  images?: string[];
  category?: string;
  createdAt?: Date;
  modifiedAt?: Date;
}

export interface EventDocument extends Event, mongoose.Document {}

const eventSchema = new mongoose.Schema({
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
  eventDate: {
    type: Date,
    required: true,
  },
  registeredMembers: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
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
