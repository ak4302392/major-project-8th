import mongoose from "mongoose";
import { User } from "@/types/dto/user.dto";
import { nanoid } from "nanoid";
import { verificationType } from "@/types/dto/verification.dto";
const bcrypt = require("bcrypt");

export interface verificationDocument
  extends verificationType,
    mongoose.Document {}

const verificationTokenSchema = new mongoose.Schema({
  owner: {
    type: String,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 120,
    default: Date.now(),
  },
});

verificationTokenSchema.pre("save", async function (next) {
  if (this.isModified("token")) {
    const hash = await bcrypt.hash(this.token, 8);
    this.token = hash;
  }
  next();
});

verificationTokenSchema.methods.compareToken = async function (token: string) {
  const result = await bcrypt.compareSync(token, this.token);
  return result;
};

export const verificationModel = mongoose.model<verificationDocument>(
  "verificationToken",
  verificationTokenSchema
);
