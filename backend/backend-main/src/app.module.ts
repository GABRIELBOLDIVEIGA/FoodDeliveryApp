import { ProductModule } from './modules/product/product.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from './modules/category/category.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { SideDishModule } from './modules/sideDish/sideDish.module';
import { OrderModule } from './modules/order/order.module';
import { CacheModule } from '@nestjs/cache-manager';
import { UserModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_JWT,
      signOptions: {
        expiresIn: '6000s',
      },
    }),
    MongooseModule.forRoot(process.env.DATA_BASE_MONGODB),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    SideDishModule,
    OrderModule,
    CacheModule.register({
      isGlobal: true,
      ttl: 5000,
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
