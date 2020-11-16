import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";
import { PersonEntity } from "./infrastructure/entity/person.entity";
import { PersonRepository } from "./infrastructure/repository/person.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonService } from "./application/person.service";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.POSTGRES_DATABASE_URL,
      entities: [PersonEntity],
      extra: {
        ...(process.env.NODE_ENV !== "local" ? { ssl: { rejectUnauthorized: false } } : {}),
      },
    }),
    TypeOrmModule.forFeature([PersonRepository]),
  ],
  providers: [PersonService],
  controllers: [AppController],
})
export class AppModule {}
