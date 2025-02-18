import { DataSource } from "typeorm";

import User from "./entities/user";
import Transfer from "./entities/transfer";
import Account from "./entities/account";
import FinancialEntity from "./entities/financialEntity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: parseInt(process.env.DB_PORT ?? "5432"),
  username: process.env.DB_USER ?? "postgres",
  password: process.env.PASS ?? "password",
  database: process.env.DB_NAME ?? "account-demo",
  synchronize: false,
  logging: false,
  entities: [User, Transfer, Account, FinancialEntity],
  migrations: ["./migrations/*.js"],
  subscribers: [],
});

export default AppDataSource;
