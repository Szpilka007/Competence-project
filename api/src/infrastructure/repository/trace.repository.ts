import { Repository, EntityRepository } from "typeorm";
import { TraceEntity } from "../entity/trace.entity";

@EntityRepository(TraceEntity)
export class TraceRepository extends Repository<TraceEntity> {
  public async findPaginated(payload: {
    limit: number;
    offset: number;
    ids?: string[];
    personIds?: string[];
    hotspotIds?: string[];
  }): Promise<{ total: number; offset: number; limit: number; data: TraceEntity[] }> {
    const { limit, offset, ids, personIds, hotspotIds } = payload;

    let query = await this.createQueryBuilder("t").select();

    if (ids.length) {
      query = query.andWhere("t.id IN (:...ids)", { ids });
    }

    if (personIds.length) {
      query = query.andWhere("t.personId IN (:...personIds)", { personIds });
    }

    if (hotspotIds.length) {
      query = query.andWhere("t.hotspotId IN (:...hotspotIds)", { hotspotIds });
    }

    const total = await query.clone().getCount();

    const data = await query.skip(offset).take(limit).getMany();

    return {
      total,
      data,
      offset,
      limit,
    };
  }
}
