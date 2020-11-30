import { ApiProperty } from "@nestjs/swagger";

export class SingleTraceResponseDto {
  @ApiProperty()
  public readonly id: string;

  @ApiProperty()
  public readonly personId: string;

  @ApiProperty()
  public readonly hotspotId: string;

  @ApiProperty()
  public readonly entryTime: Date;

  @ApiProperty()
  public readonly exitTime: Date;
}
