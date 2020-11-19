import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateHotspotRequestDto } from "./create.hotspot.request.dto";
import { Hotspot } from "./hotspot";
import { HotspotService } from "./hotspot.service";

@ApiTags("Hotspots")
@Controller("hotspots")
export class HotspotController {
  public constructor(private hotspotService: HotspotService) {}

  @Get("/")
  public async getAll(): Promise<Hotspot[]> {
    return [];
  }
  
  @ApiResponse({
    type: CreateHotspotRequestDto,
  })
  @Post("/")
  public async createHotspot(@Body() body: CreateHotspotRequestDto): Promise<CreateHotspotRequestDto> {
    try {
      await this.hotspotService.save({...body, id: null});
      return body;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
