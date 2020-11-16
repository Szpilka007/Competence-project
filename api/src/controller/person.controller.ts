import { Body, Controller, HttpException, HttpStatus, Logger, Param, Patch } from "@nestjs/common";
import { PersonService } from "../application/person.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { SuccessResponseDto } from "../dto/response/shared/success-response.dto";
import { UpdatePersonRequestDto } from "../dto/request/person/update-person-request.dto";

@ApiTags("Person")
@Controller("persons")
export class PersonController {
  private readonly logger: Logger = new Logger(PersonController.name);

  public constructor(private personService: PersonService) {}

  @ApiResponse({
    type: SuccessResponseDto,
  })
  @Patch("/:id")
  public async updateCompany(
    @Param("id") id: string,
    @Body() body: UpdatePersonRequestDto
  ): Promise<SuccessResponseDto> {
    try {
      await this.personService.updatePerson({ id, ...body });

      return { success: true };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
