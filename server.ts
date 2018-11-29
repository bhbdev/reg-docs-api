import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser  from 'body-parser';
import { jwt } from './helpers/jwt';
import { errorHandler } from './helpers/error-handler';
import * as JWT from 'jsonwebtoken';
import * as morgan from 'morgan';
import { env } from './config'; //<this should be up a higher directory
import { sequelize } from './database';
import { regdocs } from './routes/regdocRouter';

const hostname = 'localhost';
const port = 3000;
const server = express();


server.set('Secret', env.secret);

// log requests to console via morgan
server.use(morgan('dev'));

server.use(jwt());

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
server.use(bodyParser.json());


// cors 
server.use(cors({
  credentials: true, 
  origin: '*',//'http://localhost:4200',
  methods: 'GET,POST,OPTIONS,PUT,PATCH,DELETE',
  allowedHeaders: 'X-Requested-With,Authorization,Content-Type'
}));
// server.use(function(req,res,next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,PUT,PATCH,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', 0);
//   next();
// });

server.get('/api/test', (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello Dude');
});

server.post('/api/authenticate', (req, res) => {
  if (req.body.username==='beau')
  {
    if (req.body.password==='pass123')
    {
      const payload = {
        check: true
      };

      var token = JWT.sign(payload, server.get('Secret'), {
        expiresIn: 1440 // 24 hours
      });

      res.json({
        message: 'authentication done',
        token: token
      });
    }
    else
    {
      res.json({message: 'invalid login credentials'});
    }
  }
  else
  {
    res.json({message: 'Invalid username or password.'});
  }
});



// handle errors
server.use(errorHandler);


const mysequelize = sequelize;



// setup api + jwt authentication
server.use('/api/regdocs', regdocs);



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
