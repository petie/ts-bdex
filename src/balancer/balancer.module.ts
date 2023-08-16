import { Module } from "@nestjs/common";
import { BalancerGraphqlClientService } from "./balancer-graphql-client/balancer-graphql-client.service";
import { LogService } from "src/common/log.service";
import { BalancerArbitrumGraphqlServiceService } from "./balancer-arbitrum-graphql-service/balancer-arbitrum-graphql-service.service";
import { GetTokensCommand } from "./commands/get-tokens-command/get-tokens-command";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Token } from "./entities/token.entity";
import { Chain } from "./entities/chain.entity";
import { PoolToken } from "./entities/pool-token.entity";
import { TokenPrice } from "./entities/token-price.entity";
import { Pool } from "./entities/pool.entity";
import { BalancerWeb3Service } from "./balancer-web3/balancer-web3.service";
import { PriceService } from "./price-service/price.service";
import { PathFinderService } from './path-finder/path-finder.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chain, Token, PoolToken, TokenPrice, Pool]),
  ],
  providers: [
    BalancerGraphqlClientService,
    GetTokensCommand,
    LogService,
    BalancerArbitrumGraphqlServiceService,
    BalancerWeb3Service,
    PriceService,
    PathFinderService,
  ],
  // exports: [GetPoolsCommand],
})
export class BalancerModule {}
