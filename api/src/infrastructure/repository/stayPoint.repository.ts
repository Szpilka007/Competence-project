import { Repository, EntityRepository } from "typeorm";
import { StayPointEntity } from "../entity/stayPoint.entity";

@EntityRepository(StayPointEntity)
export class StayPointRepository extends Repository<StayPointEntity> {}