import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Queue } from 'bull';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global pipes
  app.useGlobalPipes(new ValidationPipe());

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Payroll API')
    .setDescription('The payroll management API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Bull Board setup
  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/admin/queues');

  const payrollQueue = app.get<Queue>(`BullQueue_payroll`);
  
  createBullBoard({
    queues: [new BullAdapter(payrollQueue)],
    serverAdapter,
  });

  app.use('/admin/queues', serverAdapter.getRouter());

  await app.listen(process.env.PORT || 3001);
}
bootstrap(); 