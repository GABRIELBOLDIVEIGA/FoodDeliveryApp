import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SideDishDto } from './dto/SideDishDto';
import { Model } from 'mongoose';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class SideDishService {
  constructor(
    @InjectModel('SideDish') private readonly sideDishModel: Model<SideDishDto>,
  ) {}

  async getAll(query: ExpressQuery) {
    const limit = +query.limit || 10;
    const page = +query.page || 1;
    const skip = (page - 1) * limit;

    const filter = query.filter
      ? {
          name: {
            $regex: query.filter,
            $options: 'i',
          },
        }
      : {};

    return await this.sideDishModel
      .find({ ...filter })
      .limit(limit)
      .skip(skip)
      .exec();
  }

  async getById(id: string) {
    return await this.sideDishModel.findById(id).exec();
  }

  async create(sideDish: SideDishDto) {
    const createSideDish = new this.sideDishModel(sideDish);

    const newSideDish = await createSideDish.save();
    if (newSideDish) {
      return await this.getById(newSideDish._id.toString());
    }
  }

  async update(id: string, sideDish: SideDishDto) {
    await this.sideDishModel.updateOne({ _id: id }, sideDish).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    return await this.sideDishModel.deleteOne({ _id: id }).exec();
  }
}
