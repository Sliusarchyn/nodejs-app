import { container } from "../../config/container.config";
import { DataSource, DataSourceOptions } from "typeorm";

const config = container.get<DataSourceOptions>('DataSourceOptions');
export const dataSource = container.get<DataSource>(DataSource);

export default config;
