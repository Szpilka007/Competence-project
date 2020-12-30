import { Command } from "nestjs-command";
import { Injectable } from "@nestjs/common";
import { TraceService } from "../../application/trace.service";
import { LongestRouteService } from "../../application/longestRoute.service";
import { PersonService } from "../../application/person.service";
import { distanceBetweenPoints } from "../../utils/distanceBetweenPoints";
import { HotspotService } from "../../application/hotspot.service";

@Injectable()
export class LongestRouteCommand {
  constructor(
    private readonly longestRouteService: LongestRouteService,
    private readonly peopleService: PersonService,
    private readonly traceService: TraceService,
    private readonly hotspotService: HotspotService
  ) {}

  @Command({
    command: "calculate:LongestRoutes",
    describe: "calculate longest route for each person",
    autoExit: true, // defaults to `true`, but you can use `false` if you need more control
  })
  async create(): Promise<void> {
    const people = await this.peopleService.findAllPeople();
    const hotspots = await this.hotspotService.findAll();

    const peopleTraces = await Promise.all(people.map((person) => this.traceService.getTraceForPerson(person.id)));

    const logestRoutes = peopleTraces.map((val) => {
      let longestRoute = 0;
      val.traces.forEach((trace) => {
        val.traces.forEach((innerTrace) => {
          const innerHotspot = hotspots.find((h) => h.id === innerTrace.hotspotId);
          const hotspot = hotspots.find((h) => h.id === trace.hotspotId);
          const distance = distanceBetweenPoints(
            innerHotspot.latitude,
            hotspot.latitude,
            innerHotspot.longitude,
            hotspot.longitude
          );
          if (distance > longestRoute) {
            longestRoute = distance;
          }
        });
      });
      return {
        personId: val.personId,
        routeLength: longestRoute,
      };
    });

    await Promise.all(logestRoutes.map((route) => this.longestRouteService.createRoute(route)));
  }

  @Command({
    command: "get:LongestRoutes",
    describe: "get all longest route for each person",
    autoExit: true, // defaults to `true`, but you can use `false` if you need more control
  })
  async get(): Promise<void> {
    const traces = await this.longestRouteService.getLongestRoutes();
    console.log(traces);
  }
}
