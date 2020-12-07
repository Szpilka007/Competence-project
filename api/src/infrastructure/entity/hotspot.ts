import { CreateHotspotRequestDto } from "../../dto/request/create.hotspot.request.dto";
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

  static fromRequestDto(dto: CreateHotspotRequestDto) {
    const hotspot = new Hotspot();
    hotspot.name = dto.name;
    hotspot.description = dto.description;
    hotspot.latitude = dto.latitude;
    hotspot.longitude = dto.longitude;
    hotspot.type = dto.type;
    return hotspot;
  }
}
