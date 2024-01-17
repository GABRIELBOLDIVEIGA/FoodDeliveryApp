import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { AuthModule } from './modules/auth/auth.module';
import { SideDishModule } from './modules/sideDish/sideDish.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
    }),
  );

  // Swagger
  const options = new DocumentBuilder()
    .setTitle('Delivery-BGH - API Rest')
    .setDescription(
      'Backend desenvolvido em NestJS com Mongoose, TypeScript e MongoDB',
    )
    .setVersion('1.0.1')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'Header',
      },
      'JWT-auth',
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/', app, document);

  /*
   * User
   */
  const optUser = new DocumentBuilder()
    .setTitle('User')
    .setDescription('User Model')
    .setVersion('1.0')
    .addTag('User')
    .build();

  const docUser = SwaggerModule.createDocument(app, optUser, {
    include: [UserModule],
  });

  SwaggerModule.setup('api/user', app, docUser);

  /*
   * Product
   */
  const optProduct = new DocumentBuilder()
    .setTitle('Product')
    .setDescription('Product Model')
    .setVersion('1.0')
    .addTag('Product')
    .build();

  const docProduct = SwaggerModule.createDocument(app, optProduct, {
    include: [ProductModule],
  });

  SwaggerModule.setup('api/product', app, docProduct);

  /*
   * Category
   */
  const optCategory = new DocumentBuilder()
    .setTitle('Category')
    .setDescription('Category Model')
    .setVersion('1.0')
    .addTag('Category')
    .build();

  const docCategory = SwaggerModule.createDocument(app, optCategory, {
    include: [CategoryModule],
  });

  SwaggerModule.setup('api/category', app, docCategory);

  /*
   * Auth
   */
  const optAuth = new DocumentBuilder()
    .setTitle('Auth')
    .setDescription('Auth Model')
    .setVersion('1.0')
    .addTag('Auth')
    .build();

  const docAuth = SwaggerModule.createDocument(app, optAuth, {
    include: [AuthModule],
  });

  SwaggerModule.setup('api/auth', app, docAuth);

  /*
   * SideDish
   */
  const optSideDish = new DocumentBuilder()
    .setTitle('SideDish')
    .setDescription('SideDish Model')
    .setVersion('1.0')
    .addTag('SideDish')
    .build();

  const docSideDish = SwaggerModule.createDocument(app, optSideDish, {
    include: [SideDishModule],
  });

  SwaggerModule.setup('api/sideDish', app, docSideDish);

  /*
   * Order
   */
  const optOrder = new DocumentBuilder()
    .setTitle('Order')
    .setDescription('Order Model')
    .setVersion('1.0')
    .addTag('Order')
    .build();

  const docOrder = SwaggerModule.createDocument(app, optOrder, {
    include: [OrderModule],
  });

  SwaggerModule.setup('api/sideDish', app, docOrder);

  /*
   * Initialization Port 3000
   */
  app.enableCors({
    allowedHeaders: ['Content-Type', 'Origin', 'Authorization'],
    origin: ['*', 'http://localhost:5173'],
    credentials: true,
  });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(process.env.PORT || 3030);

  console.clear();
  console.log(`Base Url: http://localhost:${process.env.PORT}`);
  console.log(`Swagger: http://localhost:${process.env.PORT}/api/`);
}
bootstrap();
