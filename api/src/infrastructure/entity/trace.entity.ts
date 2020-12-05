import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Trace } from "../../domain/trace/trace";

@Entity("traces")
export class TraceEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public personId: string;

  @Column()
  public hotspotId: string;

  @Column()
  public entryTime: Date;

  @Column()
  public exitTime: Date;

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
    return new Trace(this.id, this.personId, this.hotspotId, this.entryTime, this.exitTime);
  }

  static fromDomainObject(trace: Trace): TraceEntity {
    const entity = new TraceEntity();
    entity.id = trace.id;
    entity.personId = trace.personId;
    entity.hotspotId = trace.hotspotId;
    entity.entryTime = trace.entryTime;
    entity.exitTime = trace.exitTime;
    return entity;
  }
}
