import { AppModule } from "./app.module";
import { CommandFactory } from "nest-commander";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const logger = new Logger("bootstrap");
  // const app = await NestFactory.createApplicationContext(AppModule);
  await CommandFactory.run(AppModule, logger);
  // const appService = app.select(AppModule).get(AppService);
  // await appService.start();
  // await app.close();
}
bootstrap();
