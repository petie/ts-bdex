import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { BalancerModule } from './balancer/balancer.module';

@Module({
  imports: [BalancerModule],
  providers: [AppService],
})
export class AppModule {}
