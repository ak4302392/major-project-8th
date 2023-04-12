import mongoose from "mongoose";
import { User } from "@/types/dto/user.dto";
import { nanoid } from "nanoid";

export interface TempUserOptional {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  isManitStudent?: string;
  scholarNumber?: string;
  eventsRegistered?: string[];
  createdAt?: Date;
}

export interface tempUserDocument extends User, mongoose.Document {}

const tempUserSchema = new mongoose.Schema({
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
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isManitStudent: {
    type: Boolean,
    required: true,
  },
  scholarNumber: {
    type: String,
    required: function () {
      return this.isManitStudent === true;
    },
  },
  eventsRegistered: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    expires: 120,
    default: Date.now(),
  },
});

export const TempUserModel = mongoose.model<tempUserDocument>(
  "TempUser",
  tempUserSchema
);
