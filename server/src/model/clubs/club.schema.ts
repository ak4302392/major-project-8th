import mongoose from "mongoose";
import { Event } from "@/types/dto/event.dto";
import { Club } from "@/types/dto/club.dto";

export interface memory {
  name: string;
  desc: string;
  image: string;
}

export interface organizerAccount {
  id: string;
  password: string;
}

export interface cordinatorAccount {
  id: string;
  password: string;
}

export interface accounts {
  orgAccount: organizerAccount;
  corAccount: cordinatorAccount;
}
export interface ClubOptional {
  id?: string;
  clubId?: string;
  name?: string;
  desc?: string;
  images?: string[];
  industryType?: string;
  upcomingEvents?: string[];
  accounts?: accounts;
  cordinatorName?: string;
  memories?: memory[];
}

export interface ClubDocument extends Club, mongoose.Document {}

const clubSchema = new mongoose.Schema({
  clubId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  industryType: {
    type: String,
    required: true,
  },
  upcomingEvents: {
    type: [String],
    required: false,
  },
  accounts: {
    type: {
      orgAccount: {
        id: String,
        password: String,
      },
      corAccount: {
        id: String,
        password: String,
      },
    },
    required: true,
  },
  cordinatorName: {
    type: String,
    required: false,
  },
  memories: {
    type: Array,
    required: false,
  },
});

export const ClubModel = mongoose.model<ClubDocument>("Club", clubSchema);
