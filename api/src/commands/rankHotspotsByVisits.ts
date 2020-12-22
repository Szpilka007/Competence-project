import { Injectable, Logger } from "@nestjs/common";
import { Command } from 'nestjs-command';
import { HotspotStatsService } from "../application/hotspot.stats.service";
import { HotstpotVisitStatsEntity } from "../infrastructure/entity/hotspot.visits.stat.entity";
import { TraceRepository } from "../infrastructure/repository/trace.repository";

@Injectable()
export class RankHotspotsByVisits {
  public constructor(
    private readonly traceRepository: TraceRepository,
    private readonly hotspotStatsRepository: HotspotStatsService,
  ) { }

  @Command({
    command: 'rankHotspots:visits',
    describe: 'ranks hotspot by total visits',
    autoExit: true
  })
  async exec(): Promise<void> {
    try {
      Logger.log("Calculating visit count for repositories...");
      let result = await this.traceRepository.createQueryBuilder("traces")
      .select("traces.hotspotId, COUNT(*) as total")
      .groupBy("traces.hotspotId")
      .orderBy("total", "DESC")
      .getRawMany();
      let entities = result.map(result => new HotstpotVisitStatsEntity(result.hotspotId, result.total));
      await this.hotspotStatsRepository.saveAllVisitStats(entities);
      Logger.log("Finished!");
    } catch (exception) {
      Logger.error("Terminated with exception:");
      Logger.error(exception);
    }
  }
}
