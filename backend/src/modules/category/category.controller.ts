import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { CategoryDto } from './dto/CategoryDto';
import { CategoryService } from './category.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';
import { IsAdminGuard } from 'src/resources/guards/IsAdminGuard.guard';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

@ApiTags('Category')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'filter', type: 'string', required: false })
  async getAll(@Query() query: ExpressQuery): Promise<CategoryDto[]> {
    return this.categoryService.getAll(query);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<CategoryDto> {
    const category = await this.categoryService.getById(id);
    if (!category) {
      throw new NotFoundException('Categoria não encontrado.');
    }
    return category;
  }

  @UseGuards(IsAdminGuard)
  @Post()
  async create(@Body() category: CategoryDto): Promise<CategoryDto> {
    return this.categoryService.create(category);
  }

  @UseGuards(IsAdminGuard)
  @Post('upload-image/:id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const result = await this.categoryService.uploadImage(id, file);
    return result;
  }

  @UseGuards(IsAdminGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() category: CategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.update(id, category);
  }

  @UseGuards(IsAdminGuard)
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    this.categoryService.delete(id);
  }
}
