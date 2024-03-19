import { Module } from '@nestjs/common';
import { CheckOutService } from './check-out.service';
import { CheckOutController } from './check-out.controller';

@Module({
  controllers: [CheckOutController],
  providers: [CheckOutService],
})
export class CheckOutModule {}
