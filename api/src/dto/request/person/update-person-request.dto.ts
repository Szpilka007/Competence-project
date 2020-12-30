import { IsBoolean, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdatePersonRequestDto {
  @ApiProperty()
  @IsString()
  public readonly firstName: string;

  @ApiProperty()
  @IsString()
  public readonly lastName: string;

  @ApiProperty()
  @IsString()
  public readonly profile: string;

  @ApiProperty()
  @IsString()
  public readonly phoneNumber: string;
}
