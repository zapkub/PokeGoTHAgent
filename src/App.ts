/// <reference path="../typings/index.d.ts" />
import config from './config';
import { ObserverAgent } from './server/observer';
import { AgentsManager } from './server/AgentsManager';
import * as express from 'express';
import * as path from 'path';
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

app.use('/', express.static(path.join(__dirname, './client/index.html')));

app.use('/api', apiRoute);

apiRoute.get('/agent', (req, res) => {
  res.status(200).json(agentsManager.data);
});

app.listen(process.env.PORT || 3000, () => {
  console.log('App is running');
})

