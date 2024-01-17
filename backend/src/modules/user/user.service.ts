import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument, UserDto } from './dto/UserDto';
import * as bcryptjs from 'bcryptjs';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Role } from 'src/resources/enums/role.enum';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDto>,
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

    return await this.userModel
      .find({ ...filter })
      .limit(limit)
      .skip(skip)
      .exec();

    // return await this.userModel.find().exec();
  }

  // async getQuery(query: ExpressQuery) {
  //   const limit = +query.limit || 5;
  //   const page = +query.page || 1;
  //   const skip = (page - 1) * limit;

  //   const filter = query.filter
  //     ? {
  //         name: {
  //           $regex: query.filter,
  //           $options: 'i',
  //         },
  //       }
  //     : {};

  //   return await this.userModel
  //     .find({ ...filter })
  //     .limit(limit)
  //     .skip(skip)
  //     .exec();
  // }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async create(user: UserDto) {
    const createUser = new this.userModel({ ...user, role: Role.User });
    // const createUser = new this.userModel({
    //   ...user,
    //   password: await bcryptjs.hash(user.password, 12),
    // });

    return await createUser.save();
  }

  async update(id: string, user: UserDto) {
    if (
      id === '652b1ac4a51c09b529b756ce' ||
      id === '653aafbadcfd2f6eeec97df2'
    ) {
      throw new UnauthorizedException('Apenas DEV pode editar este usuário');
    } else {
      const oldUser = await this.userModel.findById(id).exec();
      const password = oldUser.password;

      if (user.password) {
        user.password = await bcryptjs.hash(user.password, 12);
      } else {
        user.password = password;
      }

      await this.userModel.updateOne({ _id: id }, user).exec();
      return this.getById(id);
    }
  }

  async delete(id: string) {
    if (
      id === '652b1ac4a51c09b529b756ce' ||
      id === '653aafbadcfd2f6eeec97df2'
    ) {
      throw new UnauthorizedException('Apenas DEV pode apagar este usuário');
    } else {
      return await this.userModel.deleteOne({ _id: id }).exec();
    }
  }

  async login(email: string): Promise<UserDocument | undefined> {
    return await this.userModel.findOne({ email: email }).exec();
  }
}
