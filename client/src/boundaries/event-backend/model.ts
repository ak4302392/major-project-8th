import mongoose from 'mongoose';

export interface CreateEventRequestPayload {
  name: string;
  desc: string;
  clubName: string;
  clubId: string;
  eventDate: Date;
  registeredMembers: mongoose.Types.ObjectId[];
  images: string[];
  category: string;
}
