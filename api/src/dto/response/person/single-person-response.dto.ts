import { ApiProperty } from "@nestjs/swagger";

export class SinglePersonResponseDto {
  @ApiProperty()
  public readonly id: string;
  @ApiProperty()
  public readonly firstName: string;
  @ApiProperty()
  public readonly lastName: string;
  @ApiProperty()
  public readonly profile: string;
  @ApiProperty()
  public readonly phoneNumber: string;
  @ApiProperty()
  public readonly createdAt: Date;
  @ApiProperty()
  public readonly updatedAt: Date;
}
