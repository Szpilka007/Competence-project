import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Hotspot } from "../infrastructure/entity/hotspot";

@Injectable()
export class HotspotService {
  constructor(
    @InjectRepository(Hotspot)
    private repository: Repository<Hotspot>,
  ) { }

  async findAll(): Promise<Hotspot[]> {
    return await this.repository.find();
  }

  async findOne(id: string): Promise<Hotspot> {
    return await this.repository.findOne(id);
  }

  async remove(id: string): Promise<string> {
    await this.repository.delete(id);
    return id;
  }

  async save(hotspot: Hotspot): Promise<Hotspot> {
    let result = await this.repository.save(hotspot);
    return result;
  }
}
