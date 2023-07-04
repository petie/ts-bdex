import { DataSource } from "typeorm";
// import dotenv from "dotenv";
// dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "test",
  entities: ["**/*.entity{.ts,.js}"],
  migrationsTableName: "migration",
  migrations: ["src/migrations/*.ts"],
  ssl: false,
});
