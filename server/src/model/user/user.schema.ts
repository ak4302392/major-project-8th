import mongoose from "mongoose";
import { User } from "@/types/dto/user.dto";

export interface UserOptional {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
  isManitStudent?: string;
  scholarNumber?: string;
  eventsRegistered?:[],
  createdAt?: Date;
  modifiedAt?: Date;
}

export interface UserDocument extends User, mongoose.Document {}

const userSchema = new mongoose.Schema({
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
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
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

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
