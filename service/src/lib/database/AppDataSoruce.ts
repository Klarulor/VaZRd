import "reflect-metadata";
import { DataSource } from "typeorm";
import {UserEntity} from "./entities/UserEntity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "dev.sqlite",
    synchronize: true,        // dev only; turn off in prod and use migrations
    logging: false,
    entities: [UserEntity],
    migrations: [],
});

export default AppDataSource;