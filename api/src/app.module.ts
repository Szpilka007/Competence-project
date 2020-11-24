import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";
import { PersonEntity } from "./infrastructure/entity/person.entity";
import { PersonRepository } from "./infrastructure/repository/person.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonService } from "./application/person.service";
import { PersonGeneratorService } from "./application/person-generator.service";
import dotenv from "dotenv";
import { PersonController } from "./controller/person.controller";
import { HotspotController } from "./controller/hotspot.controller";
import { Hotspot } from "./infrastructure/entity/hotspot";
import { HotspotService } from "./application/hotspot.service";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.POSTGRES_DATABASE_URL,
      entities: [PersonEntity, Hotspot],
      extra: {
        ...(process.env.NODE_ENV !== "local" ? { ssl: { rejectUnauthorized: false } } : {}),
      },
    }),
    TypeOrmModule.forFeature([PersonRepository, Hotspot]),
  ],
  providers: [PersonService, HotspotService, PersonGeneratorService],
  controllers: [AppController, PersonController, HotspotController],
})
export class AppModule {}
