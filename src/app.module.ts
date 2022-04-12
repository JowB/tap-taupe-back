import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { MessageModule } from "./message/message.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ProductModule } from "./product/product.module";
import { AuthModule } from "./auth/auth.module";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [
    MessageModule,
    MongooseModule.forRoot("mongodb://localhost:27017/nestjs"),
    ProductModule,
    AuthModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
