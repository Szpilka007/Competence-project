import { Injectable, Logger } from "@nestjs/common";
import { Person } from "../domain/person/person";
import { PersonService } from "../application/person.service";
import faker from "faker";
import { Command, Positional } from "nestjs-command";
import { performance } from "perf_hooks";

@Injectable()
export class GeneratePersonsCommand {
  public constructor(private readonly personService: PersonService) {}

  @Command({
    command: "generatePersons",
    describe: "generates persons",
    autoExit: true,
  })
  async exec(
    @Positional({
      name: "amount",
      alias: "a",
      describe: "number of peoples to generate",
      type: "number",
    })
    amount: number,
    @Positional({
      name: "fake",
      alias: "f",
      describe: "generate fake numbers and lookup",
      type: "boolean",
    })
    fake: boolean
  ): Promise<void> {
    const startTime = performance.now();
    const logMark = Math.floor(amount / 100);
    for (let i = 0; i < amount; i += 1) {
      if (i % logMark == 0) Logger.log("Creating person #" + i);
      await this.personService
        .createPerson(
          new Person(
            faker.random.uuid(),
            faker.name.findName(),
            faker.name.lastName(),
            faker.phone.phoneNumber(),
            faker.name.jobTitle()
          ),
          fake
        )
        .then(() => {});
    }
    const endTime = performance.now();
    const executionTime = endTime - startTime;
    Logger.log(`Execution time: ${executionTime}ms`);
  }
}
