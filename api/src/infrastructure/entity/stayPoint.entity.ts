import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StayPoint } from "../../domain/stayPoint/stayPoint";

@Entity("stayPoints")
export class StayPointEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public personId: string;

  @Column()
  public hotspotId: string;

  @Column()
  public entryTime: Date;

  @Column()
  public lengthOfStay: Number;

  @Column({ default: new Date() })
  public createdAt: Date;

  @Column({ default: new Date() })
  public updatedAt: Date;

  @BeforeInsert()
  protected onBeforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  protected onBeforeUpdate() {
    this.updatedAt = new Date();
  }

  public toDomainObject() {
    return new StayPoint(this.id, this.personId, this.hotspotId, this.entryTime, this.lengthOfStay);
  }

  static fromDomainObject(stayPoint: StayPoint): StayPointEntity {
    const entity = new StayPointEntity();
    entity.id = stayPoint.id;
    entity.personId = stayPoint.personId;
    entity.hotspotId = stayPoint.hotspotId;
    entity.entryTime = stayPoint.entryTime;
    entity.lengthOfStay = stayPoint.lengthOfStay;
    return entity;
  }
}
