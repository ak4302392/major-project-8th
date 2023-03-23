import { Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { UserDocument } from "@/model/user/user.schema";
import UserRepo from "@/model/user/user.repo";
import { createJWT } from "@/utils/jwt";
import eventRepo from "@/model/events/event.repo";
import clubRepo from "@/model/clubs/club.repo";

const bcrypt = require("bcrypt");

/**
 * Create user
 *
 * @param {Request} req
 * @param {Response} res
 */
export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      name,
      desc,
      clubName,
      clubId,
      eventDate,
      registeredMembers,
      images,
      category,
    } = req.body;

    if (!name) {
      return res.status(400).send({
        message: "Event name is required",
      });
    }

    if (!desc) {
      return res.status(400).send({
        message: "Event description is required",
      });
    }

    if (!clubName) {
      return res.status(400).send({
        message: "The associated club name is required",
      });
    }

    if (!clubId) {
      return res.status(400).send({
        message: "Club Id is required",
      });
    }

    if (!eventDate) {
      return res.status(400).send({
        message: "Date of event is required",
      });
    }

    if (!images) {
      return res.status(400).send({
        message: "Some images of the event are required",
      });
    }

    if (!category) {
      return res.status(400).send({
        message: "Category of the event is required",
      });
    }

    const associatedClub = await clubRepo.findOne({ clubId: clubId });

    if (!associatedClub) {
      return res.status(400).send({
        message: "No club exists with the provided club id.",
      });
    }
    const newEvent = await eventRepo.create({
      name: name,
      desc: desc,
      clubName: clubName,
      clubId: clubId,
      eventDate: eventDate,
      registeredMembers: [],
      images: images,
      category: category,
    });

    const eventId: string = newEvent.id;

    if (associatedClub) {
      const upcomingEvents = [...associatedClub.upcomingEvents, eventId];
      associatedClub.upcomingEvents = upcomingEvents;
      const updatedAssociatedClub = await clubRepo.updateByClubId(clubId, {
        ...associatedClub,
      });
    }

    return res.status(200).send({
      message: "Event created!",
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Request failed",
    });
  }
};

/**
 * Login.
 *
 * @param {Request} req
 * @param {Response} res
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        message: "Email and password is required",
      });
    }
    const user = await UserRepo.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).send({
        message: "User not present",
      });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({
        message: "Invalid password",
      });
    }

    if (user.email) {
      return res.status(200).send({
        token: getTokenFromDBUser(user),
        user: getWebUserFromDBUser(user),
      });
    }

    return res.status(400).send({
      message: "Invalid user",
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Request failed",
    });
  }
};

export const loginWithGoogle = async (req: Request, res: Response) => {
  try {
    const { credentials } = req.body;

    if (!credentials) {
      return res.status(400).send({
        message: "Credentials cannot be empty!",
      });
    }

    const data: TokenPayload = await getDecodedOAuthJwtGoogle(credentials);

    const user = await UserRepo.findOne({
      email: data.email!.toLowerCase().trim(),
    });

    if (!user) {
      console.log(
        "User not already present. Continuing with the data from google"
      );

      if (!data.given_name || !data.email) {
        console.log("All required data is not present");

        return res.status(200).send({
          moreInfoNeeded: true,
        });
      }

      const newUser = await UserRepo.create({
        name: "",
        email: data.email.toLowerCase().trim(),
        // temporarily keeping below fields empty
        // to prevent errors as for now not working on
        // login with google
        phone: "",
        isManitStudent: "",
        scholarNumber: "",
        eventsRegistered: [],
        password: "",
      });

      return res.status(200).send({
        message: "User created!",
        token: getTokenFromDBUser(newUser),
        user: getWebUserFromDBUser(newUser),
      });
    } else {
      return res.status(200).send({
        message: "Login Successful",
        token: getTokenFromDBUser(user),
        user: getWebUserFromDBUser(user),
      });
    }
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Login with google failed",
    });
  }
};

/**
 * @description Function to decode Google OAuth token
 * @param token: string
 * @returns ticket object
 */
const getDecodedOAuthJwtGoogle = async (token: any) => {
  const CLIENT_ID_GOOGLE =
    "477624586125-v35fr087cpqhij3upbqsm4r67ngdq515.apps.googleusercontent.com";

  const client = new OAuth2Client(CLIENT_ID_GOOGLE);

  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID_GOOGLE,
  });

  return ticket.getPayload() as TokenPayload;
};

const getWebUserFromDBUser = (user: UserDocument) => {
  return {
    name: user.name,
    email: user.email,
    isManitStudent: user.isManitStudent,
    id: user.id,
  };
};

const getTokenFromDBUser = (user: UserDocument) => {
  return createJWT({
    email: user.email,
    name: user.name,
    id: user.id,
  });
};
