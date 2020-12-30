import { Test } from "@nestjs/testing";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PersonEntity } from "../../src/infrastructure/entity/person.entity";
import { Hotspot } from "../../src/infrastructure/entity/hotspot";
import { TraceEntity } from "../../src/infrastructure/entity/trace.entity";
import { StayPointEntity } from "../../src/infrastructure/entity/stayPoint.entity";
import { HotspotTimeStatsEntity } from "../../src/infrastructure/entity/hotspot.time.stats.entity";
import { PhoneLookUpEntity } from "../../src/infrastructure/entity/phoneLookUp.entity";
import { HotstpotVisitStatsEntity } from "../../src/infrastructure/entity/hotspot.visits.stat.entity";
import { PersonRepository } from "../../src/infrastructure/repository/person.repository";
import { TraceRepository } from "../../src/infrastructure/repository/trace.repository";
import { StayPointRepository } from "../../src/infrastructure/repository/stayPoint.repository";
import { HotspotTimeStatRepository } from "../../src/infrastructure/repository/hotspot.time.stat.repository";
import { PhoneLookUpRepository } from "../../src/infrastructure/repository/phoneLookUp.repository";
import { CommandModule } from "nestjs-command";
import { PersonService } from "../../src/application/person.service";
import { HotspotService } from "../../src/application/hotspot.service";
import { TraceService } from "../../src/application/trace.service";
import { StayPointService } from "../../src/application/stayPoint.service";
import { StayPointCommand } from "../../src/commands/stayPoint.command";
import { HotspotTimeStatService } from "../../src/application/hotspot.time.stat.service";
import { GenerateHotspotsCommand } from "../../src/commands/generateHotspots.command";
import { GeneratePersonsCommand } from "../../src/commands/generatePersons.command";
import { RankHotspotsByVisits } from "../../src/commands/rankHotspotsByVisits";
import { GenerateTracesCommand } from "../../src/commands/generateTraces.command";
import { checkDatabase } from "../../src/commands/checkDatabase.command";
import { RankHotspotsByTime } from "../../src/commands/rankHotspotsByTime.command";
import { IdentifyMostPopulatStayPointsCommand } from "../../src/commands/identifyMostPopularPoints";
import { HotspotStatsService } from "../../src/application/hotspot.stats.service";
import { AppController } from "../../src/controller/app.controller";
import { PersonController } from "../../src/controller/person.controller";
import { HotspotController } from "../../src/controller/hotspot.controller";
import { TraceController } from "../../src/controller/trace.controller";

export const setupAppTestModule = async () => {
  const module = await Test.createTestingModule({
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
    ],
    controllers: [AppController, PersonController, HotspotController, TraceController],
  }).compile();

  return module.createNestMicroservice({}).init();
};
