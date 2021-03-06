import { Module } from "@nestjs/common";
import { AppController } from "./controller/app.controller";
import { PersonEntity } from "./infrastructure/entity/person.entity";
import { PersonRepository } from "./infrastructure/repository/person.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonService } from "./application/person.service";
import dotenv from "dotenv";
import { PersonController } from "./controller/person.controller";
import { HotspotController } from "./controller/hotspot.controller";
import { Hotspot } from "./infrastructure/entity/hotspot";
import { HotspotService } from "./application/hotspot.service";
import { PhoneLookUpEntity } from "./infrastructure/entity/phoneLookUp.entity";
import { PhoneLookUpRepository } from "./infrastructure/repository/phoneLookUp.repository";
import { TraceEntity } from "./infrastructure/entity/trace.entity";
import { TraceRepository } from "./infrastructure/repository/trace.repository";
import { TraceService } from "./application/trace.service";
import { TraceController } from "./controller/trace.controller";
import { CommandModule } from "nestjs-command";
import { StayPointRepository } from "./infrastructure/repository/stayPoint.repository";
import { StayPointService } from "./application/stayPoint.service";
import { StayPointCommand } from "./commands/stayPoint.command";
import { StayPointEntity } from "./infrastructure/entity/stayPoint.entity";
import { GenerateHotspotsCommand } from "./commands/generateHotspots.command";
import { GeneratePersonsCommand } from "./commands/generatePersons.command";
import { RankHotspotsByVisits } from "./commands/rankHotspotsByVisits";
import { GenerateTracesCommand } from "./commands/generateTraces.command";
import { checkDatabase } from "./commands/checkDatabase.command";
import { HotspotStatsService } from "./application/hotspot.stats.service";
import { HotstpotVisitStatsEntity } from "./infrastructure/entity/hotspot.visits.stat.entity";
import { IdentifyMostPopulatStayPointsCommand } from "./commands/identifyMostPopularPoints";
import { RankHotspotsByTime } from "./commands/rankHotspotsByTime.command";
import { HotspotTimeStatsEntity } from "./infrastructure/entity/hotspot.time.stats.entity";
import { HotspotTimeStatRepository } from "./infrastructure/repository/hotspot.time.stat.repository";
import { HotspotTimeStatService } from "./application/hotspot.time.stat.service";
import {LongestRouteRepository} from "./infrastructure/repository/longestRoute.repository";
import {LongestRouteEntity} from "./infrastructure/entity/longestRoute.entity";
import {LongestRouteService} from "./application/longestRoute.service";
import {LongestRouteCommand} from "./domain/longestRoute/longestRoute.commnad";

dotenv.config();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.POSTGRES_DATABASE_URL,
      entities: [
        PersonEntity,
        Hotspot,
        TraceEntity,
        StayPointEntity,
        HotspotTimeStatsEntity,
        PhoneLookUpEntity,
        HotstpotVisitStatsEntity,
        LongestRouteEntity
      ],
      extra: {
        ...(process.env.NODE_ENV !== "local" ? { ssl: { rejectUnauthorized: false } } : {}),
      },
    }),
    TypeOrmModule.forFeature([
      PersonRepository,
      Hotspot,
      TraceRepository,
      StayPointRepository,
      HotspotTimeStatRepository,
      PhoneLookUpRepository,
      HotstpotVisitStatsEntity,
      LongestRouteRepository
    ]),
    CommandModule,
  ],
  providers: [
    PersonService,
    HotspotService,
    TraceService,
    StayPointService,
    StayPointCommand,
    HotspotTimeStatService,
    GenerateHotspotsCommand,
    GeneratePersonsCommand,
    RankHotspotsByVisits,
    GenerateTracesCommand,
    checkDatabase,
    RankHotspotsByTime,
    IdentifyMostPopulatStayPointsCommand,
    HotspotStatsService,
    LongestRouteService,
    LongestRouteCommand
  ],
  controllers: [AppController, PersonController, HotspotController, TraceController],
})
export class AppModule {}
