import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { HotstpotVisitStatsEntity } from "../infrastructure/entity/hotspot.visits.stat.entity";
import { Repository } from "typeorm";

@Injectable()
export class HotspotStatsService {
  constructor(
    @InjectRepository(HotstpotVisitStatsEntity)
    private repository: Repository<HotstpotVisitStatsEntity>
  ) {}

  async saveAllVisitStats(hotspotStats: HotstpotVisitStatsEntity[]): Promise<HotstpotVisitStatsEntity[]> {
    let result = await this.repository.save(hotspotStats);
    return result;
  }
}
