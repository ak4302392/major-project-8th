import { ClubLogin, createClub, getClubById } from "@/controllers/club";
import { Router } from "express";

const club = Router();

club.post("/club/login", ClubLogin);

club.post("/club/create", createClub);

club.post("/club/getClubById", getClubById);

export default club;
