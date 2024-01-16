import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CategoryDto } from './dto/CategoryDto';
import { Model } from 'mongoose';
import { createClient } from '@supabase/supabase-js';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<CategoryDto>,
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

    const categories = await this.categoryModel
      .find({ ...filter })
      .limit(limit)
      .skip(skip)
      .exec();

    categories?.forEach((category) => {
      category.img = `${process.env.SUPABASE_CATEGORY_URL}${category.img}`;
    });
    return categories;
  }

  async getById(id: string) {
    const category = await this.categoryModel.findById(id).exec();
    if (category) {
      category.img = `${process.env.SUPABASE_CATEGORY_URL}${category.img}`;
    }
    return category;
  }

  async create(category: CategoryDto) {
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }

  async update(id: string, category: CategoryDto) {
    await this.categoryModel.updateOne({ _id: id }, category).exec();
    return await this.categoryModel.findById(id).exec();
  }

  async delete(id: string) {
    const supabaseURL = process.env.SUBABASE_PROJECT_URL;
    const supabaseKEY = process.env.SUBABASE_API_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const category = await this.categoryModel.findById(id).exec();
    if (category) {
      await supabase.storage.from('category').remove([`${category.img}`]);
      return await this.categoryModel.deleteOne({ _id: id }).exec();
    } else {
      return;
    }
  }

  async uploadImage(id: string, file: Express.Multer.File) {
    const supabaseURL = process.env.SUBABASE_PROJECT_URL;
    const supabaseKEY = process.env.SUBABASE_API_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const fileExtension = file.originalname.split('.')[1];
    const fileName = `${id}.${fileExtension}`;

    const category = await this.getById(id);

    if (category === null) {
      throw new NotFoundException('Categoria não encontrado.');
    }

    const response = await supabase.storage
      .from('category')
      .upload(fileName, file.buffer, { upsert: true });

    if (response.error === null) {
      await this.categoryModel.updateOne({ _id: id }, { img: fileName }).exec();
    }

    return response;
  }
}
