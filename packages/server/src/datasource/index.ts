import dotenv from "dotenv";
import pg, { PoolConfig } from "pg";
const Pool = pg.Pool;

dotenv.config();

//------------------------------------------------
const dbConfig: PoolConfig = {
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  port: +process.env.PG_PORT,
  ssl: false,
};

//------------------------------------------------
export class DataSource extends Pool {
  private static instance: DataSource;
  constructor() {
    super(dbConfig);
  }

  //------------------------------------------------
  static getInstance() {
    if (!DataSource.instance) {
      DataSource.instance = new DataSource();
    }

    return DataSource.instance;
  }
}

//------------------------------------------------
export const datasource = DataSource.getInstance();
