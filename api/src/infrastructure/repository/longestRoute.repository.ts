import { Repository, EntityRepository } from "typeorm";
import { LongestRouteEntity } from "../entity/longestRoute.entity";

@EntityRepository(LongestRouteEntity)
export class LongestRouteRepository extends Repository<LongestRouteEntity> {}
