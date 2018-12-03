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
//  username : 'docsuser', //  pwd             |  connection name
//  password : 'Dx@z23af!',//G6G9mPHm6pt57w5v  |  reg-docs-api-v1:us-east1:regdocs
//  host : 'localhost', //fs
//  port : 5432,
  secret: 'B@^grmJT!47]dtT8Nk&z96$;8wTVmtdQ_'
};

