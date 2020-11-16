import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class FindPersonsRequestDto {
  @ApiProperty()
  @IsArray()
  @IsOptional()
  public readonly ids: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  public readonly firstNames: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  public readonly lastNames: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  public readonly phoneNumbers: string[];

  @ApiProperty()
  @IsArray()
  @IsOptional()
  public readonly profiles: string[];

  @ApiProperty()
  @IsInt()
  @Transform((value) => Number(value))
  public readonly offset: number;

  @ApiProperty()
  @IsInt()
  @Transform((value) => Number(value))
  public readonly limit: number;
}
