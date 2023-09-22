import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaController } from './prisma.controller';
@Global() //prisma service will be available to all other module in our apps
@Module({
  providers: [PrismaService],
  controllers: [PrismaController],
  exports: [PrismaService]
})
export class PrismaModule {}
