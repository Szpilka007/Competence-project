import { Injectable } from "@nestjs/common";
import { Command } from 'nestjs-command';
import { TraceService } from "../application/trace.service";
import { HotspotService } from "../application/hotspot.service";
import { TraceRepository } from "../infrastructure/repository/trace.repository";

@Injectable()
export class RankHotspotsByVisits {
  public constructor(private readonly traceRepository: TraceRepository) { }

  @Command({
    command: 'rankHotspots:visits',
    describe: 'ranks hotspot by total visits',
    autoExit: true
  })
  async exec(): Promise<void> {
    let result = await this.traceRepository.createQueryBuilder("traces")
      .select("traces.hotspotId, COUNT(*) as total")
      .groupBy("traces.hotspotId")
      .orderBy("total", "DESC")
      .getRawMany();
    console.log(result);    
  }
}
