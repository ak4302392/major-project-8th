import { accounts, memory } from "@/model/clubs/club.schema";

export interface Club {
  clubId: string;
  name: string;
  desc: string;
  images: string[];
  industryType: string;
  upcomingEvents: [];
  accounts: accounts;
  cordinatorName: string;
  memories: memory[];
}