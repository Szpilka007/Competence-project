import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("hotspot_time_stats")
export class HotspotTimeStatsEntity {
  @PrimaryColumn({ type: "varchar" })
  public hotspotId: string;

  @Column({ type: "bigint" })
  public totalTime: number;

  constructor(hotspotId: string, totalTime: number) {
    this.hotspotId = hotspotId;
    this.totalTime = totalTime;
  }
}
