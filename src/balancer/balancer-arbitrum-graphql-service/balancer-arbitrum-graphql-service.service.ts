import { ApolloClient, InMemoryCache, gql } from "@apollo/client/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Token } from "../entities/token.entity";
import { LogService } from "src/common/log.service";
import { Repository } from "typeorm";
import { Chain } from "../entities/chain.entity";
import { uniqBy, flatten } from "lodash";
import { poolsQuery } from "./queries";
import { TokenPrice } from "../entities/token-price.entity";
import { PoolToken } from "../entities/pool-token.entity";
import { Pool } from "../entities/pool.entity";

@Injectable()
export class BalancerArbitrumGraphqlServiceService {
  client = new ApolloClient({
    uri: process.env.BALANCER_ARBITRUM_SUBGRAPH_URL,
    cache: new InMemoryCache(),
  });
  chain: Chain;
  constructor(
    private readonly logger: LogService,
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
    @InjectRepository(Chain) private readonly chainRepo: Repository<Chain>,
    @InjectRepository(TokenPrice)
    private readonly tokenPriceRepo: Repository<TokenPrice>,
    @InjectRepository(PoolToken)
    private readonly poolTokenRepo: Repository<PoolToken>,
    @InjectRepository(Pool) private readonly poolRepo: Repository<Pool>,
  ) {}

  public async getPools() {
    await this.init();
    const result = await this.client.query({ query: poolsQuery });
    const pools = await this.filterPools(result.data);
    const tokens = [];
    tokens.push(...pools.map((p) => p.tokens));
    await this.processTokens(tokens);
    await this.processPools(pools);
  }

  public async filterPools(data: any) {
    const pools = [...data.pool0, ...data.pool1000, ...data.pool2000].filter(
      (p) =>
        !p.isPaused &&
        !p.isInRecoveryMode &&
        p.swapEnabled &&
        parseFloat(p.totalLiquidity) > 1000,
    );
    return pools;
  }
  async processTokens(tokens: any[]) {
    const uniques = uniqBy<any>(flatten(tokens), "address");
    await Promise.all(
      await uniques.map(async (token) => {
        this.logger.log(`Processing token ${token.address} ${token.symbol}`);
        await this.tokenRepo.upsert(
          {
            address: token.address,
            symbol: token.symbol,
            chain: this.chain,
            decimals: token.decimals,
            name: token.name,
          },
          ["address"],
        );
      }),
    );
    await this.processTokenPrices(uniques);
  }
  async processTokenPrices(uniques: any[]) {
    this.logger.log(`Processing token prices`);
    await Promise.all(
      await uniques.map(async (token) => {
        if (token.token.latestUSDPrice && token.token.latestUSDPrice !== null) {
          const t = await this.tokenRepo.findOne({
            where: { address: token.address },
          });
          if (t != null) {
            this.logger.log(`Processing token price ${t.symbol}`);
            await this.tokenPriceRepo.upsert(
              {
                token: t,
                timestamp: new Date(),
                usdPrice: token.token.latestUSDPrice,
                tokenId: t.address,
              },
              ["tokenId"],
            );
          }
        }
      }),
    );
  }

  async processPools(poolCollection: any) {
    await Promise.all(
      await poolCollection.map(async (pool) => {
        this.logger.log(`Processing pool ${pool.address} ${pool.name}`);
        let recoveryMode = pool.isInRecoveryMode ?? false;
        if (recoveryMode === null) recoveryMode = false;
        if (!recoveryMode) {
          await this.poolRepo.upsert(
            {
              address: pool.address,
              symbol: pool.symbol,
              type: pool.poolType,
              swapEnabled: pool.swapEnabled,
              swapFee: pool.swapFee,
              totalLiquidity: pool.totalLiquidity,
              swapsCount: pool.swapsCount ?? "0",
              name: pool.name,
              isInRecoveryMode: recoveryMode,
              poolType: pool.poolType,
            } as Pool,
            ["address"],
          );
          this.logger.log(`Saved pool ${pool.symbol}`);
        }
      }),
    );
    await this.createPoolTokens(poolCollection);
  }
  async createPoolTokens(poolCollection: any[]) {
    await poolCollection.reduce(async (memo, pool) => {
      const p = await this.poolRepo.findOne({
        where: { address: pool.address },
      });
      if (p != null) {
        this.logger.log(`Processing pool tokens ${p.symbol}`);
        pool.tokens.forEach(async (token) => {
          const existing = await this.tokenRepo.findOne({
            where: { address: token.address },
          });
          if (existing != null) {
            await this.poolTokenRepo.upsert(
              {
                token: existing,
                tokenId: existing.address,
                balance: token.balance,
                pool: p,
                poolId: p.address,
              },
              ["poolId", "tokenId"],
            );
            this.logger.log(`Saved pool token ${token.symbol}`);
          }
        });
      }
    }, undefined);
  }

  public async getTokens() {
    await this.init();
    const query = gql`
      query {
        poolTokens {
          address
          symbol
          decimals
        }
      }
    `;
    const result = await this.client.query({ query });
    const uniques = uniqBy<any>(result.data.poolTokens, "address");
    this.logger.log(`Found ${uniques.length} unique tokens`);
    await uniques.reduce(async (memo, token) => {
      await memo;
      const existing = await this.tokenRepo.exist({
        where: { address: token.address },
      });
      if (!existing) {
        await this.tokenRepo.upsert(
          {
            address: token.address,
            symbol: token.symbol,
            chain: this.chain,
            decimals: token.decimals,
            name: token.name,
          },
          ["address"],
        );
        this.logger.log(`Saved token ${token.symbol}`);
      }
    }, undefined);
  }

  async init() {
    this.chain = await this.chainRepo.findOne({
      where: { name: "Arbitrum" },
    });
    return Promise.resolve();
  }
}
