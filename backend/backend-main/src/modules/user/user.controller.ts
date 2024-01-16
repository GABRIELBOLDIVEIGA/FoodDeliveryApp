import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
  Query,
  UseInterceptors,
  UseGuards,
  Req,
  UnauthorizedException,
  UseFilters,
  NotFoundException,
} from '@nestjs/common';
import { UserDto } from './dto/UserDto';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { PasswordHashGenerator } from 'src/resources/pipes/password-hash-generator.pipe';
import { IsAdminGuard } from 'src/resources/guards/IsAdminGuard.guard';
import { AuthGuard, RequestWhitUser } from '../auth/auth.guard';
import { HttpExceptionFilter } from 'src/common/http-exception.filter';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@UseFilters(new HttpExceptionFilter())
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(IsAdminGuard)
  @UseInterceptors(CacheInterceptor)
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiQuery({ name: 'filter', type: 'string', required: false })
  async getAll(@Query() query: ExpressQuery): Promise<UserDto[]> {
    return this.userService.getAll(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  async getById(@Param('id') id: string): Promise<UserDto> {
    const user = await this.userService.getById(id);
    if (!user) {
      throw new NotFoundException('Usuario não encontrado.');
    }
    return user;
  }

  // @Get('/user/query')
  // @ApiQuery({ name: 'limit', type: 'number', required: false })
  // @ApiQuery({ name: 'page', type: 'number', required: false })
  // @ApiQuery({ name: 'filter', type: 'string', required: false })
  // async getQuery(@Query() query: ExpressQuery): Promise<UserDto[]> {
  //   return this.userService.getQuery(query);
  // }

  @Post()
  async create(
    @Body() User: UserDto,
    @Body('password', PasswordHashGenerator) passwordHash: string,
  ): Promise<UserDto> {
    User.password = passwordHash;
    User.role = 'user';
    return this.userService.create(User);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  async update(
    @Req() req: RequestWhitUser,
    @Param('id') id: string,
    @Body() User: UserDto,
  ): Promise<UserDto> {
    if (id != req.user.userId)
      throw new UnauthorizedException(
        'Usuário so pode editar o proprio perfil!',
      );

    return await this.userService.update(id, User);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  async delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
