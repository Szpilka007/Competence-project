import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Person } from "../../domain/person/person";

@Entity("booking_insurances")
export class PersonEntity {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ type: "varchar" })
  public firstName: string;

  @Column({ type: "varchar" })
  public lastName: string;

  @Column({ type: "varchar" })
  public phoneNumber: string;

  @Column({ type: "varchar" })
  public profile: string;

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
    return new Person(this.id, this.firstName, this.lastName, this.phoneNumber, this.profile);
  }

  static fromDomainObject(person: Person): PersonEntity {
    const entity = new PersonEntity();
    entity.id = person.id;
    entity.firstName = person.firstName;
    entity.lastName = person.lastName;
    entity.phoneNumber = person.phoneNumber;
    entity.profile = person.profile;
    return entity;
  }
}
