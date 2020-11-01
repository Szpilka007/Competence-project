import { ApiProperty } from "@nestjs/swagger";

export class SuccessResponseDto {
  @ApiProperty()
  public success: boolean;
}
