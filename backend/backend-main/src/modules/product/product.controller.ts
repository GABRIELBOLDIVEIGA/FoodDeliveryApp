import { ProductService } from './product.service';
import {
  Controller,
  Get,
  Param,
  Body,
  Patch,
  Post,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { ProductDto } from './dto/ProductDto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AuthGuard } from '../auth/auth.guard';
import { IsAdminGuard } from 'src/resources/guards/IsAdminGuard.guard';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

@ApiTags('Product')
@ApiBearerAuth('JWT-auth')
@UseGuards(AuthGuard)
@UseFilters(new HttpExceptionFilter())
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'filter', type: 'string', required: false })
  async getAll(@Query() query: ExpressQuery): Promise<ProductDto[]> {
    return this.productService.getAll(query);
  }

  @Get(':id')
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<ProductDto> {
    const product = await this.productService.getById(id);
    if (!product) {
      throw new NotFoundException('Produto não encontrado.');
    }
    return product;
  }

  @Get('/productsByCategory/:id')
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  async getProductsByCategory(
    @Param('id') id: string,
    @Query() query: ExpressQuery,
  ): Promise<ProductDto[]> {
    return this.productService.productsByCategory(id, query);
  }

  @Post()
  @UseGuards(IsAdminGuard)
  async create(@Body() product: ProductDto): Promise<ProductDto> {
    return this.productService.create(product);
  }

  @Post('upload-image/:id')
  @UseGuards(IsAdminGuard)
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
    const result = await this.productService.uploadProductImage(id, file);
    return result;
  }

  @Put(':id')
  @UseGuards(IsAdminGuard)
  async put(
    @Param('id') id: string,
    @Body() product: ProductDto,
  ): Promise<ProductDto> {
    return this.productService.put(id, product);
  }

  @ApiBody({
    schema: {
      type: 'object',
      default: {
        name: 'Nome do produto',
        price: 0.98,
        description: 'Descrição do produto',
        promotionalPrice: 0.42,
        category: 'ID da Categoria do Porduto',
        sideDish: ['ID do acompanhameto'],
        img: 'string',
        avaliable: true,
        activePromotion: false,
      },
    },
  })
  @Patch(':id')
  @UseGuards(IsAdminGuard)
  async patch(
    @Param('id') id: string,
    @Body() product: Partial<ProductDto>,
  ): Promise<ProductDto> {
    return this.productService.patch(id, product);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  async delete(@Param('id') id: string) {
    this.productService.delete(id);
  }
}
