import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SideDishController } from './sideDish.controller';
import { SideDishService } from './sideDish.service';
import { CategorySchema } from '../category/dto/CategoryDto';
import { SideDishSchema } from './dto/SideDishDto';

@Module({
  imports: [
    SideDishModule,
    MongooseModule.forFeature([
      { name: 'SideDish', schema: SideDishSchema },
      { name: 'Category', schema: CategorySchema },
    ]),
  ],
  controllers: [SideDishController],
  providers: [SideDishService],
})
export class SideDishModule {}
