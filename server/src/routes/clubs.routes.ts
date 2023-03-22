import { ClubLogin, createClub } from "@/controllers/club";
import { Router } from "express";

const club = Router();

club.post("/club/login", ClubLogin);

club.post("/club/create", createClub);

export default club;
