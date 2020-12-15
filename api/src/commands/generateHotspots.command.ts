import { Command, Positional } from 'nestjs-command';
import { Injectable, Logger } from '@nestjs/common';
import { Hotspot } from "../infrastructure/entity/hotspot";
import { HotspotService } from '../application/hotspot.service';
import prob from "prob.js"

const EARTH_RADIUS: number = 6357.0;
const CENTER_LATITUDE: number = 51.747192 * Math.PI / 180.0;
const CENTER_LONGITUDE: number = 19.453153 * Math.PI / 180.0;

const HOTSPOT_TYPES = [
  { place: 'Cafe', type: 'indoor', description: 'Tea or coffee?' },
  { place: 'Restaurant', type: 'indoor', description: 'You can eat well here.' },
  { place: 'Dorm', type: 'indoor', description: 'Best students\' parties, everyone is invited.' },
  { place: 'Library', type: 'indoor', description: 'You can find here almost every book.' },
  { place: 'Administration', type: 'indoor', description: 'University administration building.' },
  { place: 'Classrooms', type: 'indoor', description: 'University building, where classes are given.' },
  { place: 'Park', type: 'outdoor', description: 'Chill among trees.' },
  { place: 'Bus stop', type: 'outdoor', description: 'Now you can go wherever you want to.' },
  { place: 'Shop', type: 'indoor', description: 'Just a shop.' },
  { place: 'Cinema', type: 'indoor', description: 'The newest movies in one place.' },
  { place: 'Gym', type: 'indoor', description: 'You can do a workout here.' }
];

@Injectable()
export class GenerateHotspotsCommand {
  public constructor(private readonly hotspotService: HotspotService) { }

  @Command({
    command: 'generateHotspots',
    describe: 'generates hotspot',
    autoExit: true // defaults to `true`, but you can use `false` if you need more control
  })
  async exec(
    @Positional({
      name: 'amount',
      alias: 'a',
      describe: 'number of hotspots to generate',
      type: 'number',
    })
    amount: number,
  ): Promise<void> {
    const exponential = prob.exponential(1.0);

    const bulkSize = 10000
    let bulk: Hotspot[] = []

    for (let i = 0; i < amount; i++) {
      let angle: number = Math.random() * 2 * Math.PI;
      let distance: number = exponential();
      let latitude: number = this.phi(distance, angle) * 180 / Math.PI;
      let longitude: number = this.lambda(distance, angle, latitude) * 180 / Math.PI;
      let hotspotType = this.getRandomHotspotType();
      let hotspot = Hotspot.fromRequestDto({
        name: hotspotType.place,
        latitude: latitude,
        longitude: longitude,
        type: hotspotType.type,
        description: hotspotType.description
      });
      bulk.push(hotspot)
      if (i % bulkSize == bulkSize - 1) {
        await this.hotspotService.bulkSave(bulk) 
        bulk = []
      }
      if (i % Math.floor(amount / 100) == 0) Logger.log("Generated hotspot #" + i);
    }
    await this.hotspotService.bulkSave(bulk)
  }

  phi(distance: number, angle: number): number {
    return Math.asin(Math.sin(CENTER_LATITUDE) * Math.cos(distance / EARTH_RADIUS) + Math.cos(CENTER_LATITUDE) * Math.sin(distance / EARTH_RADIUS) * Math.cos(angle));
  }

  lambda(distance: number, angle: number, latitude: number): number {
    return CENTER_LONGITUDE + Math.atan2(Math.sin(angle) * Math.sin(distance / EARTH_RADIUS) * Math.cos(CENTER_LATITUDE),
      Math.cos(distance / EARTH_RADIUS) - Math.sin(CENTER_LATITUDE) * Math.sin(latitude));
  }

  getRandomHotspotType() {
    return HOTSPOT_TYPES[Math.floor(Math.random() * (HOTSPOT_TYPES.length))];
  }
}
