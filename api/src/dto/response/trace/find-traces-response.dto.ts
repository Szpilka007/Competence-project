import { ApiProperty } from "@nestjs/swagger";
import { SingleTraceResponseDto } from "./single-trace-response.dto";

export class FindTracesResponseDto {
  @ApiProperty()
  public readonly limit: number;

  @ApiProperty()
  public readonly offset: number;

  @ApiProperty()
  public readonly total: number;

  @ApiProperty({ type: SingleTraceResponseDto, isArray: true })
  public readonly data: SingleTraceResponseDto[];
}
