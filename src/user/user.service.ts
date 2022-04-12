import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schema/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/user.dto";
import * as bcrypt from "bcrypt";
import { Role } from "../role/role.enum";

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private usersModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersModel.find().exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const createdUser = new this.usersModel(createUserDto);
    createdUser.role = Role.User;
    createdUser.password = await bcrypt.hash(createdUser.password, salt);
    return createdUser.save();
  }

  async findOne(username: string): Promise<UserDocument | undefined> {
    return this.usersModel.findOne({ username: username }).exec();
  }
}
