import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseInterceptors,
  UseGuards,
  Req,
  UnauthorizedException,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { OrderDto } from './dto/OrderDto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { IsAdminGuard } from 'src/resources/guards/IsAdminGuard.guard';
import { AuthGuard, RequestWhitUser } from '../auth/auth.guard';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

@ApiTags('Order')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  @UseGuards(IsAdminGuard)
  @UseInterceptors(CacheInterceptor)
  async getAll(): Promise<OrderDto[]> {
    return this.orderService.getAll();
  }

  @Get('/userOrders/:id')
  @UseInterceptors(CacheInterceptor)
  async getUserOrders(@Param('id') id: string): Promise<OrderDto[]> {
    return this.orderService.getUserOrders(id);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<OrderDto> {
    const order = await this.orderService.getById(id);
    if (!order) {
      throw new NotFoundException('Pedido não encontrado.');
    }
    return order;
  }

  @Post()
  async create(
    @Req() req: RequestWhitUser,
    @Body() order: OrderDto,
  ): Promise<OrderDto> {
    if (`${order.user}` !== req.user.userId)
      throw new UnauthorizedException(
        'Usuário não tem permissão para gerar pedidos em nome de terceiros!',
      );
    return this.orderService.create(order);
  }

  @Put(':id')
  @UseGuards(IsAdminGuard)
  async update(
    @Param('id') id: string,
    @Body() order: OrderDto,
  ): Promise<OrderDto> {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  async delete(@Param('id') id: string) {
    return this.orderService.delete(id);
  }
}
