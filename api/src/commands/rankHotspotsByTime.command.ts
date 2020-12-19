import {Injectable, Logger} from "@nestjs/common";
import { Command } from 'nestjs-command';
import {StayPointRepository} from "../infrastructure/repository/stayPoint.repository";
import {HotspotTimeStatsEntity} from "../infrastructure/entity/hotspot.time.stats.entity";
import {HotspotTimeStatService} from "../application/hotspot.time.stat.service";


@Injectable()
export class RankHotspotsByTime {
    public constructor(private readonly stayPointRepository: StayPointRepository,
                       private readonly hotspotTimeStatService: HotspotTimeStatService) { }

    @Command({
        command: 'rankHotspots:time',
        describe: 'ranks hotspots by total stay time',
        autoExit: true
    })
    async exec(): Promise<void> {
        let result = await this.stayPointRepository.createQueryBuilder("stayPoints")
            .select("stayPoints.hotspotId, SUM(stayPoints.lengthOfStay) as totalTime")
            .groupBy("stayPoints.hotspotId")
            .orderBy("totalTime", "DESC")
            .getRawMany();
        let stayPointStatsEntities = result.map(o => new HotspotTimeStatsEntity(o.hotspotId, parseInt(o.totaltime)));
        await this.hotspotTimeStatService.saveAllStayPointStats(stayPointStatsEntities);
        Logger.log("Hotspot ranking has been saved.");
    }
}
