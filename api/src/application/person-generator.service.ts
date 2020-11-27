import {Injectable} from "@nestjs/common";
import {Person} from "../domain/person/person";
import {PersonService} from "./person.service";
import faker from 'faker';

@Injectable()
export class PersonGeneratorService {
    public constructor(private readonly personService: PersonService ) {}

    generateRandomPersons(amount: number): void {
        for(let i = 0 ; i < amount ; i += 1) {
            this.personService.createPerson(new Person(faker.random.uuid(), faker.name.findName(), faker.name.lastName(), faker.phone.phoneNumber(), faker.name.jobTitle()))
                .then(() => {});
        }
    }


}
