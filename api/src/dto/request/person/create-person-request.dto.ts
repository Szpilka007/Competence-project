import { IsArray, IsInt, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";

export class CreatePersonRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly lastName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly profile: string;
}
