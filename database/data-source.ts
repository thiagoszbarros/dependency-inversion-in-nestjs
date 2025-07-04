import { DataSource, DataSourceOptions } from "typeorm";
import { migrations } from "./migrations";
import { entities } from "./entities";
require('dotenv').config();

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: entities,
    migrations: migrations,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
