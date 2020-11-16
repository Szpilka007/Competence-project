import { ApiProperty } from "@nestjs/swagger";
import { SinglePersonResponseDto } from "./single-person-response.dto";

export class FindPersonsResponseDto {
  @ApiProperty()
  public readonly limit: number;

  @ApiProperty()
  public readonly offset: number;

  @ApiProperty()
  public readonly total: number;

  @ApiProperty({ type: SinglePersonResponseDto, isArray: true })
  public readonly data: SinglePersonResponseDto[];
}
