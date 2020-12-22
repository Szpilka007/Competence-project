import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("hotspot_visit_stats")
export class HotstpotVisitStatsEntity {
  @PrimaryColumn({ type: "varchar" })
  public hotspotId: string;

  @Column({ type: "integer" })
  public visits: number;

  constructor(hotspotId: string, visits: number) {
    this.hotspotId = hotspotId;
    this.visits = visits;
  };
}
