import { Sequelize } from 'sequelize-typescript';
import { env } from './config'; //<this should be up a higher directory
import { RegDoc } from './models/regdoc'


export const sequelize = new Sequelize({
  database: env.database,
  dialect: env.dialect,
  username: env.username,
  password: env.password,
  host: env.host,
  port: env.port
});

sequelize.addModels([RegDoc]);

//initializeDB();

sequelize.authenticate().then(() => {
  console.log("Connected to DB");
})
.catch((err) => {
  console.log(err);
})


function initializeDB() {
  sequelize
      .sync({ force: true })
      .then(() => {
        console.log('Connection synced');
        return;
      })
      .catch(err => {
        console.log(err);
      })
}