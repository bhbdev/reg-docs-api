import * as jwt from 'jsonwebtoken';
import { env } from '../config'; //<this should be up a higher directory
import { Router } from 'express';
import { RegDoc } from '../models/regdoc';

export const regdocs = Router();

regdocs.use((req, res, next) => {

  if (req.path==='/' && !req.params.length) {
    next();
    return;
  }
  console.log('authenticating...');
  //TODO:  Change this to use Authorization: Bearer   or express-jwt()
  var token = null;
  var authpacket = (<string>req.headers.authorization).split(' ');
  if (authpacket.length == 2) {
    token = authpacket[1];
  }
  //var token: string = String(req.headers['access-token']);

  if (token)
  {
    jwt.verify(token, env.secret, (err, decoded) => {
      if (err) {
        return res.json({message: 'invalid token'});
      } else {
        (<Object>req)['decoded'] = decoded;
        next();
      }
    });
  }
  else
  {
    res.send({message: 'Authentication required.'});
  }

});


regdocs.get('/', (req, res, next) => {
  RegDoc
   .findAll({
     order: [
         ['id', 'ASC']
     ],
   })
   .then((data) => {
     return res.json(data);
   })
   .catch((err) => {
     console.log(err);
     return err;
   })
});


// get api/id
regdocs.get('/:id', async (req, res, next) => {
  try {
    const regdoc = await RegDoc.scope(req.query['scope']).findById(req.params['id']);
    res.json(regdoc);
  } catch(e) {
    next(e);
  }
});

// post new doc
regdocs.post('/', async (req, res, next) => {
  try {
    console.log('request: ' + JSON.stringify(req.body,null," "));
    const regdoc = await RegDoc.create<RegDoc>(req.body);
    res.status(201).json(regdoc);
  } catch(e) {
    next(e);
  }
});

// update api/id
regdocs.put('/:id', async (req, res, next) => {
  try {
    await RegDoc.update<RegDoc>(req.body, {where: {id: req.params['id']}});
    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
});

// delete api/id
regdocs.delete('/:id', async (req, res, next) => {
  try {
    await RegDoc.destroy({where: {id: req.params['id']}});
    res.sendStatus(200);
  } catch(e) {
    next(e);
  }
});


