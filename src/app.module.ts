import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { BalancerModule } from "./balancer/balancer.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
console.log(process.env.POSTGRES_PASSWORD);
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BalancerModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: parseInt(process.env.POSTGRES_PORT, 5432),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ["**/*.entity{.ts,.js}"],
      migrationsTableName: "migration",
      migrations: ["src/migration/*.ts"],
      ssl: false,
    }),
  ],
  providers: [AppService],
})
export class AppModule {}
