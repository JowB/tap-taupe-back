import { Injectable } from "@nestjs/common";
import { CreateMessageDto } from "./dto/message.dto";
import { Message, MessageDocument } from "./schema/message.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { MessagesGateway } from "./message.gateway";

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    private messagesGateway: MessagesGateway
  ) {}

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().populate("user").exec();
  }

  async create(
    createMessageDto: CreateMessageDto,
    user: any
  ): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageDto);
    createdMessage.date = new Date();
    createdMessage.user = user.userId;
    await createdMessage.save();
    const message = await this.findOne(createdMessage._id);
    this.messagesGateway.sendNewMessage(message);
    return message;
  }

  async findOne(id: string): Promise<Message> {
    return this.messageModel.findOne({ _id: id }).populate("user").exec();
  }

  async delete(id: string): Promise<Message> {
    return await this.messageModel.findByIdAndRemove({ _id: id }).exec();
  }

  async update(
    id: string,
    createMessageDto: CreateMessageDto
  ): Promise<Message> {
    return this.messageModel
      .findByIdAndUpdate({ _id: id }, createMessageDto)
      .setOptions({ new: true });
  }
}
