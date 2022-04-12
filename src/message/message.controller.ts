import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from "@nestjs/common";
import { MessageService } from "./message.service";
import { CreateMessageDto } from "./dto/message.dto";
import { Message } from "./schema/message.schema";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@Controller("messages")
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get()
  getAllMessages(): Promise<Message[]> {
    return this.messageService.findAll();
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createMessage(
    @Body() createMessageDto: CreateMessageDto,
    @Request() req
  ): Promise<Message> {
    return this.messageService.create(createMessageDto, req.user);
  }

  @Get(":id")
  getMessageById(@Param("id") id: string): Promise<Message> {
    return this.messageService.findOne(id);
  }

  @Put(":id")
  updateMessageById(
    @Param("id") id: string,
    @Body() createMessageDto: CreateMessageDto
  ): Promise<Message> {
    return this.messageService.update(id, createMessageDto);
  }

  @Delete(":id")
  deleteMessageById(@Param("id") id: string): Promise<Message> {
    return this.messageService.delete(id);
  }
}
