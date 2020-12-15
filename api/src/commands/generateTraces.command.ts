import { Command, Positional } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import { TraceService } from '../application/trace.service';
import { Trace } from '../domain/trace/trace';
import { v4 as uuid } from "uuid";
import { TraceRepository } from '../infrastructure/repository/trace.repository';
import { TraceEntity } from '../infrastructure/entity/trace.entity';

@Injectable()
export class GenerateTracesCommand {
  public constructor(private readonly traceService: TraceService, private readonly traceRepository: TraceRepository) { }

  @Command({
    command: 'generateTraces',
    describe: 'generates traces',
    autoExit: true // defaults to `true`, but you can use `false` if you need more control
  })
  async exec(
    @Positional({
      name: 'amount',
      alias: 'a',
      describe: 'number of traces to generate',
      type: 'number',
    })
    amount: number,
  ): Promise<void> {
    const bulkSize = 1000;
    let bulk: TraceEntity[] = []

    await this.traceRepository.query(`TRUNCATE TABLE traces;`);

    let ids: string[] = []
    for (let i = 0; i < 1000; i++) ids.push(uuid())
    
    for (let i = 0; i < amount; i++) {
      let randomId = ids[Math.floor(Math.random() * ids.length)];
      const trace = TraceEntity.fromDomainObject(new Trace(uuid(), randomId, randomId, new Date(), new Date()));
      bulk.push(trace)
      if (bulk.length == bulkSize) {
        await this.traceRepository.save(bulk);
        bulk = []
        console.log("Saved " + i + " TraceEntity")
      }
    }
    await this.traceRepository.save(bulk);
    console.log("Saved final TraceEntity")
  }
}
