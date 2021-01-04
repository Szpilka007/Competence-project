import { Command, Positional } from "nestjs-command";
import { Injectable, Logger } from "@nestjs/common";
import { TraceService } from "../application/trace.service";
import { Trace } from "../domain/trace/trace";
import { v4 as uuid } from "uuid";
import { TraceRepository } from '../infrastructure/repository/trace.repository';
import { PersonService } from '../application/person.service';
import { HotspotService } from '../application/hotspot.service';
import { TraceEntity } from '../infrastructure/entity/trace.entity';
import { HotspotController } from 'src/controller/hotspot.controller';
// import { unirand } from 'unirand';
const unirand = require('unirand');

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
    let randomIds = [];
    var desiredMin = 0; 
    var desiredMax = hotspotIDs.length-1; 
    var scale = 1; 
    var shape = 4; 
    var weibullMin = Math.pow((shape*scale), (-1*shape)) * Math.pow(.000001, shape -1) * Math.exp(Math.pow((.000001/scale), shape));
    var weibullMax = Math.pow((shape*scale), (-1*shape)) * Math.pow(.999999, shape -1) * Math.exp(Math.pow((.999999/scale), shape));

    for(let i = 0; i < bulkSize; i++){
        var r = Math.random();
        var weibullRandom = Math.pow((shape*scale), (-1*shape)) * Math.pow(r, shape-1) * Math.exp(Math.pow((r/scale), shape));
        var weibullRandomAdjusted = desiredMin + (desiredMax - desiredMin)*((weibullRandom-weibullMin) / (weibullMax - weibullMin)); 
        
        // randomIds.push(await unirand.weibull(1, 1.5).random());
        randomIds.push(Math.round(weibullRandomAdjusted));
    }
    // let maxRandom = Math.max(...randomIds);
    // let ratio = maxRandom/(hotspotIDs.length-1);
    // randomIds = randomIds.map(v=>Math.round(v/ratio));
    // let lookupId = [...Array(hotspotIDs.length).keys()];
    // unirand.shuffle(lookupId);

    for (let i = 0; i < amount; i++) {
      let randomPersonId = personIDs[Math.floor(Math.random() * personIDs.length)];
      // let randomHotspotId = hotspotIDs[Math.floor(Math.random() * hotspotIDs.length)];
      // let randomHotspotId = hotspotIDs[lookupId[randomIds.pop()]];
      let randomHotspotId = hotspotIDs[randomIds.pop()];

      //random date from past two months
      let randomEntryTime = new Date((new Date((new Date()).getTime() - 1000*60*60*24*60)).getTime() + Math.random() * ((new Date()).getTime() - (new Date((new Date()).getTime() - 1000*60*60*24*60)).getTime()));
      let randomStayTime = Math.floor(Math.random()*120+5); //minutes (min 5, max 120)
      let randomExitTime = new Date(randomEntryTime.getTime()+60000*randomStayTime);
    
      const trace = TraceEntity.fromDomainObject(new Trace(uuid(), randomPersonId, randomHotspotId, randomEntryTime, randomExitTime));
      bulk.push(trace)
      if (bulk.length == bulkSize) {
        await this.traceRepository.save(bulk);
        bulk = []
        console.log("Saved " + i + " TraceEntity");
        for(let i = 0; i < bulkSize; i++){
          var r = Math.random();
          var weibullRandom = Math.pow((shape*scale), (-1*shape)) * Math.pow(r, shape-1) * Math.exp(Math.pow((r/scale), shape)); 
          var weibullRandomAdjusted = desiredMin + (desiredMax - desiredMin)*((weibullRandom-weibullMin) / (weibullMax - weibullMin));
          
          // randomIds.push(await unirand.weibull(1, 1.5).random());
          randomIds.push(Math.round(weibullRandomAdjusted));
        }
        // let maxRandom = Math.max(...randomIds);
        // let ratio = maxRandom/(hotspotIDs.length-1);
        // randomIds = randomIds.map(v=>Math.round(v/ratio));
      }
    }
    await this.traceRepository.save(bulk);
    console.log("Saved final TraceEntity");
  }
}
