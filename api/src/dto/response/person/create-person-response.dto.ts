import { ApiProperty } from "@nestjs/swagger";

export class CreatePersonResponseDto {
  @ApiProperty()
  public readonly id: string;
}
