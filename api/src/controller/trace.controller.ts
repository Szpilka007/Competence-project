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
import { TraceService } from "../application/trace.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { SuccessResponseDto } from "../dto/response/shared/success-response.dto";
import { FindTracesResponseDto } from "../dto/response/trace/find-traces-response.dto";
import { FindTracesRequestDto } from "../dto/request/trace/find-traces-request.dto";
import { SingleTraceResponseDto } from "../dto/response/trace/single-trace-response.dto";
import { CreateTraceRequestDto } from "../dto/request/trace/create-trace-request.dto";
import { CreateTraceResponseDto } from "../dto/response/trace/create-trace-response.dto";

@ApiTags("Trace")
@Controller("traces")
export class TraceController {
  public constructor(private traceService: TraceService) {}

  @ApiResponse({
    type: CreateTraceResponseDto,
  })
  @Post("/")
  public async createTrace(@Body() body: CreateTraceRequestDto): Promise<CreateTraceResponseDto> {
    try {
      const result = await this.traceService.createTrace(body);
      return { id: result.id };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({
    type: SingleTraceResponseDto,
  })
  @Get("/:id")
  public async getTrace(@Param("id") id: string): Promise<SingleTraceResponseDto> {
    try {
      const patient = await this.traceService.getTrace(id);

      if (!patient) {
        throw new NotFoundException();
      }

      return patient;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @ApiResponse({
    type: FindTracesResponseDto,
  })
  @Get("/")
  public async findTraces(@Query() query: FindTracesRequestDto): Promise<FindTracesResponseDto> {
    try {
      return await this.traceService.findTraces(query);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete("/:id")
  public async removeTrace(@Param("id") id: string): Promise<SuccessResponseDto> {
    try {
      await this.traceService.removeTrace(id);
      return { success: true };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
