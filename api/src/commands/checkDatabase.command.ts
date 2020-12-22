import { Command, Positional } from "nestjs-command";
import { Injectable, Logger } from "@nestjs/common";
import { TraceService } from "../application/trace.service";
import { Trace } from "../domain/trace/trace";
import { v4 as uuid } from "uuid";
import { TraceRepository } from "../infrastructure/repository/trace.repository";
import { PersonService } from "../application/person.service";
import { HotspotService } from "../application/hotspot.service";
import { PhoneLookUpRepository } from "../infrastructure/repository/phoneLookUp.repository";
import { TraceEntity } from "../infrastructure/entity/trace.entity";
import { HotspotController } from "src/controller/hotspot.controller";

@Injectable()
export class checkDatabase {
  public constructor(
    private readonly traceService: TraceService,
    private readonly traceRepository: TraceRepository,
    private readonly personService: PersonService,
    private readonly phoneLookUpRepository: PhoneLookUpRepository,
    private readonly hotspotService: HotspotService
  ) {}

  @Command({
    command: "checkDatabase",
    describe: "check data in database",
    autoExit: true, // defaults to `true`, but you can use `false` if you need more control
  })
  async exec(
    @Positional({
      name: "verbose",
      alias: "V",
      describe: "check data in database",
      type: "boolean",
    })
    verbose: boolean
  ): Promise<void> {
    let persons = await this.personService.findAllPeople();
    let hotspots = await this.hotspotService.findAll();
    let traces = await this.traceService.getAllTraces();

    let phoneLoopUp = await this.phoneLookUpRepository.find();

    if (verbose) {
      console.log("First 5 Persons:");
      console.log(persons.slice(0, 5));
      console.log("PhoneLookUp:");
      console.log(phoneLoopUp.slice(0, 5));
      console.log("First 5 Hotspots:");
      console.log(hotspots.slice(0, 5));
      console.log("First 5 Traces:");
      console.log(traces.slice(0, 5));
    }

    console.log(`Number of persons: ${persons.length}`);
    console.log(`Number of hotspots: ${hotspots.length}`);
    console.log(`Number of traces: ${traces.length}`);
  }
}
