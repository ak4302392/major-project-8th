import { UserModel, UserOptional } from "./user.schema";
import { User } from "@/types/dto/user.dto";

const create = async (data: User) => {
  const newUser = new UserModel({
    ...data,
    createdAt: new Date(),
    modifiedAt: new Date(),
  });

  await newUser.save();

  return newUser;
};

const findOne = async (data: UserOptional) => {
  return await UserModel.findOne({ ...data });
};

const findOneById = async (id: string) => {
  return await UserModel.findById(id);
};

const update = async (id: string, data: User) => {
  await UserModel.findByIdAndUpdate(id, {
    ...data,
  });
};

const findMany = async (filter: any, projection: any): Promise<Array<User>> => {
  try {
    const users = await UserModel.find({ ...filter }, { ...projection });

    return users.map((u) => {
      return {
        ...u.toObject(),
        id: u.id,
      };
    });
  } catch (err) {
    throw err;
  }
};

export default {
  create,
  findOne,
  update,
  findMany,
  findOneById,
};
