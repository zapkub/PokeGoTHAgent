/// <reference path="../typings/index.d.ts" />
import config from './config';
import { ObserverAgent } from './server/observer';
import { AgentsManager } from './server/AgentsManager';
import * as express from 'express';
import * as path from 'path';

import { IGetAgent } from './models/restful';
const Agents: ObserverAgent[] = [];
config.agents.map(
  item => {
    Agents.push(new ObserverAgent(item));
  }
);
const agentsManager = new AgentsManager(Agents);
// create server

const app = express();
const apiRoute = express.Router();



app.use('/api', apiRoute);
apiRoute.get('/agent', (req, res) => {

  const result: IGetAgent = {
    data: agentsManager.data,
    code: 200,
    err: undefined,
  };

  res.status(200).json(result);
});

app.all('*', express.static(path.join(__dirname, './client/')));


export default app;

