import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("hotspots")
export class Hotspot {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar" })
  public name: string;

  @Column({ type: "text" })
  public description: string;

  @Column({ type: "real" })
  public longitude: number;
  
  @Column({ type: "real" })
  public latitude: number;

  @Column({ type: "varchar" })
  public type: string;
}
