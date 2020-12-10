import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { StayPointService } from '../../application/stayPoint.service';
import { TraceService } from '../../application/trace.service';

@Injectable()
export class StayPointCommand {
  constructor(
    private readonly stayPointService: StayPointService,
    private readonly traceService: TraceService,
  ) {}

  @Command({
    command: 'calculate:StayPoints',
    describe: 'calculate stay points',
    autoExit: true // defaults to `true`, but you can use `false` if you need more control
  })

  async create(): Promise<void> {

    const traces = await this.traceService.getAllTraces();

    const stayPoints = traces.map((trace) => ({
      personId: trace.personId,
      hotspotId: trace.hotspotId,
      entryTime: trace.entryTime,
      lengthOfStay: Math.abs(trace.exitTime.getTime() - trace.entryTime.getTime()) / 60 / 1000
    }))

    const a = await Promise.all(stayPoints.map((stayPoint) => this.stayPointService.createStayPoint(stayPoint)))
    console.log(a)
  } 

  @Command({
    command: 'get:StayPoints',
    describe: 'get all stay points',
    autoExit: true // defaults to `true`, but you can use `false` if you need more control
  })

  async get(): Promise<void> {
    const traces = await this.stayPointService.getStayPoints();
    console.log(traces);
  }
}
