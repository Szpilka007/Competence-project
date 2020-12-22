import { Command, Positional } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { TraceService } from '../application/trace.service';
import { TraceRepository } from '../infrastructure/repository/trace.repository';
import { PersonService } from '../application/person.service';
import { HotspotService } from '../application/hotspot.service';
import mode from 'src/utils/mode';
import { Hotspot } from 'src/infrastructure/entity/hotspot';
import { createObjectCsvWriter } from 'csv-writer';

@Injectable()
export class IdentifyMostPopulatStayPointsCommand {
  public constructor(
    private readonly traceService: TraceService, 
    private readonly traceRepository: TraceRepository,
    private readonly personService: PersonService,
    private readonly hotspotService: HotspotService
    ) { }

  @Command({
    command: 'getMostPopularStayPoints',
    describe: ': Given a point of interest, calculate which point of interest is most often visited from the given point of interest',
    autoExit: true
  })
  async exec(
    @Positional({
      name: 'output',
      alias: 'o',
      describe: 'file name of csv with generated data',
      type: 'string',
    })
    output: string,
  ): Promise<void> {

    const people = await this.personService.findAllPeople();
    const hotspots = await this.hotspotService.findAll();

    const traces = await Promise.all(people.map((person) => this.traceRepository.find({personId: person.id})));

    const hotspotsHistogram: { [key: string] : string[]} = {};

    const results: {fromHotspot: Hotspot, toHotspot: Hotspot}[] = [];

    traces.forEach((traceList) => {
     const sortedTraces = traceList.sort((a, b) => a.entryTime.getTime() - b.entryTime.getTime());

     for (let index = 0; index < sortedTraces.length - 2; index++) {
      const fromHotspot = sortedTraces[index].hotspotId;
      const toHotspot = sortedTraces[index + 1].hotspotId;
      if(!hotspotsHistogram[fromHotspot]) {
        hotspotsHistogram[fromHotspot] = [toHotspot]
      } else {

        hotspotsHistogram[fromHotspot].push(toHotspot)
      }
    }
    })
    for (const hotspotsId in hotspotsHistogram) {
      const mostPopularHotspotId = mode(hotspotsHistogram[hotspotsId])
      const fromHotspot = hotspots.find((h) => h.id === hotspotsId);
      const toHotspot = hotspots.find((h) => h.id === mostPopularHotspotId);
      results.push({fromHotspot, toHotspot })
    }


    const csvWriter = createObjectCsvWriter({
      path: `${output}.csv`,
      header: [
        {id: 'fromHotspot_id', title: 'fromHotspot_id'},
        {id: 'fromHotspot_name', title: 'fromHotspot_name'},
        {id: 'fromHotspot_description', title: 'fromHotspot_description'},
        {id: 'fromHotspot_longitud', title: 'fromHotspot_longitud'},
        {id: 'fromHotspot_latitude', title: 'fromHotspot_latitude'},
        {id: 'fromHotspot_type', title: 'fromHotspot_type'},
        {id: 'toHotspot_id', title: 'toHotspot_id'},
        {id: 'toHotspot_name', title: 'toHotspot_name'},
        {id: 'toHotspot_name', title: 'toHotspot_name'},
        {id: 'toHotspot_description', title: 'toHotspot_description'},
        {id: 'toHotspot_longitude', title: 'toHotspot_longitude'},
        {id: 'toHotspot_latitude', title: 'toHotspot_latitude'},
        {id: 'toHotspot_type', title: 'toHotspot_type'},
      ]
    });

    await csvWriter.writeRecords([...results.map(r => ({
      fromHotspot_id: r.fromHotspot.id,
      fromHotspot_name: r.fromHotspot.name,
      fromHotspot_description: r.fromHotspot.description,
      fromHotspot_longitud: r.fromHotspot.longitude,
      fromHotspot_latitude: r.fromHotspot.latitude,
      fromHotspot_type: r.fromHotspot.type,
      toHotspot_id: r.toHotspot.id,
      toHotspot_name: r.toHotspot.name,
      toHotspot_description: r.toHotspot.description,
      toHotspot_longitude: r.toHotspot.longitude,
      toHotspot_latitude: r.toHotspot.latitude,
      toHotspot_type: r.toHotspot.type,
    }))])
    console.log(`Writen ${results.length} records`)
  }
}
