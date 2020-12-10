import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { StayPointRepository } from "../infrastructure/repository/stayPoint.repository"
import { StayPoint } from "../domain/stayPoint/stayPoint";
import { StayPointEntity } from "../infrastructure/entity/stayPoint.entity";

 @Injectable()
export class StayPointService {

  public constructor(private readonly stayPointRepository: StayPointRepository) { }
  private logger: Logger = new Logger(StayPointService.name);

   public async createStayPoint(payload: {
    personId: string;
    hotspotId: string;
    entryTime: Date;
    lengthOfStay: Number;
  }): Promise<{ id: string }> {
    this.logger.debug(`createStayPoint ${JSON.stringify(payload)}`);
    const { personId, hotspotId, entryTime, lengthOfStay } = payload;

     const stayPoint = new StayPoint(uuid(), personId, hotspotId, entryTime, lengthOfStay);

     await this.stayPointRepository.save(StayPointEntity.fromDomainObject(stayPoint));

     return { id: stayPoint.id };
  }

  public async getStayPoints(): Promise<StayPointEntity[]> {

  return this.stayPointRepository.find();

  }
}