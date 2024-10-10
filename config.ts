import 'process';

let sqlhost = 'localhost';
if (process.env.INSTANCE_CONNECTION_NAME) {
  sqlhost = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}


export const env = 
{
  database: process.env.SQL_DATABASE,
  dialect: 'postgres',
  username: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  host: sqlhost,
  port: process.env.SQL_PORT,
  secret: process.env.SECRET
};

