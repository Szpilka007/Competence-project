import { Repository, EntityRepository } from "typeorm";
import { PhoneLookUpEntity } from "../entity/phoneLookUp.entity";

@EntityRepository(PhoneLookUpEntity)
export class PhoneLookUpRepository extends Repository<PhoneLookUpEntity> {
  public async findPaginated(payload: {
    limit: number;
    offset: number;
    ids?: string[];
    fakeNumbers?: string[];
    realNumbers?: string[];
  }): Promise<{ total: number; offset: number; limit: number; data: PhoneLookUpEntity[] }> {
    const { limit, offset, ids, fakeNumbers, realNumbers } = payload;

    let query = await this.createQueryBuilder("p").select();

    if (ids.length) {
      query = query.andWhere("p.id IN (:...ids)", { ids });
    }

    if (fakeNumbers.length) {
      query = query.andWhere("p.fakeNumber IN (:...fakeNumbers)", { fakeNumbers });
    }

    if (realNumbers.length) {
      query = query.andWhere("p.realNumber IN (:...realNumbers)", { realNumbers });
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
