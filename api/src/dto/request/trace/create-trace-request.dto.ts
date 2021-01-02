import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreateTraceRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly personId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly hotspotId: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly entryTime: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly exitTime: Date;
}
