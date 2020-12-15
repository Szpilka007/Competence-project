import { Injectable } from "@nestjs/common";
import { Command } from 'nestjs-command';
import { HotspotService } from "../application/hotspot.service";

@Injectable()
export class RankHotspotsByVisits {
  public constructor(private readonly hotspotService: HotspotService) { }

  @Command({
    command: 'rankHotspots:visits',
    describe: 'ranks hotspot by total visits',
    autoExit: true
  })
  async exec(): Promise<void> {
    let result = await this.hotspotService.findAll()
    console.log("Loaded all data")
    await new Promise(resolve => setTimeout(resolve, 100000));
    console.log(result.length)
  }
}
