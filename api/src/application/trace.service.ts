import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { TraceRepository } from "../infrastructure/repository/trace.repository";
import { Trace } from "../domain/trace/trace";
import { TraceEntity } from "../infrastructure/entity/trace.entity";

@Injectable()
export class TraceService {
  public constructor(private readonly traceRepository: TraceRepository) { }
  private logger: Logger = new Logger(TraceService.name);

  public async createTrace(payload: {
    personId: string;
    hotspotId: string;
    entryTime: Date;
    exitTime: Date;
  }): Promise<{ id: string }> {
    this.logger.debug(`createTrace ${JSON.stringify(payload)}`);
    const { personId, hotspotId, entryTime, exitTime } = payload;

    const trace = new Trace(uuid(), personId, hotspotId, entryTime, exitTime);

    await this.traceRepository.save(TraceEntity.fromDomainObject(trace));

    return { id: trace.id };
  }

  public async findTraces(payload: {
    limit: number;
    offset: number;
    ids?: string[];
    personIds?: string[];
    hotspotIds?: string[];
  }): Promise<{
    total: number;
    limit: number;
    offset: number;
    data: TraceEntity[];
  }> {
    this.logger.debug(`findTraces ${JSON.stringify(payload)}`);
    return this.traceRepository.findPaginated(payload);
  }

  public async getTrace(id: string): Promise<TraceEntity> {
    this.logger.debug(`getTrace ${JSON.stringify(id)}`);
    const traceEntity = await this.traceRepository.findOne(id);

    if (!traceEntity) {
      throw new Error(`Trace with given ID (${id}) doesn't exist`);
    }

    return await this.traceRepository.findOne({
      where: { id },
    });
  }

  public async removeTrace(id: string): Promise<void> {
    this.logger.debug(`removeTrace ${JSON.stringify(id)}`);
    const traceEntity = await this.traceRepository.findOne(id);
    if (!traceEntity) {
      throw new Error(`Trace with given ID (${id}) doesn't exist`);
    }

    await this.traceRepository.delete(id);
  }
}
