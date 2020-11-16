import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { PersonRepository } from "../infrastructure/repository/person.repository";
import { Person } from "../domain/person/person";
import { PersonEntity } from "../infrastructure/entity/person.entity";

@Injectable()
export class PersonService {
  public constructor(private readonly personRepository: PersonRepository) {}
  private logger: Logger = new Logger(PersonService.name);

  public async createPerson(payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profile: string;
  }): Promise<{ id: string }> {
    this.logger.debug(`createPerson ${JSON.stringify(payload)}`);
    const { firstName, lastName, phoneNumber, profile } = payload;

    if (!this.isPhoneNumberUnique) {
      throw new Error("Given phone number is already used");
    }

    const person = new Person(uuid(), firstName, lastName, phoneNumber, profile);

    await this.personRepository.save(PersonEntity.fromDomainObject(person));

    return { id: person.id };
  }

  public async updatePerson(payload: {
    id: string;
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profile?: string;
  }): Promise<void> {
    this.logger.debug(`updatePerson ${JSON.stringify(payload)}`);
    const { id, firstName, lastName, phoneNumber, profile } = payload;

    const personEntity = await this.personRepository.findOne(id);

    if (!personEntity) {
      throw new Error(`Person with given ID (${id}) doesn't exist`);
    }

    const person = personEntity.toDomainObject();

    if (firstName) {
      person.setFirstName(firstName);
    }

    if (lastName) {
      person.setLastName(lastName);
    }

    if (phoneNumber) {
      person.setPhoneNumber(phoneNumber);
    }

    if (profile) {
      person.setProfile(profile);
    }

    await this.personRepository.save(PersonEntity.fromDomainObject(person));
  }

  public async findPersons(payload: {
    limit: number;
    offset: number;
    ids?: string[];
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    profile?: string;
  }): Promise<{
    total: number;
    limit: number;
    offset: number;
    data: PersonEntity[];
  }> {
    this.logger.debug(`findPersons ${JSON.stringify(payload)}`);
    return this.personRepository.findPaginated(payload);
  }

  public async getPerson(id: string): Promise<PersonEntity> {
    this.logger.debug(`getPerson ${JSON.stringify(id)}`);
    const personEntity = await this.personRepository.findOne(id);
    if (!personEntity) {
      throw new Error(`Person with given ID (${id}) doesn't exist`);
    }

    return await this.personRepository.findOne({
      where: { id },
    });
  }

  public async removePerson(id: string): Promise<void> {
    this.logger.debug(`removePerson ${JSON.stringify(id)}`);
    const personEntity = await this.personRepository.findOne(id);
    if (!personEntity) {
      throw new Error(`Person with given ID (${id}) doesn't exist`);
    }

    await this.personRepository.delete(id);
  }

  private async isPhoneNumberUnique(phoneNumber: string) {
    this.logger.debug(`isPhoneNumberUnique ${JSON.stringify(phoneNumber)}`);
    return !(
      await this.personRepository.find({
        where: { phoneNumber },
      })
    )[0];
  }
}
