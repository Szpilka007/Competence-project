import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { PhoneLookUp } from "../../domain/lookup/phone";

@Entity("phoneLookUp")
export class PhoneLookUpEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar" })
  public fakeNumber: string;

  @Column({ type: "varchar" })
  public realNumber: string;

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
    return new PhoneLookUp(this.id, this.fakeNumber, this.realNumber);
  }

  static fromDomainObject(person: PhoneLookUp): PhoneLookUpEntity {
    const entity = new PhoneLookUpEntity();
    entity.id = person.id;
    entity.fakeNumber = person.fakeNumber;
    entity.realNumber = person.realNumber;
    return entity;
  }
}
