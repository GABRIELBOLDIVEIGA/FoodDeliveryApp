import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SideDishService } from './sideDish.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { SideDishDto } from './dto/sideDishDto';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';
import { IsAdminGuard } from 'src/resources/guards/IsAdminGuard.guard';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-bilder';
import { Query as ExpressQuery } from 'express-serve-static-core';

@ApiTags('Side Dish')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('sideDish')
export class SideDishController {
  constructor(private sideDishService: SideDishService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'filter', type: 'string', required: false })
  async getAll(@Query() query: ExpressQuery): Promise<SideDishDto[]> {
    return this.sideDishService.getAll(query);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<SideDishDto> {
    const sideDish = await this.sideDishService.getById(id);
    if (!sideDish) {
      throw new NotFoundException('Acompanhamento não encontrado.');
    }
    return sideDish;
  }

  @Post()
  @UseGuards(IsAdminGuard)
  async create(@Body() sideDish: SideDishDto): Promise<NestResponse> {
    // : Promise<SideDishDto>

    console.log('[sideDish] - ', sideDish);
    const newSideDish = await this.sideDishService.create(sideDish);
    return new NestResponseBuilder()
      .status(HttpStatus.CREATED)
      .headers({
        Location: `/sideDish/${newSideDish._id}`,
      })
      .body(newSideDish)
      .build();
  }

  @Put(':id')
  @UseGuards(IsAdminGuard)
  async update(
    @Param('id') id: string,
    @Body() sideDish: SideDishDto,
  ): Promise<SideDishDto> {
    return this.sideDishService.update(id, sideDish);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  async delete(@Param('id') id: string) {
    this.sideDishService.delete(id);
  }
}
