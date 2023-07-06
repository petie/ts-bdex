import { AppModule } from "./app.module";
import { NestFactory } from "@nestjs/core";
import { BalancerArbitrumGraphqlServiceService } from "./balancer/balancer-arbitrum-graphql-service/balancer-arbitrum-graphql-service.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const tasksService = app.get(BalancerArbitrumGraphqlServiceService);
  await tasksService.getPools();
  // application logic...
}
bootstrap();
