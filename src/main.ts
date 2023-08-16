import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { BalancerArbitrumGraphqlServiceService } from "./balancer/balancer-arbitrum-graphql-service/balancer-arbitrum-graphql-service.service";
import { BalancerWeb3Service } from "./balancer/balancer-web3/balancer-web3.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  // const tasksService = app.get(BalancerArbitrumGraphqlServiceService);
  // await tasksService.getPools();
  const tasksService = app.get(BalancerWeb3Service);
  await tasksService.queryBatchSwap(
    [
      {
        poolId:
          "0x64541216bafffeec8ea535bb71fbc927831d0595000100000000000000000002",
        assetInIndex: 0,
        assetOutIndex: 1,
        amount: "1000000000",
        userData: "0x",
      },
      {
        poolId:
          "0x89dc7e71e362faf88d92288fe2311d25c6a1b5e0000200000000000000000423",
        assetInIndex: 1,
        assetOutIndex: 2,
        amount: "0",
        userData: "0x",
      },
      {
        poolId:
          "0xce6195089b302633ed60f3f427d1380f6a2bfbc7000200000000000000000424",
        assetInIndex: 2,
        assetOutIndex: 0,
        amount: "0",
        userData: "0x",
      },
    ],
    [
      "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8", // USDC
      "0x82af49447d8a07e3bd95bd0d56f35241523fbab1", // WETH"
      "0xf0cb2dc0db5e6c66b9a70ac27b06b878da017028", // OHM
    ],
    // [
    //   {
    //     poolId:
    //       "0x93b48e950380adcf6d67c392f20d44fb88d258dc000200000000000000000465",
    //     assetInIndex: 0,
    //     assetOutIndex: 1,
    //     amount: "1000000",
    //     userData: "0x",
    //   },
    // ],
    // [
    //   "0xff970a61a04b1ca14834a43f5de4533ebddb5cc8", // USDC
    //   "0xaf88d065e77c8cc2239327c5edb3a432268e5831", // USD Coin"
    // ],
  );
  // application logic...
}
bootstrap();
