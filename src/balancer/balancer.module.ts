import { Module } from '@nestjs/common';
import { BalancerGraphqlClientService } from './balancer-graphql-client/balancer-graphql-client.service';

@Module({
  providers: [BalancerGraphqlClientService]
})
export class BalancerModule {}
