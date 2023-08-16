import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pool } from "../entities/pool.entity";
import { PoolToken } from "../entities/pool-token.entity";
import { intersectionWith, isEqual } from "lodash";

@Injectable()
export class PathFinderService {
  USDC = "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8";
  constructor(
    @InjectRepository(Pool) private readonly poolRepo: Repository<Pool>,
    @InjectRepository(PoolToken)
    private readonly poolTokenRepo: Repository<PoolToken>,
  ) {}
  async findAll3StepPaths(): Promise<any> {
    // const poolToken = await this.poolTokenRepo.findOne({
    //   order: { balance: "DESC" },
    const result = await this.poolTokenRepo.query(`SELECT "poolId"
    FROM public.pool_token where "tokenId" = '${this.USDC}' and CAST(balance as DECIMAL) > 1000;`);
    const paths = [];

    result.forEach(async (poolId) => {
      // find other tokens in this pool
      const otherTokens = await this.poolTokenRepo.query(`SELECT "tokenId"
      FROM public.pool_token where "tokenId" NOT IN ('${this.USDC}') and "poolId" NOT IN ('${poolId}');`);

      // foreach of other tokens find pools that have this token and have USDC
      otherTokens.forEach(async (token) => {
        const otherPools = await this.poolTokenRepo.query(`SELECT "poolId"
        FROM public.pool_token where "tokenId" = '${token}' and CAST(balance as DECIMAL) > 1000;`);
        const presents = intersectionWith(result, otherPools, isEqual);
        paths.push([poolId]);
      });
    });
    // const pool = await this.poolRepo.findOne({
    //   order: { totalLiquidity: "DESC" },
    //   where: {}
    // })
  }
}
