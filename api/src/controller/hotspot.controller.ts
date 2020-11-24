import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateHotspotRequestDto } from "../dto/request/create.hotspot.request.dto";
import { Hotspot } from "../infrastructure/entity/hotspot";
import { HotspotService } from "../application/hotspot.service";

@ApiTags("Hotspots")
@Controller("hotspots")
export class HotspotController {
  public constructor(private hotspotService: HotspotService) {}

  @Get("/")
  public async getAll(): Promise<Hotspot[]> {
    return this.hotspotService.findAll();
  }
  
  @ApiResponse({
    type: CreateHotspotRequestDto,
  })
  @Post("/")
  public async createHotspot(@Body() body: CreateHotspotRequestDto): Promise<Hotspot> {
    try {
      let newHotspot = Hotspot.fromRequestDto(body);
      let result = await this.hotspotService.save(newHotspot);
      return result;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
