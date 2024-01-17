import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderDto } from './dto/OrderDto';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDto>,
  ) {}

  async getAll(): Promise<OrderDto[]> {
    return this.orderModel.find().populate({ path: 'user' }).exec();
  }

  async getUserOrders(userId: string): Promise<OrderDto[]> {
    return this.orderModel.find({ user: userId }).exec();
  }

  async getById(id: string): Promise<OrderDto> {
    return this.orderModel.findById(id).populate({ path: 'user' }).exec();
  }

  async create(order: OrderDto): Promise<OrderDto> {
    const newOrder = await this.orderModel.create(order);
    return newOrder.save();
  }

  async update(id: string, order: OrderDto): Promise<OrderDto> {
    await this.orderModel.updateOne({ _id: id }, order);
    return this.getById(id);
  }

  async delete(id: string): Promise<string> {
    const response = await this.orderModel.deleteOne({ _id: id }).exec();

    if (response.deletedCount === 1) {
      return 'Pedido deletado com sucesso!';
    } else {
      throw new NotFoundException('Erro ao deletar Pedido.');
    }
  }
}
