import { Module } from "@nestjs/common";
import { BalancerGraphqlClientService } from "./balancer-graphql-client/balancer-graphql-client.service";
import { GetPoolsCommand } from "./commands/get-pools-command/get-pools-command";
import { LogService } from "src/common/log.service";

@Module({
  providers: [BalancerGraphqlClientService, GetPoolsCommand, LogService],
  // exports: [GetPoolsCommand],
})
export class BalancerModule {}
