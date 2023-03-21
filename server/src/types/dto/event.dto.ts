import mongoose from "mongoose";

export interface Event {
  name: string;
  desc: string;
  clubName: string;
  eventDate: Date;
  registeredMembers?: mongoose.Types.ObjectId[];
  images?: string[];
  category: string;
  createdAt?: Date;
  modifiedAt?: Date;
}
