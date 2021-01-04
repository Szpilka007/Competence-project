import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { LongestRoute } from "../../domain/longestRoute/longestRoute";

@Entity("longestRoutes")
export class LongestRouteEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  public personId: string;

  @Column()
  public routeLength: Number;

  @Column({ default: new Date() })
  public updatedAt: Date;

  @Column({ default: new Date() })
  public createdAt: Date;

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
    return new LongestRoute(this.id, this.personId, this.routeLength);
  }

  static fromDomainObject(route: LongestRoute): LongestRouteEntity {
    const entity = new LongestRouteEntity();
    entity.id = route.id;
    entity.personId = route.personId;
    entity.routeLength = route.routeLength;

    return entity;
  }
}
