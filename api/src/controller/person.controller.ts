import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { PersonService } from "../application/person.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { SuccessResponseDto } from "../dto/response/shared/success-response.dto";
import { UpdatePersonRequestDto } from "../dto/request/person/update-person-request.dto";
import { FindPersonsResponseDto } from "../dto/response/person/find-persons-response.dto";
import { FindPersonsRequestDto } from "../dto/request/person/find-persons-request.dto";
import { SinglePersonResponseDto } from "../dto/response/person/single-person-response.dto";
import { CreatePersonRequestDto } from "../dto/request/person/create-person-request.dto";
import { CreatePersonResponseDto } from "../dto/response/person/create-person-response.dto";

@ApiTags("Person")
@Controller("persons")
export class PersonController {
  public constructor(private personService: PersonService) {}

  @ApiResponse({
    type: CreatePersonResponseDto,
  })
  @Post("/")
  public async createPatient(@Body() body: CreatePersonRequestDto): Promise<CreatePersonResponseDto> {
    try {
      const result = await this.personService.createPerson(body);
      return { id: result.id };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({
    type: SuccessResponseDto,
  })
  @Patch("/:id")
  public async updatePerson(
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

  @ApiResponse({
    type: SinglePersonResponseDto,
  })
  @Get("/:id")
  public async getPatientProfile(@Param("id") id: string): Promise<SinglePersonResponseDto> {
    try {
      const patient = await this.personService.getPerson(id);

      if (!patient) {
        throw new NotFoundException();
      }

      return patient;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({
    type: FindPersonsResponseDto,
  })
  @Get("/")
  public async getPersons(@Query() query: FindPersonsRequestDto): Promise<FindPersonsResponseDto> {
    try {
      return await this.personService.findPersons(query);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete("/:id")
  public async removePerson(@Param("id") id: string): Promise<SuccessResponseDto> {
    try {
      await this.personService.removePerson(id);
      return { success: true };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
