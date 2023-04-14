import { Request, Response } from "express";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import { UserDocument } from "@/model/user/user.schema";
import UserRepo from "@/model/user/user.repo";
import { createJWT } from "@/utils/jwt";
import { getAllEvents } from "./event";
import userRepo from "@/model/user/user.repo";
import { generateOTP, mailTransport } from "@/utils/mail";
import { verificationModel } from "@/model/email-verification/verification.schema";
import { TempUserModel } from "@/model/user/tempUser.schema";

const bcrypt = require("bcrypt");

/**
 * Create user
 *
 * @param {Request} req
 * @param {Response} res
 */
export const createUser = async (req: Request, res: Response) => {
  try {
    const {
      name,
      email,
      phone,
      isManitStudent,
      password,
      scholarNumber,
      passwordConfirm,
    } = req.body;

    if (passwordConfirm != password) {
      return res.status(400).send({
        message: "Confirm password does not match",
      });
    }
    if (!name) {
      return res.status(400).send({
        message: "Name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).send({
        message: "Email is required",
      });
    }

    if (!phone) {
      return res.status(400).send({
        message: "Phone is required",
      });
    }

    if (isManitStudent && !scholarNumber) {
      return res.status(400).send({
        message: "Scholar number is required",
      });
    }

    if (!password) {
      return res.status(400).send({
        message: "Password is required",
      });
    }

    const user = await UserRepo.findOne({ email: email.toLowerCase().trim() });

    if (user) {
      return res.status(400).send({
        message: "User exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const tempUser = new TempUserModel({
      name: name,
      email: email.toLowerCase().trim(),
      phone: phone,
      isManitStudent: isManitStudent,
      scholarNumber: scholarNumber,
      eventsRegistered: [],
      password: hashedPassword,
    });

    tempUser.save();

    //creating and saving the otp for some time
    const OTP = generateOTP();

    const verificationToken = new verificationModel({
      owner: tempUser.id,
      token: OTP,
    });

    await verificationToken.save();

    // seding otp through mail to the user
    mailTransport().sendMail({
      from: "akrampur84099@gmail.com",
      to: tempUser.email,
      subject: "OTP for accound creation",
      html: `<h1>${OTP}</h1>`,
    });

    return res.status(200).send({
      message: "OTP sent successfully",
      userId: tempUser.id,
    });
  } catch (error) {
    return res.status(400).send({
      message: error.message ? error.message : "Request failed",
    });
  }
};

//email otp verification
export const verifyOTP = async (req: Request, res: Response) => {
  const { userId, otp } = req.body;
  console.log(otp);
  if (!userId || !otp.trim()) {
    return res.status(400).send({
      message: "Request failed",
    });
  }

  const user = await TempUserModel.findOne({ id: userId });
  if (!user) {
    return res.status(400).send({
      message: "Request failed",
    });
  }

  const verificationData = await verificationModel.findOne({ owner: userId });

  if (!verificationData) {
    return res.status(400).send({
      message: "Time expired for OTP. Resend it",
    });
  }
  const OTP = verificationData?.token;

  const isOTPValid = await bcrypt.compare(otp, verificationData.token);
  if (!isOTPValid) {
    return res.status(400).send({
      message: "Invalid OTP. Please enter correct otp",
    });
  }

  const newUser = await UserRepo.create({
    name: user.name,
    email: user.email.toLowerCase().trim(),
    phone: user.phone,
    isManitStudent: user.isManitStudent,
    scholarNumber: user.scholarNumber,
    eventsRegistered: [],
    password: user.password,
  });

  verificationData.delete();
  user.delete();

  return res.status(200).send({
    message: "Account created successfully!",
  });
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
        message: "Login successfull!",
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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const user = await userRepo.findOne({ id: userId });
    if (!user) {
      return res.status(400).send({
        message: "Some error occured at server side.",
      });
    }

    return res.status(200).send({
      user: getWebUserFromDBUser(user),
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message ? err.message : "Server Error",
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

export const getWebUserFromDBUser = (user: UserDocument) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isManitStudent: user.isManitStudent,
    phone: user.phone,
    eventsRegistered: user.eventsRegistered,
    scholarNumber: user.scholarNumber,
  };
};

export const getTokenFromDBUser = (user: UserDocument) => {
  return createJWT({
    email: user.email,
    name: user.name,
    id: user.id,
  });
};
