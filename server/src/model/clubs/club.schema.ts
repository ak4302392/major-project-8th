import mongoose from "mongoose";
import { Event } from "@/types/dto/event.dto";

interface memory {
  name: string;
  image: string;
}

interface organizerAccount {
  id: string;
  password: string;
}

interface cordinatorAccount {
  id: string;
  password: string;
}

interface accounts {
  orgAccount: organizerAccount;
  corAccount: cordinatorAccount;
}
export interface ClubOptional {
  id?: string;
  name?: string;
  desc?: string;
  images?: string[];
  industryType?: string;
  upcomingEvents?: [];
  accounts?: accounts;
  cordinatorName?: string;
  memories?: memory[];
}

export interface ClubDocument extends Event, mongoose.Document {}

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
  industryType: {
    type: String,
    required: true,
  },
  upcomingEvents: {
    type: String,
    required: false,
  },
  accounts: {
    type: String,
    required: true,
  },
  cordinatorName: {
    type: String,
    required: false,
  },
  memories: {
    type: String,
    required: false,
  },
});

export const EventModel = mongoose.model<ClubDocument>("Event", eventSchema);
