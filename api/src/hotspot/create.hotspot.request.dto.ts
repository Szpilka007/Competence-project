import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateHotspotRequestDto {
  @ApiProperty()
  public name: string;
  
  @ApiProperty()
  public description: string;
  
  @ApiProperty()
  public longitude: number;
  
  @ApiProperty()
  public latitude: number;
  
  @ApiProperty()
  public type: string;
}
