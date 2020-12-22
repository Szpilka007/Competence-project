import { Command, Positional } from "nestjs-command";
import { Injectable, Logger } from "@nestjs/common";
import { TraceService } from "../application/trace.service";
import { Trace } from "../domain/trace/trace";
import { v4 as uuid } from "uuid";
import { TraceRepository } from "../infrastructure/repository/trace.repository";
import { PersonService } from "../application/person.service";
import { HotspotService } from "../application/hotspot.service";
import { TraceEntity } from "../infrastructure/entity/trace.entity";
import { HotspotController } from "src/controller/hotspot.controller";

@Injectable()
export class GenerateTracesCommand {
  public constructor(
    private readonly traceService: TraceService,
    private readonly traceRepository: TraceRepository,
    private readonly personService: PersonService,
    private readonly hotspotService: HotspotService
  ) {}

  @Command({
    command: "generateTraces",
    describe: "generates traces",
    autoExit: true, // defaults to `true`, but you can use `false` if you need more control
  })
  async exec(
    @Positional({
      name: "amount",
      alias: "a",
      describe: "number of traces to generate",
      type: "number",
    })
    amount: number
  ): Promise<void> {
    let persons = await this.personService.findAllPeople();
    let hotspots = await this.hotspotService.findAll();

    let personIDs = persons.map((person) => person.id);
    let hotspotIDs = hotspots.map((hotspot) => hotspot.id);

    const bulkSize = 1000;
    let bulk: TraceEntity[] = [];

    await this.traceRepository.query(`TRUNCATE TABLE traces;`);

    for (let i = 0; i < amount; i++) {
      let randomPersonId = personIDs[Math.floor(Math.random() * personIDs.length)];
      let randomHotspotId = hotspotIDs[Math.floor(Math.random() * hotspotIDs.length)];
      let randomEntryTime = new Date(
        new Date(2012, 0, 1).getTime() + Math.random() * (new Date().getTime() - new Date(2012, 0, 1).getTime())
      );
      let randomStayTime = Math.floor(Math.random() * 120 + 5); //minutes (min 5, max 120)
      let randomExitTime = new Date(randomEntryTime.getTime() + 60000 * randomStayTime);

      const trace = TraceEntity.fromDomainObject(
        new Trace(uuid(), randomPersonId, randomHotspotId, randomEntryTime, randomExitTime)
      );
      bulk.push(trace);
      if (bulk.length == bulkSize) {
        await this.traceRepository.save(bulk);
        bulk = [];
        console.log("Saved " + i + " TraceEntity");
      }
    }
    await this.traceRepository.save(bulk);
    console.log("Saved final TraceEntity");
  }
}
