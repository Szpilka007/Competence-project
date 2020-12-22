import { Repository, EntityRepository } from "typeorm";
import { HotspotTimeStatsEntity } from "../entity/hotspot.time.stats.entity";

@EntityRepository(HotspotTimeStatsEntity)
export class HotspotTimeStatRepository extends Repository<HotspotTimeStatsEntity> {}
