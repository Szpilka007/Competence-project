import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { PersonRepository } from "../infrastructure/repository/person.repository";
import { PhoneLookUpRepository } from "../infrastructure/repository/phoneLookUp.repository"
import { Person } from "../domain/person/person";
import { PhoneLookUp } from "../domain/lookup/phone";
import { PersonEntity } from "../infrastructure/entity/person.entity";
import { PhoneLookUpEntity } from "../infrastructure/entity/phoneLookUp.entity";
import faker from 'faker';

@Injectable()
export class PersonService {
  public constructor(private readonly personRepository: PersonRepository, private readonly phoneLookUpRepository: PhoneLookUpRepository) {}
  private logger: Logger = new Logger(PersonService.name);

  public async createPerson(payload: {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    profile: string;
  }, fake = true): Promise<{ id: string }> {
    this.logger.debug(`createPerson ${JSON.stringify(payload)}`);
  
    if (!this.isPhoneNumberUnique) {
      throw new Error("Given phone number is already used");
    }

    const { firstName, lastName, phoneNumber, profile } = payload;
    var person;
    if(fake){
      const fakeNumber = faker.phone.phoneNumber();
      await this.phoneLookUpRepository.save(PhoneLookUpEntity.fromDomainObject(new PhoneLookUp(uuid(), fakeNumber, phoneNumber)));
      person = new Person(uuid(), firstName, lastName, fakeNumber, profile);
    }else{
      person = new Person(uuid(), firstName, lastName, phoneNumber, profile);
    }

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

  public async getPersonWithRealNumber(id: string): Promise<PersonEntity> {
    this.logger.debug(`getPerson ${JSON.stringify(id)}`);
    const personEntity = await this.personRepository.findOne(id);
    if (!personEntity) {
      throw new Error(`Person with given ID (${id}) doesn't exist`);
    }

    var person = await this.personRepository.findOne({
      where: { id },
    });
    person.phoneNumber = (await this.phoneLookUpRepository.find({
      where: { fakeNumber: person.phoneNumber },
    }))[0].realNumber;

    return person;
  }

  public async removePerson(id: string): Promise<void> {
    this.logger.debug(`removePerson ${JSON.stringify(id)}`);

    const personEntity = await this.personRepository.findOne(id);
    if (!personEntity) {
      throw new Error(`Person with given ID (${id}) doesn't exist`);
    }

    const lookUpEntity = await this.phoneLookUpRepository.findOne({fakeNumber: personEntity.phoneNumber});
    if (lookUpEntity) {
      await this.phoneLookUpRepository.delete(lookUpEntity)
    }

    await this.personRepository.delete(id);
  }

  public async findAllPeople(): Promise<PersonEntity[]> {
    return this.personRepository.find();
  }

  public async findAllPeopleWithRealNumbers(): Promise<PersonEntity[]> {
    var loopkup = await this.phoneLookUpRepository.find();
    var out = this.personRepository.find().then(people=>{
      return people.map(person=>{
        var realNumber = loopkup.find(el=>el.fakeNumber == person.phoneNumber).realNumber
        person.phoneNumber = realNumber;
        return person;
      })
    });
    return out;
  }

  private async isPhoneNumberUnique(phoneNumber: string) {
    this.logger.debug(`isPhoneNumberUnique ${JSON.stringify(phoneNumber)}`);
    return !(
      await this.phoneLookUpRepository.find({
        where: { realNumber: phoneNumber },
      })
    )[0];
  }

}
