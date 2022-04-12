import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "../../user/schema/user.schema";
import * as mongoose from "mongoose";

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop()
  id: number;

  @Prop()
  date: Date;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  user: User;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
