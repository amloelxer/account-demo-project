import { DataSource } from "typeorm";
import Fund from "./entities/fund";
import Investor from "./entities/investor";
import Transfer from "./entities/transfer";
import Account from "./entities/account";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: parseInt(process.env.DB_PORT  ?? "5432"),
  username: process.env.DB_USER ?? "postgres",
  password: process.env.PASS ?? "password",
  database: process.env.DB_NAME ?? "account-demo",
  synchronize: false,
  logging: true,
  entities: [Fund, Investor, Transfer, Account],
  migrations: ["./migrations/*.js"],
  subscribers: [],
});

export default AppDataSource;
