import { DataSource } from "typeorm";
import Fund from "./entities/fund";
import Investor from "./entities/investor";
import Transfer from "./entities/transfer";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "password",
  database: "account-demo",
  synchronize: false,
  logging: true,
  entities: [Fund, Investor, Transfer],
  migrations: ["./migrations/*.js"],
  subscribers: [],
});

export default AppDataSource;
