import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { TokenPrice } from "../entities/token-price.entity";
import { Token } from "../entities/token.entity";

@Injectable()
export class PriceService {
  async getDecimals(address: string): Promise<number> {
    const token = await this.tokenRepo.findOne({ where: { address } });
    return token.decimals;
  }
  constructor(
    @InjectRepository(TokenPrice)
    private readonly tokenPriceRepo: Repository<TokenPrice>,
    @InjectRepository(Token) private readonly tokenRepo: Repository<Token>,
  ) {}
  async getPrice(address: string): Promise<number> {
    const token = await this.tokenRepo.findOne({ where: { address } });
    if (token) {
      const tokenPrice = await this.tokenPriceRepo.findOne({
        where: { token },
        order: { timestamp: "DESC" },
      });
      if (tokenPrice) {
        return parseFloat(tokenPrice.usdPrice);
      }
    }
    return 0;
  }
}
