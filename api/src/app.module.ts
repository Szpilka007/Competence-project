import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";

@Module({
  imports: [],
  providers: [],
  controllers: [AppController],
})
export class AppModule {}
