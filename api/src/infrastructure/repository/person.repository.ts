import { Repository, EntityRepository } from "typeorm";
import { PersonEntity } from "../entity/person.entity";

@EntityRepository(PersonEntity)
export class PersonRepository extends Repository<PersonEntity> {
  public async findPaginated(payload: {
    limit: number;
    offset: number;
    ids?: string[];
    firstNames?: string[];
    lastNames?: string[];
    phoneNumbers?: string[];
    profiles?: string[];
  }): Promise<{ total: number; offset: number; limit: number; data: PersonEntity[] }> {
    const { limit, offset, ids, firstNames, lastNames, phoneNumbers, profiles } = payload;

    let query = await this.createQueryBuilder("p").select();

    if (ids.length) {
      query = query.andWhere("p.id IN (:...ids)", { ids });
    }

    if (firstNames.length) {
      query = query.andWhere("p.firstName IN (:...firstNames)", { firstNames });
    }
    if (ids.length) {
      query = query.andWhere("p.lastName IN (:...lastNames)", { lastNames });
    }
    if (phoneNumbers.length) {
      query = query.andWhere("p.phoneNumber IN (:...phoneNumbers)", { phoneNumbers });
    }
    if (ids.length) {
      query = query.andWhere("p.profile IN (:...profiles)", { profiles });
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
