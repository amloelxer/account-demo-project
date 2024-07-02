import { DataSource } from "typeorm"

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.HOST_NAME ?? "localhost",
    port: 5432,
    username: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASS ?? "password",
    database: process.env.DB_NAME ?? "account-demo",
    synchronize: false,
    logging: true,
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migrations/*.js'],
    subscribers: [],
})

export default AppDataSource