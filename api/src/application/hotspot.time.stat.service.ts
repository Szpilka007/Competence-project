import { Injectable } from "@nestjs/common";
import { HotspotTimeStatsEntity } from "../infrastructure/entity/hotspot.time.stats.entity";
import { HotspotTimeStatRepository } from "../infrastructure/repository/hotspot.time.stat.repository";

@Injectable()
export class HotspotTimeStatService {
  public constructor(private readonly stayPointStatRepository: HotspotTimeStatRepository) {}

  async saveAllStayPointStats(stayPointStats: HotspotTimeStatsEntity[]): Promise<HotspotTimeStatsEntity[]> {
    return await this.stayPointStatRepository.save(stayPointStats);
  }
}
