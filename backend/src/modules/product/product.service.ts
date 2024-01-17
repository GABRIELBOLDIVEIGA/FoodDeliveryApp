import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDto } from './dto/ProductDto';
import { createClient } from '@supabase/supabase-js';
import { Query as ExpressQuery } from 'express-serve-static-core';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<ProductDto>,
  ) {}

  async getAll(query: ExpressQuery) {
    const limit = +query.limit || 5;
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

    const products = await this.productModel
      .find({ ...filter })
      .populate({ path: 'category' })
      .limit(limit)
      .skip(skip)
      .exec();

    if (products) {
      products?.forEach((product) => {
        product.img = `${process.env.SUPABASE_PRODUCTS_URL}${product.img}`;
      });
    }
    return products;
  }

  async productsByCategory(id: string, query: ExpressQuery) {
    const limit = +query.limit || 5;
    const page = +query.page || 1;
    const skip = (page - 1) * limit;

    const products = await this.productModel
      .find({ category: id })
      .populate({ path: 'category' })
      .limit(limit)
      .skip(skip)
      .exec();

    if (products) {
      products?.forEach((product) => {
        product.img = `${process.env.SUPABASE_PRODUCTS_URL}${product.img}`;
      });
    }

    return products;
  }

  async getById(id: string) {
    const product = await this.productModel
      .findById(id)
      .populate([{ path: 'category' }, { path: 'sideDish' }])
      .exec();

    if (product) {
      product.img = `${process.env.SUPABASE_PRODUCTS_URL}${product.img}`;
    }

    return product;
  }

  async create(product: ProductDto) {
    const createProduct = new this.productModel(product);

    const newProduct = await createProduct.save();
    if (newProduct) {
      console.log('[New Product] - ', newProduct._id.toString());
    }
    return await this.getById(newProduct._id.toString());
  }

  async put(id: string, product: ProductDto) {
    await this.productModel.updateOne({ _id: id }, product).exec();
    return this.getById(id);
  }

  async patch(id: string, product: Partial<ProductDto>) {
    await this.productModel.updateOne({ _id: id }, product).exec();
    return this.getById(id);
  }

  async delete(id: string) {
    const supabaseURL = process.env.SUBABASE_PROJECT_URL;
    const supabaseKEY = process.env.SUBABASE_API_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const product = await this.productModel.findById(id).exec();

    if (product) {
      await supabase.storage.from('products').remove([`${product.img}`]);
      return await this.productModel.deleteOne({ _id: id }).exec();
    } else {
      return;
    }
  }

  async uploadProductImage(id: string, file: Express.Multer.File) {
    const supabaseURL = process.env.SUBABASE_PROJECT_URL;
    const supabaseKEY = process.env.SUBABASE_API_KEY;

    const supabase = createClient(supabaseURL, supabaseKEY, {
      auth: {
        persistSession: false,
      },
    });

    const fileExtension = file.originalname.split('.')[1];
    const fileName = `${id}.${fileExtension}`;

    const product = await this.getById(id);

    if (product === null) {
      throw new NotFoundException('Produto não encontrado.');
    }

    const response = await supabase.storage
      .from('products')
      .upload(fileName, file.buffer, { upsert: true });

    if (response.error === null) {
      await this.productModel
        .updateOne({ _id: id }, { img: `${fileName}` })
        .exec();
    }

    return response;
  }
}
