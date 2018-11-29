import * as expressJwt from 'express-jwt';
import { env } from '../config';


export function jwt() {
  const { secret } = env;
  return expressJwt( { secret }).unless({
    path: [
      '/api/test',
      '/api/regdocs',
      '/api/authenticate'
    ]
  });
}