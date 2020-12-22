import { Injectable, Logger } from "@nestjs/common";
import { v4 as uuid } from "uuid";
import { LongestRouteRepository } from "../infrastructure/repository/longestRoute.repository";
import { LongestRoute } from "../domain/longestRoute/longestRoute";
import { LongestRouteEntity } from "../infrastructure/entity/longestRoute.entity";

@Injectable()
export class LongestRouteService {
  public constructor(private readonly longestRouteRepository: LongestRouteRepository) {}
  private logger: Logger = new Logger(LongestRouteService.name);

  public async createRotue(payload: { personId: string; routeLength: Number }): Promise<{ id: string }> {
    this.logger.debug(`createLongestRoute ${JSON.stringify(payload)}`);
    const { personId, routeLength } = payload;

    const longestRoute = new LongestRoute(uuid(), personId, routeLength);

    await this.longestRouteRepository.save(LongestRouteEntity.fromDomainObject(longestRoute));

    return { id: longestRoute.id };
  }

  public async getLongestRoutes(): Promise<LongestRouteEntity[]> {
    return this.longestRouteRepository.find();
  }
}
