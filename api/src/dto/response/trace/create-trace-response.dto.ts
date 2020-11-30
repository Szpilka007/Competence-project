import { ApiProperty } from "@nestjs/swagger";

export class CreateTraceResponseDto {
  @ApiProperty()
  public readonly id: string;
}
